// Store - State management with API integration (falls back to mock data)
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
    
    // Check if using mock data
    usingMock() {
        return !backendAvailable;
    },
    
    // Auth methods
    isLoggedIn() {
        return this.usingMock() ? !!localStorage.getItem('mock_logged_in') : auth.isLoggedIn();
    },
    
    isAdmin() {
        return this.usingMock() ? localStorage.getItem('mock_is_admin') === 'true' : auth.isAdmin();
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
    
    // Login member (mock or real)
    async login(name, password) {
        if (!backendAvailable) {
            // Mock login - accept any credentials
            localStorage.setItem('mock_logged_in', 'true');
            localStorage.setItem('mock_is_admin', 'false');
            this.user = { id: '1', name, interval: 'monthly', committed_amount: 50000, status: 'active' };
            return;
        }
        try {
            await auth.login(name, password);
            this.user = { name };
            try {
                this.data.profile = await member.getProfile();
                this.user = { ...this.user, ...this.data.profile };
            } catch {}
        } catch (e) {
            // Fallback to mock on API error
            console.log('API failed, using mock login');
            localStorage.setItem('mock_logged_in', 'true');
            localStorage.setItem('mock_is_admin', 'false');
            this.user = { id: '1', name, interval: 'monthly', committed_amount: 50000, status: 'active' };
        }
    },
    
    // Register member (mock or real)
    async register({ name, password, interval, committed_amount, start_date }) {
        if (!backendAvailable) {
            localStorage.setItem('mock_logged_in', 'true');
            localStorage.setItem('mock_is_admin', 'false');
            this.user = { id: '1', name, interval, committed_amount, start_date, status: 'active' };
            return;
        }
        // Register returns { status: "created" } without tokens
        // Must login after registering
        await auth.register({ name, password, interval, committed_amount, start_date });
        // Auto-login
        await this.login(name, password);
    },
    
    // Admin login (mock or real)
    async adminLogin(password) {
        if (!backendAvailable) {
            localStorage.setItem('mock_logged_in', 'true');
            localStorage.setItem('mock_is_admin', 'true');
            this.user = { name: 'Admin', isAdmin: true };
            return;
        }
        try {
            await auth.adminLogin(password);
            this.user = { name: 'Admin', isAdmin: true };
        } catch (e) {
            console.log('API failed, using mock admin login');
            localStorage.setItem('mock_logged_in', 'true');
            localStorage.setItem('mock_is_admin', 'true');
            this.user = { name: 'Admin', isAdmin: true };
        }
    },
    
    // Logout
    async logout() {
        if (this.usingMock()) {
            localStorage.removeItem('mock_logged_in');
            localStorage.removeItem('mock_is_admin');
        } else {
            if (this.isAdmin()) {
                await auth.adminLogout();
            } else {
                await auth.logout();
            }
        }
        this.user = null;
        localStorage.removeItem('user_data');
        this.data = { user: null, profile: null, transactions: [], notifications: [], careFundRequests: [], dashboard: null, members: [] };
        router.navigate('/login');
    },
    
    // Load dashboard
    async loadDashboard() {
        if (this.usingMock()) {
            this.data.dashboard = mockData.dashboard;
            return this.data.dashboard;
        }
        try {
            if (this.isAdmin()) {
                this.data.dashboard = await admin.getDashboard();
            } else {
                this.data.dashboard = await member.getDashboard();
            }
            return this.data.dashboard;
        } catch (e) {
            console.error('Failed to load dashboard:', e);
            this.data.dashboard = mockData.dashboard;
            return this.data.dashboard;
        }
    },
    
    // Load transactions
    async loadTransactions(options = {}) {
        if (this.usingMock()) {
            let tx = mockData.transactions;
            if (options.pool) tx = tx.filter(t => t.pool === options.pool);
            this.data.transactions = tx;
            return tx;
        }
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
            return mockData.transactions;
        }
    },
    
    // Load notifications
    async loadNotifications() {
        if (!backendAvailable) {
            this.data.notifications = mockData.notifications;
            return this.data.notifications;
        }
        try {
            const data = await member.getNotifications();
            // Backend returns array directly
            this.data.notifications = Array.isArray(data.notifications) ? data.notifications : (Array.isArray(data) ? data : []);
            return this.data.notifications;
        } catch (e) {
            return mockData.notifications;
        }
    },
    
    // Mark notification as read
    async markRead(id) {
        if (this.usingMock()) {
            const notif = mockData.notifications.find(n => n.id === id);
            if (notif) notif.read = true;
            return;
        }
        try {
            await member.markNotificationRead(id);
            const notif = this.data.notifications.find(n => n.id === id);
            if (notif) notif.read = true;
        } catch {}
    },
    
    // Mark all as read
    async markAllRead() {
        if (this.usingMock()) {
            mockData.notifications.forEach(n => n.read = true);
            return;
        }
        const unread = this.data.notifications.filter(n => !n.read);
        for (const n of unread) {
            await this.markRead(n.id);
        }
    },
    
    // Load care fund requests
    async loadCareFundRequests(status) {
        if (!backendAvailable) {
            let reqs = mockData.careFundRequests;
            if (status) reqs = reqs.filter(r => r.status === status);
            this.data.careFundRequests = reqs;
            return reqs;
        }
        try {
            let result;
            if (this.isAdmin()) {
                result = await admin.getCareFundRequests(status);
                // Backend returns direct array
                this.data.careFundRequests = Array.isArray(result) ? result : (result.requests || []);
            } else {
                // Members don't have a direct endpoint, use mock for now
                this.data.careFundRequests = mockData.careFundRequests.filter(r => r.member_id === '1');
            }
            return this.data.careFundRequests;
        } catch (e) {
            return mockData.careFundRequests;
        }
    },
    
    // Submit care fund request
    async submitCareFundRequest({ amount, occasion, event_date, description }) {
        if (this.usingMock()) {
            const newReq = {
                id: String(Date.now()),
                member_id: '1',
                member_name: this.user?.name || 'You',
                amount, occasion, event_date, description,
                status: 'pending', rejection_reason: null,
                created_at: new Date().toISOString()
            };
            mockData.careFundRequests.unshift(newReq);
            return newReq;
        }
        return member.submitCareFundRequest({ amount, occasion, event_date, description });
    },
    
    // Update care fund request (approve/reject)
    async updateCareFundRequest(id, status, rejection_reason) {
        if (this.usingMock()) {
            const req = mockData.careFundRequests.find(r => r.id === id);
            if (req) {
                req.status = status;
                if (rejection_reason) req.rejection_reason = rejection_reason;
            }
            return req;
        }
        return admin.updateCareFundRequest(id, status, rejection_reason);
    },
    
    // Create transaction
    async createTransaction(data) {
        if (this.usingMock()) {
            const tx = { id: String(Date.now()), ...data, created_at: new Date().toISOString() };
            mockData.transactions.unshift(tx);
            return tx;
        }
        return admin.createTransaction(data);
    },
    
    // Create member
    async createMember(data) {
        if (this.usingMock()) {
            const m = { id: String(Date.now()), ...data, status: 'active' };
            mockData.members.push(m);
            return m;
        }
        return admin.createMember(data);
    },
    
    // Reset password
    async resetPassword(member_id, new_password) {
        if (this.usingMock()) return { success: true };
        return admin.resetPassword(member_id, new_password);
    },
    
    // Upload receipt
    async uploadReceipt(file) {
        if (this.usingMock()) return { receipt_url: 'mock://receipt.png' };
        return admin.uploadReceipt(file);
    },
    
    // Change password
    async changePassword(current_password, new_password) {
        if (this.usingMock()) return { success: true };
        return member.changePassword(current_password, new_password);
    },
    
    // Transfer pool
    async transferPool(amount) {
        if (this.usingMock()) return { success: true };
        return member.transferPool(amount);
    },
    
    // Load general ledger
    async loadGeneralLedger(options = {}) {
        if (this.usingMock()) return { transactions: mockData.transactions, pool1_balance: mockData.dashboard.pool1_balance, pool2_balance: mockData.dashboard.pool2_balance };
        if (!this.isAdmin()) return null;
        return admin.getGeneralLedger(options);
    },
    
    // Polling intervals
    _notifInterval: null,
    _dashboardInterval: null,
    
    // Start polling
    startPolling() {
        this.stopPolling();
        
        if (!this.isLoggedIn()) return;
        
        // Poll notifications every 30 seconds
        this._notifInterval = setInterval(async () => {
            try {
                await this.loadNotifications();
                this.updateNotifBadge();
            } catch {}
        }, 30000);
        
        // Poll dashboard every 60 seconds
        this._dashboardInterval = setInterval(async () => {
            try {
                await this.loadDashboard();
            } catch {}
        }, 60000);
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
        return (this.data.notifications.length ? this.data.notifications : mockData.notifications).filter(n => !n.read).length;
    }
};
