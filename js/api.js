// API Service - All backend communication
const API_BASE = window.location.origin.includes('localhost') 
    ? 'http://localhost:8080' 
    : window.location.origin;

// Token management
const tokens = {
    get access() { return localStorage.getItem('access_token'); },
    set access(v) { localStorage.setItem('access_token', v); },
    get refresh() { return localStorage.getItem('refresh_token'); },
    set refresh(v) { localStorage.setItem('refresh_token', v); },
    get isAdmin() { return localStorage.getItem('is_admin') === 'true'; },
    set isAdmin(v) { localStorage.setItem('is_admin', v); },
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
        if (response.status === 401 && tokens.refresh && endpoint !== '/refresh') {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                // Retry with new token
                headers['Authorization'] = `Bearer ${tokens.access}`;
                return fetch(url, { ...options, headers });
            } else {
                // Refresh failed, logout
                tokens.clear();
                window.location.href = '/login';
                throw new Error('Session expired. Please login again.');
            }
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
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

// Parse JSON response
async function handleResponse(response) {
    const res = await response;
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Something went wrong' }));
        throw new Error(error.message || error.error || `Request failed: ${res.status}`);
    }
    return res.json();
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
        tokens.isAdmin = 'false';
        return data;
    },
    
    // Member register
    async register({ name, password, interval, committed_amount, start_date }) {
        const data = await handleResponse(apiFetch('/members', {
            method: 'POST',
            body: JSON.stringify({ name, password, interval, committed_amount, start_date })
        }));
        // Auto-login after register if tokens returned
        if (data.access_token) {
            tokens.access = data.access_token;
            tokens.refresh = data.refresh_token;
            tokens.isAdmin = 'false';
        }
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
        tokens.isAdmin = 'true';
        return data;
    },
    
    // Member logout
    async logout() {
        try {
            await apiFetch('/logout', { method: 'POST' });
        } catch {}
        tokens.clear();
    },
    
    // Admin logout
    async adminLogout() {
        try {
            await apiFetch('/auth/admin/logout', { method: 'POST' });
        } catch {}
        tokens.clear();
    },
    
    isLoggedIn() {
        return !!tokens.access;
    },
    
    isAdmin() {
        return tokens.isAdmin;
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
    
    // Change password
    async changePassword(current_password, new_password) {
        return handleResponse(apiFetch('/change-password', {
            method: 'POST',
            body: JSON.stringify({ current_password, new_password })
        }));
    },
    
    // Get own transactions
    async getTransactions({ pool, page = 1, limit = 20 } = {}) {
        const params = new URLSearchParams();
        if (pool) params.set('pool', pool);
        params.set('page', page);
        params.set('limit', limit);
        return handleResponse(apiFetch(`/transactions/mine?${params}`));
    },
    
    // Transfer pool2 to pool1
    async transferPool(amount) {
        return handleResponse(apiFetch('/pool/transfer', {
            method: 'POST',
            body: JSON.stringify({ amount })
        }));
    },
    
    // Submit care fund request
    async submitCareFundRequest({ amount, occasion, event_date, description }) {
        return handleResponse(apiFetch('/carefund/request', {
            method: 'POST',
            body: JSON.stringify({ amount, occasion, event_date, description })
        }));
    },
    
    // Get own care fund requests (NOTE: not in router, use dashboard)
    async getCareFundRequests() {
        return handleResponse(apiFetch('/carefund/requests/mine'));
    },
    
    // Get notifications
    async getNotifications() {
        return handleResponse(apiFetch('/notifications/mine'));
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
            body: JSON.stringify({ name, password, interval, committed_amount, start_date })
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
        return handleResponse(apiFetch('/upload/receipt', {
            method: 'POST',
            headers: {}, // Let browser set Content-Type for FormData
            body: formData
        }));
    },
    
    // Log transaction
    async createTransaction({ member_id, pool, type, amount, reason, receipt_url }) {
        return handleResponse(apiFetch('/transactions', {
            method: 'POST',
            body: JSON.stringify({ member_id, pool, type, amount, reason, receipt_url })
        }));
    },
    
    // Get all transactions
    async getTransactions({ page = 1, limit = 20, member_id, pool } = {}) {
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('limit', limit);
        if (member_id) params.set('member_id', member_id);
        if (pool) params.set('pool', pool);
        return handleResponse(apiFetch(`/transactions?${params}`));
    },
    
    // Get general ledger
    async getGeneralLedger({ pool, from, to } = {}) {
        const params = new URLSearchParams();
        if (pool) params.set('pool', pool);
        if (from) params.set('from', from);
        if (to) params.set('to', to);
        return handleResponse(apiFetch(`/transactions/general?${params}`));
    },
    
    // Get all care fund requests
    async getCareFundRequests(status) {
        const params = status ? `?status=${status}` : '';
        return handleResponse(apiFetch(`/carefund/requests${params}`));
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
