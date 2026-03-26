// Store - State management with API integration
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
    
    // Auth methods using API
    isLoggedIn() {
        return auth.isLoggedIn();
    },
    
    isAdmin() {
        return auth.isAdmin();
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
    
    // Login member
    async login(name, password) {
        await auth.login(name, password);
        this.user = { name };
        // Fetch profile after login
        try {
            this.data.profile = await member.getProfile();
            this.user = { ...this.user, ...this.data.profile };
        } catch {}
        return true;
    },
    
    // Register member
    async register({ name, password, interval, committed_amount, start_date }) {
        await auth.register({ name, password, interval, committed_amount, start_date });
        this.user = { name, interval, committed_amount };
        return true;
    },
    
    // Admin login
    async adminLogin(password) {
        await auth.adminLogin(password);
        this.user = { name: 'Admin', isAdmin: true };
        return true;
    },
    
    // Logout
    async logout() {
        if (this.isAdmin()) {
            await auth.adminLogout();
        } else {
            await auth.logout();
        }
        this.user = null;
        this.data = {
            user: null,
            profile: null,
            transactions: [],
            notifications: [],
            careFundRequests: [],
            dashboard: null,
            members: []
        };
        router.navigate('/login');
    },
    
    // Load profile
    async loadProfile() {
        if (!this.isLoggedIn()) return;
        try {
            this.data.profile = await member.getProfile();
            return this.data.profile;
        } catch (e) {
            console.error('Failed to load profile:', e);
            return null;
        }
    },
    
    // Load dashboard
    async loadDashboard() {
        if (!this.isLoggedIn()) return;
        try {
            if (this.isAdmin()) {
                this.data.dashboard = await admin.getDashboard();
            } else {
                this.data.dashboard = await member.getDashboard();
            }
            return this.data.dashboard;
        } catch (e) {
            console.error('Failed to load dashboard:', e);
            return null;
        }
    },
    
    // Load transactions
    async loadTransactions(options = {}) {
        if (!this.isLoggedIn()) return [];
        try {
            let result;
            if (this.isAdmin()) {
                result = await admin.getTransactions(options);
            } else {
                result = await member.getTransactions(options);
            }
            this.data.transactions = result.transactions || [];
            return this.data.transactions;
        } catch (e) {
            console.error('Failed to load transactions:', e);
            return [];
        }
    },
    
    // Load notifications
    async loadNotifications() {
        if (!this.isLoggedIn()) return [];
        try {
            const result = await member.getNotifications();
            this.data.notifications = result.notifications || [];
            return this.data.notifications;
        } catch (e) {
            console.error('Failed to load notifications:', e);
            return [];
        }
    },
    
    // Mark notification as read
    async markRead(id) {
        try {
            await member.markNotificationRead(id);
            const notif = this.data.notifications.find(n => n.id === id);
            if (notif) notif.read = true;
        } catch (e) {
            console.error('Failed to mark notification:', e);
        }
    },
    
    // Mark all notifications as read
    async markAllRead() {
        const unread = this.data.notifications.filter(n => !n.read);
        for (const n of unread) {
            await this.markRead(n.id);
        }
    },
    
    // Load care fund requests
    async loadCareFundRequests(status) {
        if (!this.isLoggedIn()) return [];
        try {
            let result;
            if (this.isAdmin()) {
                result = await admin.getCareFundRequests(status);
                this.data.careFundRequests = result.requests || [];
            } else {
                // Members use dashboard or try the endpoint
                try {
                    result = await member.getCareFundRequests();
                    this.data.careFundRequests = result.requests || [];
                } catch {
                    // Route not registered, use dashboard data
                    this.data.careFundRequests = [];
                }
            }
            return this.data.careFundRequests;
        } catch (e) {
            console.error('Failed to load care fund requests:', e);
            return [];
        }
    },
    
    // Submit care fund request (member)
    async submitCareFundRequest({ amount, occasion, event_date, description }) {
        const result = await member.submitCareFundRequest({ amount, occasion, event_date, description });
        // Optimistic: add to local list
        this.data.careFundRequests.unshift({
            ...result,
            status: 'pending',
            created_at: new Date().toISOString()
        });
        return result;
    },
    
    // Approve/reject care fund request (admin)
    async updateCareFundRequest(id, status, rejection_reason) {
        const result = await admin.updateCareFundRequest(id, status, rejection_reason);
        // Update local state
        const req = this.data.careFundRequests.find(r => r.id === id);
        if (req) {
            req.status = status;
            if (rejection_reason) req.rejection_reason = rejection_reason;
        }
        return result;
    },
    
    // Create transaction (admin)
    async createTransaction({ member_id, pool, type, amount, reason, receipt_url }) {
        const result = await admin.createTransaction({ member_id, pool, type, amount, reason, receipt_url });
        // Add to local list
        this.data.transactions.unshift(result);
        return result;
    },
    
    // Create member (admin)
    async createMember({ name, password, interval, committed_amount, start_date }) {
        return admin.createMember({ name, password, interval, committed_amount, start_date });
    },
    
    // Reset member password (admin)
    async resetPassword(member_id, new_password) {
        return admin.resetPassword(member_id, new_password);
    },
    
    // Upload receipt (admin)
    async uploadReceipt(file) {
        return admin.uploadReceipt(file);
    },
    
    // Change password (member)
    async changePassword(current_password, new_password) {
        return member.changePassword(current_password, new_password);
    },
    
    // Transfer pool2 to pool1 (member)
    async transferPool(amount) {
        const result = await member.transferPool(amount);
        // Reload dashboard to get updated balances
        await this.loadDashboard();
        return result;
    },
    
    // Load general ledger (admin)
    async loadGeneralLedger(options = {}) {
        if (!this.isAdmin()) return null;
        try {
            return await admin.getGeneralLedger(options);
        } catch (e) {
            console.error('Failed to load general ledger:', e);
            return null;
        }
    },
    
    // Computed
    get transactions() { return this.data.transactions; },
    get notifications() { return this.data.notifications; },
    get careFundRequests() { return this.data.careFundRequests; },
    get dashboard() { return this.data.dashboard; },
    get profile() { return this.data.profile; },
    
    get unreadCount() {
        return this.data.notifications.filter(n => !n.read).length;
    }
};
