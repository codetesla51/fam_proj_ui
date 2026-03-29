// API Service - All backend communication
const API_BASE = 'https://ledger-system-e7t7.onrender.com';

// Token management
const tokens = {
    get access() { return localStorage.getItem('access_token'); },
    set access(v) { localStorage.setItem('access_token', v); },
    get refresh() { return localStorage.getItem('refresh_token'); },
    set refresh(v) { localStorage.setItem('refresh_token', v); },
    get isAdmin() { return localStorage.getItem('is_admin') === 'true'; },
    set isAdmin(v) { localStorage.setItem('is_admin', v === true || v === 'true' ? 'true' : 'false'); },
    clear() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
    }
};

// Core fetch wrapper with auth and auto-refresh
async function apiFetch(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    
    const headers = {
        ...options.headers
    };
    
    // Don't set Content-Type for FormData (browser sets it with boundary)
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    
    // Add auth token if available
    if (tokens.access) {
        headers['Authorization'] = `Bearer ${tokens.access}`;
    }
    
    try {
        const response = await fetch(url, {
            ...options,
            headers
        });
        
        // Handle 401 - token expired
        if (response.status === 401 && endpoint !== '/auth/admin/login') {
            // Admin tokens cannot be refreshed - just logout
            if (tokens.isAdmin) {
                tokens.clear();
                window.location.href = '/admin/login';
                throw new Error('Session expired. Please login again.');
            }
            // Member tokens can be refreshed
            if (tokens.refresh) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    // Retry with new token
                    headers['Authorization'] = `Bearer ${tokens.access}`;
                    return fetch(url, { ...options, headers });
                }
            }
            // Refresh failed or no refresh token, logout
            tokens.clear();
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
        }
        
        return response;
    } catch (error) {
        if (!navigator.onLine) {
            throw new Error('You are offline. Please check your connection.');
        }
        throw error;
    }
}

