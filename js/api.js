// API Service - All backend communication
const API_BASE = 'http://localhost:8080';

// Mock data for development (when backend is not running)
const mockData = {
    dashboard: {
        pool1_balance: 850000,
        pool2_balance: 385000,
        member_count: 6,
        overdue_count: 1,
        active_count: 5,
        my_contributions: 150000,
        my_pool2_contributions: 75000,
        underfunded_members: [
            { id: '6', name: 'Emeka Odelade', committed_amount: 50000, current_sum: 25000 }
        ]
    },
    transactions: [
        { id: '1', member_id: '1', pool: 'pool1', type: 'credit', amount: 50000, reason: 'Monthly contribution', receipt_url: null, created_at: '2026-03-20T10:00:00Z' },
        { id: '2', member_id: '2', pool: 'pool1', type: 'credit', amount: 50000, reason: 'Monthly contribution', receipt_url: null, created_at: '2026-03-19T10:00:00Z' },
        { id: '3', member_id: '1', pool: 'pool2', type: 'credit', amount: 15000, reason: 'Care fund contribution', receipt_url: null, created_at: '2026-03-18T10:00:00Z' },
        { id: '4', member_id: '3', pool: 'pool1', type: 'credit', amount: 50000, reason: 'Monthly contribution', receipt_url: null, created_at: '2026-03-17T10:00:00Z' },
        { id: '5', member_id: '2', pool: 'pool2', type: 'debit', amount: 100000, reason: 'Wedding support - Kehinde', receipt_url: null, created_at: '2026-03-15T10:00:00Z' },
        { id: '6', member_id: '4', pool: 'pool1', type: 'credit', amount: 50000, reason: 'Monthly contribution', receipt_url: null, created_at: '2026-03-14T10:00:00Z' },
        { id: '7', member_id: '5', pool: 'pool1', type: 'credit', amount: 75000, reason: 'Monthly contribution', receipt_url: null, created_at: '2026-03-12T10:00:00Z' },
        { id: '8', member_id: '1', pool: 'pool1', type: 'credit', amount: 50000, reason: 'February contribution', receipt_url: null, created_at: '2026-02-20T10:00:00Z' }
    ],
    notifications: [
        { id: '1', member_id: '1', message: 'Your payment of ₦50,000 has been recorded', read: false, created_at: '2026-03-20T10:05:00Z' },
        { id: '2', member_id: '1', message: 'Your care fund request has been approved', read: false, created_at: '2026-03-18T14:00:00Z' },
        { id: '3', member_id: '1', message: 'Welcome to the Odelade Family Ledger!', read: true, created_at: '2026-03-01T09:00:00Z' }
    ],
    careFundRequests: [
        { id: '1', member_id: '2', member_name: 'Kehinde Odelade', amount: 100000, occasion: 'wedding', event_date: '2026-04-15', description: 'Need support for wedding preparations', status: 'approved', rejection_reason: null, created_at: '2026-03-10T10:00:00Z' },
        { id: '2', member_id: '1', member_name: 'Taiwo Odelade', amount: 50000, occasion: 'medical', event_date: '2026-03-25', description: 'Hospital bills for my child', status: 'pending', rejection_reason: null, created_at: '2026-03-18T10:00:00Z' },
        { id: '3', member_id: '4', member_name: 'Folake Odelade', amount: 75000, occasion: 'graduation', event_date: '2026-05-20', description: 'Graduation ceremony and celebration', status: 'pending', rejection_reason: null, created_at: '2026-03-15T10:00:00Z' },
        { id: '4', member_id: '3', member_name: 'Adebayo Odelade', amount: 30000, occasion: 'birthday', event_date: '2026-03-01', description: '', status: 'rejected', rejection_reason: 'Request amount exceeds care fund balance', created_at: '2026-02-25T10:00:00Z' }
    ],
    members: [
        { id: '1', name: 'Taiwo Odelade', interval: 'monthly', committed_amount: 50000, start_date: '2026-01-01', status: 'active' },
        { id: '2', name: 'Kehinde Odelade', interval: 'monthly', committed_amount: 50000, start_date: '2026-01-01', status: 'active' },
        { id: '3', name: 'Adebayo Odelade', interval: 'weekly', committed_amount: 15000, start_date: '2026-01-01', status: 'active' },
        { id: '4', name: 'Folake Odelade', interval: 'monthly', committed_amount: 50000, start_date: '2026-02-01', status: 'active' },
        { id: '5', name: 'Ngozi Odelade', interval: 'monthly', committed_amount: 75000, start_date: '2026-01-01', status: 'active' },
        { id: '6', name: 'Emeka Odelade', interval: 'monthly', committed_amount: 50000, start_date: '2026-01-01', status: 'overdue' }
    ]
};

// Check if backend is available
let backendAvailable = false;
async function checkBackend() {
    try {
        const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1000) });
        backendAvailable = res.ok;
    } catch {
        backendAvailable = false;
    }
}
checkBackend();

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
