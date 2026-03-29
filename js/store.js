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
    _justLoggedIn: false,
    _dataTimestamps: {},
    
    data: {
        user: null,
        profile: null,
        transactions: [],
        notifications: [],
        careFundRequests: [],
        dashboard: null,
        members: [],
        receipts: []
    },
    
    // Check if data is stale (older than 30 seconds)
    isStale(key) {
        const timestamp = this._dataTimestamps[key];
        if (!timestamp) return true;
        return Date.now() - timestamp > 30000;
    },
    
    // Mark data as fetched (update timestamp)
    _markFresh(key) {
        this._dataTimestamps[key] = Date.now();
    },
    
    // Clear all data timestamps (on logout)
    _clearTimestamps() {
        this._dataTimestamps = {};
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
        sessionStorage.clear();
        
        // Restore language
        if (lang) localStorage.setItem('language', lang);
        
        // Reset all in-memory store data and clear timestamps
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [], receipts: [] };
        this._clearTimestamps();
        
        // Mark as just logged in to force fresh fetch
        this._justLoggedIn = true;
        
        // Login
        await auth.login(name, password);
        authState.set(tokens.access, false);
        
        // Store new user and load fresh profile
        this.user = { name };
        this.data.profile = await member.getProfile();
        this.user = { ...this.user, ...this.data.profile };
        
        // Mark data as fresh
        this._markFresh('profile');
    },
    
    // Register member - always use real API
    async register({ name, password, interval, committed_amount, start_date }) {
        // Save language preference before clearing
        const lang = localStorage.getItem('language');
        
        // Clear absolutely everything - localStorage, sessionStorage, and auth state
        authState.clear();
        localStorage.clear();
        sessionStorage.clear();
        
        // Restore language
        if (lang) localStorage.setItem('language', lang);
        
        // Reset all in-memory store data and clear timestamps
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [], receipts: [] };
        this._clearTimestamps();
        
        // Mark as just logged in to force fresh fetch
        this._justLoggedIn = true;
        
        // Register
        await auth.register({ name, password, interval, committed_amount, start_date });
        
        // Auto login with new credentials
        await auth.login(name, password);
        authState.set(tokens.access, false);
        
        // Store new user and load fresh profile
        this.user = { name };
        this.data.profile = await member.getProfile();
        this.user = { ...this.user, ...this.data.profile };
        
        // Mark data as fresh
        this._markFresh('profile');
    },
    
    // Admin login - always use real API
    async adminLogin(password) {
        // Save language preference before clearing
        const lang = localStorage.getItem('language');
        
        // Clear absolutely everything first
        authState.clear();
        localStorage.clear();
        sessionStorage.clear();
        
        // Restore language
        if (lang) localStorage.setItem('language', lang);
        
        // Reset all in-memory store data and clear timestamps
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [], receipts: [] };
        this._clearTimestamps();
        
        // Mark as just logged in to force fresh fetch
        this._justLoggedIn = true;
        
        // Admin login
        const data = await auth.adminLogin(password);
        authState.set(data.access_token, true);
        
        // Store admin user
        this.user = { name: 'Admin', isAdmin: true };
    },
    
    // Logout - clear EVERYTHING
    async logout() {
        // Save language preference before clearing
        const lang = localStorage.getItem('language');
        
        // Stop all polling first
        this.stopPolling();
        
        // Clear auth state
        authState.clear();
        
        // Clear all localStorage except language
        localStorage.clear();
        
        // Restore language
        if (lang) localStorage.setItem('language', lang);
        
        // Clear session storage
        sessionStorage.clear();
        
        // Clear all data and timestamps
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [], receipts: [] };
        this._clearTimestamps();
        this._justLoggedIn = false;
        
        router.navigate('/login');
    },
    
    // Load dashboard
    async loadDashboard(force = false) {
        // Check if stale unless forced
        if (!force && !this.isStale('dashboard')) {
            return this.data.dashboard || {};
        }
        try {
            if (this.isAdmin()) {
                this.data.dashboard = await admin.getDashboard();
            } else {
                this.data.dashboard = await member.getDashboard();
            }
            this._markFresh('dashboard');
        } catch (e) {
            console.error('Failed to load dashboard:', e);
            this.data.dashboard = {};
        }
        return this.data.dashboard || {};
    },
    
    // Load transactions
    async loadTransactions(options = {}, force = false) {
        // Check if stale unless forced
        if (!force && !this.isStale('transactions')) {
            return this.data.transactions || [];
        }
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
            this._markFresh('transactions');
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
    
    async loadNotifications(force = false) {
        // Check if stale unless forced
        if (!force && !this.isStale('notifications')) {
            return this.data.notifications || [];
        }
        try {
            const data = await member.getNotifications();
            const raw = Array.isArray(data.notifications) ? data.notifications : (Array.isArray(data) ? data : []);
            this.data.notifications = normalizeArray(raw);
            this._markFresh('notifications');
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
    async loadCareFundRequests(status, force = false) {
        // Check if stale unless forced
        if (!force && !this.isStale('careFundRequests')) {
            if (status) {
                return (this.data.careFundRequests || []).filter(r => r.status === status);
            }
            return this.data.careFundRequests || [];
        }
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
            this._markFresh('careFundRequests');
        } catch (e) {
            console.error('Failed to load care fund requests:', e);
            this.data.careFundRequests = [];
        }
        return this.data.careFundRequests;
    },
    
    // Submit care fund request - optimistic
    async submitCareFundRequest({ amount, occasion, event_date, description, type = 'care_fund' }) {
        const optimisticReq = {
            id: 'temp-' + Date.now(),
            member_id: this.user?.id,
            member_name: this.user?.name || 'You',
            amount, occasion, event_date, description, type,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        this.data.careFundRequests.unshift(optimisticReq);
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'careFundRequests', data: this.data.careFundRequests } }));
        
        try {
            const result = await member.submitCareFundRequest({ amount, occasion, event_date, description, type });
            const idx = this.data.careFundRequests.findIndex(r => r.id === optimisticReq.id);
            if (idx !== -1) {
                this.data.careFundRequests[idx] = normalizeItem(result);
            }
            await this.loadCareFundRequests(null, true);
            window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'careFundRequests', data: this.data.careFundRequests } }));
            return result;
        } catch (e) {
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
            window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'careFundRequests', data: this.data.careFundRequests } }));
        }
        try {
            const result = await admin.updateCareFundRequest(id, status, rejection_reason);
            await this.loadCareFundRequests(null, true);
            await this.loadNotifications(true);
            window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'careFundRequests', data: this.data.careFundRequests } }));
            return result;
        } catch (e) {
            if (idx !== -1) {
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
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'transactions', data: this.data.transactions } }));
        
        try {
            const result = await admin.createTransaction(data);
            await this.loadTransactions({}, true);
            await this.loadDashboard(true);
            window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'transactions', data: this.data.transactions } }));
            return result;
        } catch (e) {
            this.data.transactions = this.data.transactions.filter(t => t.id !== optimisticTx.id);
            throw e;
        }
    },
    
    // Create member
    async createMember(data) {
        const result = await admin.createMember(data);
        await this.loadAllMembers(true);
        window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'members', data: this.data.members } }));
        return result;
    },
    
    // Reset password
    async resetPassword(member_id, new_password) {
        return admin.resetPassword(member_id, new_password);
    },
    
    // Load all members (admin)
    async loadAllMembers(force = false) {
        // Check if stale unless forced
        if (!force && !this.isStale('members')) {
            return this.data.members || [];
        }
        try {
            this.data.members = await admin.getAllMembers();
            this._markFresh('members');
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
    async loadProfile(force = false) {
        // Check if stale unless forced
        if (!force && !this.isStale('profile')) {
            return this.data.profile;
        }
        try {
            this.data.profile = await member.getProfile();
            this.user = { ...this.user, ...this.data.profile };
            this._markFresh('profile');
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
        const result = await member.transferPool(amount);
        // Force reload dashboard and transactions
        await this.loadDashboard(true);
        await this.loadTransactions({}, true);
        return result;
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
                const oldCount = (this.data.notifications || []).filter(n => !n.read).length;
                await this.loadNotifications();
                this.updateNotifBadge();
                this._pollFailures = 0;
                // Trigger custom event for UI update
                const newCount = (this.data.notifications || []).filter(n => !n.read).length;
                if (newCount !== oldCount) {
                    window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'notifications', data: this.data.notifications } }));
                }
            } catch {
                this._pollFailures++;
            }
        }, 30000);
        
        // Poll dashboard every 30 seconds
        this._dashboardInterval = setInterval(async () => {
            try {
                await this.loadDashboard();
                this._pollFailures = 0;
                window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'dashboard', data: this.data.dashboard } }));
            } catch {
                this._pollFailures++;
            }
        }, 30000);
        
        // Poll transactions every 30 seconds
        this._txInterval = setInterval(async () => {
            try {
                await this.loadTransactions();
                this._pollFailures = 0;
                window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'transactions', data: this.data.transactions } }));
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