// Refresh access token
async function refreshAccessToken() {
    try {
        const res = await fetch(`${API_BASE}/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: tokens.refresh })
        });
        
        if (res.ok) {
            const data = await res.json();
            tokens.access = data.access_token;
            tokens.refresh = data.refresh_token;
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

// Parse response (handles both JSON and plain text errors)
async function handleResponse(response) {
    const res = await response;
    const contentType = res.headers.get('content-type') || '';
    
    if (!res.ok) {
        let text = await res.text();
        // Clean up empty or bracket-only responses
        text = text.trim();
        if (text === '' || text === '{}' || text === '[]') {
            text = `Request failed: ${res.status}`;
        }
        // Translate to user-friendly message
        throw new Error(translateError(text, res.status));
    }
    
    if (contentType.includes('application/json')) {
        return res.json();
    }
    return res.text();
}

// Translate backend errors to user-friendly messages
function translateError(text, status) {
    const lower = text.toLowerCase();
    
    // Map common backend errors to friendly messages
    if (lower.includes('invalid credentials') || lower.includes('wrong password') || lower.includes('incorrect password')) {
        return 'errors.wrongPassword';
    }
    if (lower.includes('user not found') || lower.includes('member not found') || lower.includes('not found')) {
        return 'errors.userNotFound';
    }
    if (lower.includes('expired') || lower.includes('invalid token') || lower.includes('token')) {
        return 'errors.sessionExpired';
    }
    if (lower.includes('unauthorized') || lower.includes('forbidden') || lower.includes('access denied')) {
        return 'errors.unauthorized';
    }
    if (lower.includes('not admin') || lower.includes('admin only')) {
        return 'errors.notAdmin';
    }
    if (lower.includes('insufficient') || lower.includes('not enough') || lower.includes('balance')) {
        return 'errors.insufficientFunds';
    }
    if (lower.includes('network') || lower.includes('connection') || lower.includes('offline')) {
        return 'errors.networkError';
    }
    if (lower.includes('500') || lower.includes('internal') || lower.includes('server')) {
        return 'errors.serverError';
    }
    if (lower.includes('400') || lower.includes('bad request') || lower.includes('invalid')) {
        return 'errors.invalidRequest';
    }
    if (lower.includes('upload') || lower.includes('file')) {
        return 'errors.uploadFailed';
    }
    if (lower.includes('transfer')) {
        return 'errors.transferFailed';
    }
    
    // Clean up the error text if nothing matched
    return text.replace(/[{}"\[\]]/g, '').trim() || 'errors.tryAgain';
}

// ===== AUTH ENDPOINTS =====

const auth = {
    // Member login
    async login(name, password) {
        const data = await handleResponse(apiFetch('/login', {
            method: 'POST',
            body: JSON.stringify({ name, password })
        }));
        tokens.access = data.access_token;
        tokens.refresh = data.refresh_token;
        tokens.isAdmin = false;
        return data;
    },
    
    // Member register
    async register({ name, password, interval, committed_amount, start_date }) {
        const data = await handleResponse(apiFetch('/members', {
            method: 'POST',
            body: JSON.stringify({ name, password, interval, committed_amount: String(committed_amount), start_date })
        }));
        // Backend returns { status: "created" } without tokens
        // User must login after registering
        return data;
    },
    
    // Admin login
    async adminLogin(password) {
        const data = await handleResponse(apiFetch('/auth/admin/login', {
            method: 'POST',
            body: JSON.stringify({ password })
        }));
        tokens.access = data.access_token;
        tokens.refresh = data.refresh_token;
        tokens.isAdmin = true;
        return data;
    },
    
    // Member logout
    async logout() {
        try {
            await apiFetch('/logout', { method: 'POST' });
        } catch (e) {
            console.warn('Logout API call failed:', e);
        }
        tokens.clear();
    },
    
    // Admin logout
    async adminLogout() {
        try {
            await apiFetch('/auth/admin/logout', { method: 'POST' });
        } catch (e) {
            console.warn('Admin logout API call failed:', e);
        }
        tokens.clear();
    },
    
    isLoggedIn() {
        return !!tokens.access;
    },
    
    isAdmin() {
        return !!tokens.isAdmin;
    },
    
    getToken() {
        return tokens.access;
    }
};

// ===== MEMBER ENDPOINTS =====

const member = {
    // Get profile
    async getProfile() {
        return handleResponse(apiFetch('/profile'));
    },
    
    // Update profile (savings settings)
    async updateProfile({ interval, committed_amount }) {
        const body = {};
        if (interval) body.interval = interval;
        if (committed_amount) body.committed_amount = String(committed_amount);
        return handleResponse(apiFetch('/profile', {
            method: 'PUT',
            body: JSON.stringify(body)
        }));
    },
    
    // Change password
    async changePassword(current_password, new_password) {
        return handleResponse(apiFetch('/change-password', {
            method: 'POST',
            body: JSON.stringify({ old_password: current_password, new_password })
        }));
    },
    
    // Get own transactions
    async getTransactions({ pool, page = 1, limit = 20 } = {}) {
        const params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', (page - 1) * limit);
        const data = await handleResponse(apiFetch(`/transactions/mine?${params}`));
        // Backend returns { data: [...], total, limit, offset }
        // We filter by pool on frontend if needed (API uses Pool, not pool)
        let transactions = data.data || data || [];
        if (pool) {
            transactions = transactions.filter(t => t.Pool === pool || t.pool === pool);
        }
        return { transactions, total: data.total || transactions.length };
    },
    
    // Transfer pool2 to pool1
    async transferPool(amount) {
        const data = await handleResponse(apiFetch('/pool/transfer', {
            method: 'POST',
            body: JSON.stringify({ amount: String(amount), reason: 'Pool 2 to Pool 1 transfer' })
        }));
        return data;
    },
    
    // Get receipt by transaction ID
    async getReceipt(transactionId) {
        return handleResponse(apiFetch(`/receipts/${transactionId}`, {
            method: 'GET'
        }));
    },
    
    // Submit care fund request
    async submitCareFundRequest({ amount, occasion, event_date, description }) {
        // Backend expects amount as string
        const body = { amount: String(amount) };
        if (occasion) body.occasion = occasion;
        if (event_date) body.event_date = event_date;
        if (description) body.description = description;
        return handleResponse(apiFetch('/carefund/request', {
            method: 'POST',
            body: JSON.stringify(body)
        }));
    },
    
    // Get own care fund requests
    async getCareFundRequests() {
        const data = await handleResponse(apiFetch('/carefund/requests/mine'));
        return Array.isArray(data) ? data : [];
    },
    
    // Get own receipts
    async getReceipts() {
        const data = await handleResponse(apiFetch('/receipts/mine'));
        return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
    },
    
    // Get notifications
    async getNotifications() {
        const data = await handleResponse(apiFetch('/notifications/mine'));
        // Backend returns { data: [...] }
        return { notifications: Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []) };
    },
    
    // Mark notification as read
    async markNotificationRead(id) {
        return handleResponse(apiFetch(`/notifications/read/${id}`, {
            method: 'PUT'
        }));
    },
    
    // Get dashboard
    async getDashboard() {
        return handleResponse(apiFetch('/dashboard'));
    }
};

// ===== ADMIN ENDPOINTS =====

const admin = {
    // Create member
    async createMember({ name, password, interval, committed_amount, start_date }) {
        return handleResponse(apiFetch('/admin/members', {
            method: 'POST',
            body: JSON.stringify({ name, password, interval, committed_amount: String(committed_amount), start_date })
        }));
    },
    
    // Get all members (with full details)
    async getAllMembers() {
        const data = await handleResponse(apiFetch('/members/all'));
        // Normalize keys
        return (Array.isArray(data) ? data : []).map(m => ({
            id: m.ID || m.id,
            name: m.Name || m.name,
            interval: m.Interval || m.interval,
            committed_amount: m.CommittedAmount || m.committed_amount,
            start_date: m.StartDate || m.start_date,
            status: m.Status || m.status
        }));
    },
    
    // Reset member password
    async resetPassword(member_id, new_password) {
        return handleResponse(apiFetch('/admin/reset-password', {
            method: 'POST',
            body: JSON.stringify({ member_id, new_password })
        }));
    },
    
    // Upload receipt
    async uploadReceipt(file) {
        const formData = new FormData();
        formData.append('file', file);
        const data = await handleResponse(apiFetch('/upload/receipt', {
            method: 'POST',
            headers: {}, // Let browser set Content-Type for FormData
            body: formData
        }));
        // Backend returns { url: "..." }
        return { receipt_url: data.url };
    },
    
    // Log transaction
    async createTransaction({ member_id, pool, type, amount, reason, receipt_url }) {
        return handleResponse(apiFetch('/transactions', {
            method: 'POST',
            body: JSON.stringify({ member_id, pool, type, amount: String(amount), reason, receipt_url })
        }));
    },
    
    // Get all transactions
    async getTransactions({ page = 1, limit = 20, member_id, pool } = {}) {
        const params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', (page - 1) * limit);
        if (member_id) params.set('member_id', member_id);
        if (pool) params.set('pool', pool);
        const data = await handleResponse(apiFetch(`/transactions?${params}`));
        // Backend returns { data: [...], total, limit, offset }
        const transactions = data.data || data || [];
        return { transactions, total: data.total || transactions.length };
    },
    
    // Get general ledger
    async getGeneralLedger({ pool, from, to } = {}) {
        // Backend uses request body, not query params
        const body = {};
        if (pool) body.pool = pool;
        if (from) body.start_date = from;
        if (to) body.end_date = to;
        return handleResponse(apiFetch('/transactions/general', {
            method: 'GET',
            body: JSON.stringify(body)
        }));
    },
    
    // Get all care fund requests
    async getCareFundRequests(status) {
        const data = await handleResponse(apiFetch('/carefund/requests'));
        // Backend returns direct array
        const requests = Array.isArray(data) ? data : [];
        if (status) return requests.filter(r => r.status === status);
        return requests;
    },
    
    // Approve or reject care fund request
    async updateCareFundRequest(id, status, rejection_reason) {
        const body = { status };
        if (status === 'rejected' && rejection_reason) {
            body.rejection_reason = rejection_reason;
        }
        return handleResponse(apiFetch(`/carefund/requests/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        }));
    },
    
    // Get dashboard
    async getDashboard() {
        return handleResponse(apiFetch('/dashboard'));
    }
};

// ===== HEALTH =====

const health = {
    async check() {
        return handleResponse(apiFetch('/health'));
    }
};

// Make member and admin accessible globally
window.member = member;
window.admin = admin;
window.auth = auth;
