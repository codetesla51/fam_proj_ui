// Normalize backend PascalCase keys to lowercase for frontend
function normalizeItem(item) {
    if (!item || typeof item !== 'object') return item;
    return {
        id: item.ID || item.id,
        member_id: item.MemberID || item.member_id,
        member_name: item.MemberName || item.member_name,
        amount: item.Amount || item.amount,
        pool: item.Pool || item.pool,
        type: item.Type || item.type,
        reason: item.Reason || item.reason,
        status: item.Status || item.status,
        occasion: item.Occasion || item.occasion,
        event_date: item.EventDate || item.event_date,
        description: item.Description || item.description,
        rejection_reason: item.RejectionReason || item.rejection_reason,
        receipt_url: item.ReceiptURL || item.receipt_url,
        receipt_number: item.ReceiptNumber || item.receipt_number,
        read: item.Read || item.read || false,
        message: item.Message || item.message,
        created_at: item.CreatedAt || item.created_at,
        // Keep original fields too
        ...item
    };
}

function normalizeArray(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(normalizeItem);
}

// Store - State management with real API only
const store = {
    data: {
        user: null,
        profile: null,
        transactions: [],
        notifications: [],
        careFundRequests: [],
        dashboard: null,
        members: []
    },
    
    // Always use real API - no mock fallback
    usingMock() {
        return false;
    },
    
    // Auth methods
    isLoggedIn() {
        return authState.isLoggedIn;
    },
    
    isAdmin() {
        return authState.isAdmin;
    },
    
    get user() {
        return this.data.user || JSON.parse(localStorage.getItem('user_data') || 'null');
    },
    
    set user(val) {
        this.data.user = val;
        if (val) {
            localStorage.setItem('user_data', JSON.stringify(val));
        } else {
            localStorage.removeItem('user_data');
        }
    },
    
    // Login member - always use real API
    async login(name, password) {
        // Save language preference before clearing
        const lang = localStorage.getItem('language');
        
        // Clear absolutely everything first
        authState.clear();
        localStorage.clear();
        
        // Restore language
        if (lang) localStorage.setItem('language', lang);
        
        // Reset all in-memory store data
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [] };
        
        // Login
        await auth.login(name, password);
        authState.set(tokens.access, false);
        
        // Store new user and load fresh profile
        this.user = { name };
        this.data.profile = await member.getProfile();
        this.user = { ...this.user, ...this.data.profile };
    },
    
    // Register member - always use real API
    async register({ name, password, interval, committed_amount, start_date }) {
        // Save language preference before clearing
        const lang = localStorage.getItem('language');
        
        // Clear absolutely everything
        authState.clear();
        localStorage.clear();
        
        // Restore language
        if (lang) localStorage.setItem('language', lang);
        
        // Reset all in-memory store data
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [] };
        
        // Register
        await auth.register({ name, password, interval, committed_amount, start_date });
        
        // Auto login with new credentials
        await auth.login(name, password);
        authState.set(tokens.access, false);
        
        // Store new user and load fresh profile
        this.user = { name };
        this.data.profile = await member.getProfile();
        this.user = { ...this.user, ...this.data.profile };
    },
    
    // Admin login - always use real API
    async adminLogin(password) {
        // Save language preference before clearing
        const lang = localStorage.getItem('language');
        
        // Clear absolutely everything first
        authState.clear();
        localStorage.clear();
        
        // Restore language
        if (lang) localStorage.setItem('language', lang);
        
        // Reset all in-memory store data
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [] };
        
        // Admin login
        const data = await auth.adminLogin(password);
        authState.set(data.access_token, true);
        
        // Store admin user
        this.user = { name: 'Admin', isAdmin: true };
    },
    
    // Logout - clear EVERYTHING
    async logout() {
        this.stopPolling();
        authState.clear();
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [], receipts: [] };
        router.navigate('/login');
    },
    
    // Load dashboard
    async loadDashboard() {
        try {
            if (this.isAdmin()) {
                this.data.dashboard = await admin.getDashboard();
            } else {
                this.data.dashboard = await member.getDashboard();
            }
        } catch (e) {
            console.error('Failed to load dashboard:', e);
            this.data.dashboard = {};
        }
        return this.data.dashboard || {};
    },
    
    // Load transactions
    async loadTransactions(options = {}) {
        try {
            let result;
            if (this.isAdmin()) {
                result = await admin.getTransactions(options);
            } else {
                result = await member.getTransactions(options);
            }
            
            // Handle both array and object response formats
            let raw = [];
            if (Array.isArray(result)) {
                raw = result;
            } else if (result?.transactions && Array.isArray(result.transactions)) {
                raw = result.transactions;
            } else if (result?.data && Array.isArray(result.data)) {
                raw = result.data;
            }
            
            this.data.transactions = normalizeArray(raw);
            return this.data.transactions;
        } catch (e) {
            this.data.transactions = [];
            return [];
        }
    },
    
    // Load receipts
    async loadReceipts() {
        try {
            const receipts = await member.getReceipts();
            // Handle both array and object responses
            let recArray = [];
            if (Array.isArray(receipts)) {
                recArray = receipts;
            } else if (receipts?.data && Array.isArray(receipts.data)) {
                recArray = receipts.data;
            }
            // Normalize keys
            this.data.receipts = recArray.map(r => ({
                id: r.ID || r.id,
                receipt_number: r.ReceiptNumber || r.receipt_number,
                amount: r.Amount || r.amount,
                description: r.Description || r.description,
                transaction_id: r.TransactionID || r.transaction_id,
                member_id: r.MemberID || r.member_id,
                created_at: r.CreatedAt || r.created_at
            }));
            return this.data.receipts;
        } catch (e) {
            console.error('Failed to load receipts:', e);
            this.data.receipts = [];
            return [];
        }
    },
    
    async loadNotifications() {
        try {
            const data = await member.getNotifications();
            const raw = Array.isArray(data.notifications) ? data.notifications : (Array.isArray(data) ? data : []);
            this.data.notifications = normalizeArray(raw);
        } catch (e) {
            console.warn('notifications unavailable, skipping');
            this.data.notifications = this.data.notifications || [];
        }
        return this.data.notifications;
    },
    
    // Mark notification as read - optimistic
    markRead(id) {
        // Update UI immediately
        const notif = this.data.notifications.find(n => n.id === id);
        if (notif) notif.read = true;
        this.updateNotifBadge();
        // Sync in background
        member.markNotificationRead(id).catch(e => {
            console.error('Failed to mark notification as read:', e);
            if (notif) notif.read = false;
            this.updateNotifBadge();
        });
    },
    
    // Mark all as read - optimistic
    markAllRead() {
        const unread = (this.data.notifications || []).filter(n => !n.read);
        // Update all immediately
        unread.forEach(n => n.read = true);
        this.updateNotifBadge();
        // Sync in background
        for (const n of unread) {
            member.markNotificationRead(n.id).catch(e => {
                console.error('Failed to mark notification as read:', e);
            });
        }
    },
    
    // Load care fund requests
    async loadCareFundRequests(status) {
        try {
            let result;
            if (this.isAdmin()) {
                result = await admin.getCareFundRequests(status);
                const raw = Array.isArray(result) ? result : (result?.requests || []);
                this.data.careFundRequests = normalizeArray(raw);
            } else {
                result = await member.getCareFundRequests();
                this.data.careFundRequests = normalizeArray(result);
            }
            if (status) {
                this.data.careFundRequests = this.data.careFundRequests.filter(r => r.status === status);
            }
        } catch (e) {
            console.error('Failed to load care fund requests:', e);
            this.data.careFundRequests = [];
        }
        return this.data.careFundRequests;
    },
    
    // Submit care fund request - optimistic
    async submitCareFundRequest({ amount, occasion, event_date, description }) {
        // Optimistic: add to list immediately
        const optimisticReq = {
            id: 'temp-' + Date.now(),
            member_id: this.user?.id,
            member_name: this.user?.name || 'You',
            amount, occasion, event_date, description,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        this.data.careFundRequests.unshift(optimisticReq);
        
        try {
            const result = await member.submitCareFundRequest({ amount, occasion, event_date, description });
            // Replace optimistic with real
            const idx = this.data.careFundRequests.findIndex(r => r.id === optimisticReq.id);
            if (idx !== -1) {
                this.data.careFundRequests[idx] = normalizeItem(result);
            }
            return result;
        } catch (e) {
            // Rollback
            this.data.careFundRequests = this.data.careFundRequests.filter(r => r.id !== optimisticReq.id);
            throw e;
        }
    },
    
    // Update care fund request (approve/reject) - optimistic
    async updateCareFundRequest(id, status, rejection_reason) {
        const idx = this.data.careFundRequests.findIndex(r => r.id === id);
        if (idx !== -1) {
            this.data.careFundRequests[idx].status = status;
            if (rejection_reason) this.data.careFundRequests[idx].rejection_reason = rejection_reason;
        }
        try {
            return await admin.updateCareFundRequest(id, status, rejection_reason);
        } catch (e) {
            if (idx !== -1) {
                // Rollback - reload
                await this.loadCareFundRequests();
            }
            throw e;
        }
    },
    
    // Create transaction - optimistic
    async createTransaction(data) {
        const optimisticTx = {
            id: 'temp-' + Date.now(),
            ...data,
            created_at: new Date().toISOString()
        };
        this.data.transactions.unshift(optimisticTx);
        
        try {
            const result = await admin.createTransaction(data);
            // Reload transactions to get real data
            await this.loadTransactions();
            return result;
        } catch (e) {
            this.data.transactions = this.data.transactions.filter(t => t.id !== optimisticTx.id);
            throw e;
        }
    },
    
    // Create member
    async createMember(data) {
        return admin.createMember(data);
    },
    
    // Reset password
    async resetPassword(member_id, new_password) {
        return admin.resetPassword(member_id, new_password);
    },
    
    // Load all members (admin)
    async loadAllMembers() {
        try {
            this.data.members = await admin.getAllMembers();
        } catch (e) {
            console.error('Failed to load all members:', e);
            this.data.members = [];
        }
        return this.data.members;
    },
    
    // Upload receipt
    async uploadReceipt(file) {
        return admin.uploadReceipt(file);
    },
    
    // Load profile
    async loadProfile() {
        try {
            this.data.profile = await member.getProfile();
            this.user = { ...this.user, ...this.data.profile };
        } catch (e) {
            console.error('Failed to load profile:', e);
        }
        return this.data.profile;
    },
    
    // Change password
    async changePassword(current_password, new_password) {
        return member.changePassword(current_password, new_password);
    },
    
    // Update profile (savings settings)
    async updateProfile({ interval, committed_amount }) {
        const result = await member.updateProfile({ interval, committed_amount });
        // Update local profile
        if (this.data.profile) {
            if (interval) this.data.profile.interval = interval;
            if (committed_amount) this.data.profile.committed_amount = String(committed_amount);
        }
        if (this.user) {
            if (interval) this.user.interval = interval;
            if (committed_amount) this.user.committed_amount = String(committed_amount);
        }
        return result;
    },
    
    // Transfer pool
    async transferPool(amount) {
        return member.transferPool(amount);
    },
    
    // Get receipt by transaction ID
    async getReceipt(transactionId) {
        return member.getReceipt(transactionId);
    },
    
    // Load general ledger
    async loadGeneralLedger(options = {}) {
        if (!this.isAdmin()) return null;
        return admin.getGeneralLedger(options);
    },
    
    // Polling intervals
    _notifInterval: null,
    _dashboardInterval: null,
    _txInterval: null,
    _pollFailures: 0,
    
    // Start polling
    startPolling() {
        if (this._polling) return;
        this._polling = true;
        this.stopPolling();
        
        if (!this.isLoggedIn()) return;
        
        // Poll notifications every 30 seconds
        this._notifInterval = setInterval(async () => {
            try {
                await this.loadNotifications();
                this.updateNotifBadge();
                this._pollFailures = 0;
            } catch {
                this._pollFailures++;
            }
        }, 30000);
        
        // Poll dashboard every 30 seconds
        this._dashboardInterval = setInterval(async () => {
            try {
                await this.loadDashboard();
                this._pollFailures = 0;
            } catch {
                this._pollFailures++;
            }
        }, 30000);
        
        // Poll transactions every 30 seconds
        this._txInterval = setInterval(async () => {
            try {
                await this.loadTransactions();
                this._pollFailures = 0;
            } catch {
                this._pollFailures++;
            }
        }, 30000);
    },
    
    // Stop polling
    stopPolling() {
        if (this._notifInterval) {
            clearInterval(this._notifInterval);
            this._notifInterval = null;
        }
        if (this._dashboardInterval) {
            clearInterval(this._dashboardInterval);
            this._dashboardInterval = null;
        }
        if (this._txInterval) {
            clearInterval(this._txInterval);
            this._txInterval = null;
        }
        this._pollFailures = 0;
        this._polling = false;
    },
    
    // Update notification badge in nav
    updateNotifBadge() {
        const badges = document.querySelectorAll('[id^="notif-badge"]');
        const count = this.unreadCount;
        badges.forEach(badge => {
            if (count > 0) {
                badge.textContent = count > 9 ? '9+' : count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    },
    
    // Computed
    get transactions() { return this.data.transactions; },
    get notifications() { return this.data.notifications; },
    get careFundRequests() { return this.data.careFundRequests; },
    get dashboard() { return this.data.dashboard; },
    get profile() { return this.data.profile; },
    
    get unreadCount() {
        return (this.data.notifications || []).filter(n => !n.read && !n.Read).length;
    }
};
