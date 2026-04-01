// Cache helper for instant data display
const cache = {
    set(key, data) {
        try {
            localStorage.setItem(`cache_${key}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch(e) {}
    },
    get(key) {
        try {
            const item = localStorage.getItem(`cache_${key}`);
            if (!item) return null;
            const parsed = JSON.parse(item);
            // Check if cache is expired (30 seconds)
            if (Date.now() - parsed.timestamp > 30000) {
                return null;
            }
            return parsed.data;
        } catch(e) {
            return null;
        }
    },
    clear() {
        Object.keys(localStorage)
            .filter(k => k.startsWith('cache_'))
            .forEach(k => localStorage.removeItem(k));
    }
};

// Request deduplication helper - prevents duplicate API calls
const inflightRequests = new Map();

function dedupeRequest(key, fetchFn) {
    // If request is already in flight, return existing promise
    if (inflightRequests.has(key)) {
        return inflightRequests.get(key);
    }

    // Start new request
    const promise = fetchFn().finally(() => {
        // Remove from in-flight map when complete
        inflightRequests.delete(key);
    });

    inflightRequests.set(key, promise);
    return promise;
}

// Hash helper for comparing data changes
function simpleHash(obj) {
    try {
        return JSON.stringify(obj).split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
    } catch(e) {
        return 0;
    }
}

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
    _dataHashes: {},
    _prefetchInProgress: {},

    data: {
        user: null,
        profile: null,
        transactions: null,
        notifications: null,
        careFundRequests: null,
        dashboard: null,
        members: null,
        receipts: null
    },
    
    // Check if data is stale (older than 30 seconds)
    isStale(key) {
        const timestamp = this._dataTimestamps[key];
        if (!timestamp) return true;
        return Date.now() - timestamp > 8000;
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
        this.data = { user: null, profile: null, transactions: null, notifications: null, careFundRequests: null, dashboard: null, members: null, receipts: [] };
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
        this.data = { user: null, profile: null, transactions: null, notifications: null, careFundRequests: null, dashboard: null, members: null, receipts: [] };
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
        this.data = { user: null, profile: null, transactions: null, notifications: null, careFundRequests: null, dashboard: null, members: null, receipts: [] };
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
        this.data = { user: null, profile: null, transactions: null, notifications: null, careFundRequests: null, dashboard: null, members: null, receipts: null };
        this._clearTimestamps();
        this._justLoggedIn = false;
        
        router.navigate('/login', true);
    },
    
    // Load dashboard
    async loadDashboard(force = false) {
        // Strategy 6: Request deduplication
        return dedupeRequest('dashboard', async () => {
            // Strategy 2: Load from cache instantly (SWR)
            if (this.data.dashboard === null) {
                const cached = cache.get('dashboard');
                if (cached) {
                    this.data.dashboard = cached;
                }
            }
            const hasCached = this.data.dashboard !== null;

            // Strategy 3: Prefetch for next likely page
            this._schedulePrefetch();

            // Return stale cached data immediately and revalidate in background
            if (!force && hasCached && this.isStale('dashboard')) {
                this._fetchDashboard().catch(() => {});
                return this.data.dashboard;
            }
            // Check if stale unless forced
            if (!force && !this.isStale('dashboard')) {
                return this.data.dashboard;
            }
            return this._fetchDashboard();
        });
    },

    async _fetchDashboard() {
        try {
            let freshData;
            if (this.isAdmin()) {
                freshData = await admin.getDashboard();
            } else {
                freshData = await member.getDashboard();
            }

            // Strategy 4: Compare hash - only update if changed
            const newHash = simpleHash(freshData);
            if (this._dataHashes['dashboard'] === newHash) {
                this._markFresh('dashboard');
                return this.data.dashboard;
            }

            this.data.dashboard = freshData;
            this._dataHashes['dashboard'] = newHash;
            cache.set('dashboard', this.data.dashboard);
            this._markFresh('dashboard');
        } catch (e) {
            console.warn('dashboard fetch failed, using cache');
        }
        return this.data.dashboard;
    },
    
    // Load transactions
    async loadTransactions(options = {}, force = false) {
        const cacheKey = 'transactions_' + JSON.stringify(options);
        // Strategy 6: Request deduplication
        return dedupeRequest(cacheKey, async () => {
            // Strategy 2: Load from cache instantly (SWR)
            if (this.data.transactions === null) {
                const cached = cache.get(cacheKey);
                if (cached) {
                    this.data.transactions = cached;
                }
            }
            const hasCached = Array.isArray(this.data.transactions);
            // Return stale cached data immediately and revalidate in background
            if (!force && hasCached && this.isStale('transactions')) {
                this._fetchTransactions(options, cacheKey).catch(() => {});
                return this.data.transactions;
            }
            // Check if stale unless forced
            if (!force && !this.isStale('transactions')) {
                return this.data.transactions;
            }
            return this._fetchTransactions(options, cacheKey);
        });
    },

    async _fetchTransactions(options = {}, cacheKey = null) {
        const key = cacheKey || ('transactions_' + JSON.stringify(options));
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

            const normalized = normalizeArray(raw);

            // Strategy 4: Compare hash - only update if changed
            const newHash = simpleHash(normalized);
            if (this._dataHashes['transactions'] === newHash) {
                this._markFresh('transactions');
                return this.data.transactions;
            }

            this.data.transactions = normalized;
            this._dataHashes['transactions'] = newHash;
            cache.set(key, this.data.transactions);
            this._markFresh('transactions');
            return this.data.transactions;
        } catch (e) {
            console.warn('transactions fetch failed, using cache');
            return this.data.transactions;
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
        // Strategy 6: Request deduplication
        return dedupeRequest('notifications', async () => {
            // Strategy 2: Load from cache instantly (SWR)
            if (this.data.notifications === null) {
                const cached = cache.get('notifications');
                if (cached) {
                    this.data.notifications = cached;
                }
            }
            const hasCached = Array.isArray(this.data.notifications);
            // Return stale cached data immediately and revalidate in background
            if (!force && hasCached && this.isStale('notifications')) {
                this._fetchNotifications().catch(() => {});
                return this.data.notifications;
            }
            // Check if stale unless forced
            if (!force && !this.isStale('notifications')) {
                return this.data.notifications;
            }
            return this._fetchNotifications();
        });
    },

    async _fetchNotifications() {
        try {
            const data = await member.getNotifications();
            const raw = Array.isArray(data.notifications) ? data.notifications : (Array.isArray(data) ? data : []);
            const normalized = normalizeArray(raw);

            // Strategy 4: Compare hash - only update if changed
            const newHash = simpleHash(normalized);
            if (this._dataHashes['notifications'] === newHash) {
                this._markFresh('notifications');
                return this.data.notifications;
            }

            this.data.notifications = normalized;
            this._dataHashes['notifications'] = newHash;
            cache.set('notifications', this.data.notifications);
            this._markFresh('notifications');
        } catch (e) {
            console.warn('notifications unavailable, using cache');
        }
        return this.data.notifications;
    },
    
    // Mark notification as read - optimistic
    markRead(id) {
        if (!Array.isArray(this.data.notifications)) return;
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
        const cacheKey = 'careFundRequests';
        // Strategy 6: Request deduplication
        return dedupeRequest(cacheKey, async () => {
            // Strategy 2: Load from cache instantly (SWR)
            if (this.data.careFundRequests === null) {
                const cached = cache.get(cacheKey);
                if (cached) {
                    this.data.careFundRequests = cached;
                }
            }
            const hasCached = Array.isArray(this.data.careFundRequests);
            // Return stale cached data immediately and revalidate in background
            if (!force && hasCached && this.isStale('careFundRequests')) {
                this._fetchCareFundRequests(status, cacheKey).catch(() => {});
                return status
                    ? (this.data.careFundRequests || []).filter(r => r.status === status)
                    : this.data.careFundRequests;
            }
            // Check if stale unless forced
            if (!force && !this.isStale('careFundRequests')) {
                if (status) {
                    return (this.data.careFundRequests || []).filter(r => r.status === status);
                }
                return this.data.careFundRequests;
            }
            return this._fetchCareFundRequests(status, cacheKey);
        });
    },

    async _fetchCareFundRequests(status, cacheKey = 'careFundRequests') {
        try {
            let result;
            if (this.isAdmin()) {
                result = await admin.getCareFundRequests(status);
                const raw = Array.isArray(result) ? result : (result?.requests || []);
                const normalized = normalizeArray(raw);

                // Strategy 4: Compare hash - only update if changed
                const newHash = simpleHash(normalized);
                if (this._dataHashes['careFundRequests'] !== newHash) {
                    this.data.careFundRequests = normalized;
                    this._dataHashes['careFundRequests'] = newHash;
                }
            } else {
                result = await member.getCareFundRequests();
                const normalized = normalizeArray(result);

                // Strategy 4: Compare hash - only update if changed
                const newHash = simpleHash(normalized);
                if (this._dataHashes['careFundRequests'] !== newHash) {
                    this.data.careFundRequests = normalized;
                    this._dataHashes['careFundRequests'] = newHash;
                }
            }
            if (status) {
                this.data.careFundRequests = this.data.careFundRequests.filter(r => r.status === status);
            }
            cache.set(cacheKey, this.data.careFundRequests);
            this._markFresh('careFundRequests');
        } catch (e) {
            console.warn('care fund requests fetch failed, using cache');
        }
        return this.data.careFundRequests;
    },
    
    // Submit care fund request - optimistic
    async submitCareFundRequest({ amount, occasion, event_date, description, type = 'care_fund' }) {
        if (!Array.isArray(this.data.careFundRequests)) this.data.careFundRequests = [];
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
        if (!Array.isArray(this.data.careFundRequests)) this.data.careFundRequests = [];
        const idx = this.data.careFundRequests.findIndex(r => r.id === id);
        if (idx !== -1) {
            this.data.careFundRequests[idx].status = status;
            if (rejection_reason) this.data.careFundRequests[idx].rejection_reason = rejection_reason;
            window.dispatchEvent(new CustomEvent('dataUpdated', { detail: { type: 'careFundRequests', data: this.data.careFundRequests } }));
        }
        try {
            const result = await admin.updateCareFundRequest(id, status, rejection_reason);
            await this.loadCareFundRequests(null, true);
            if (!this.isAdmin()) {
                await this.loadNotifications(true);
            }
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
        if (!Array.isArray(this.data.transactions)) this.data.transactions = [];
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
        const cacheKey = 'members';
        // Strategy 6: Request deduplication
        return dedupeRequest(cacheKey, async () => {
            // Strategy 2: Load from cache instantly (SWR)
            if (this.data.members === null) {
                const cached = cache.get(cacheKey);
                if (cached) {
                    this.data.members = cached;
                }
            }
            const hasCached = Array.isArray(this.data.members);
            // Return stale cached data immediately and revalidate in background
            if (!force && hasCached && this.isStale('members')) {
                this._fetchAllMembers(cacheKey).catch(() => {});
                return this.data.members;
            }
            // Check if stale unless forced
            if (!force && !this.isStale('members')) {
                return this.data.members;
            }
            return this._fetchAllMembers(cacheKey);
        });
    },

    async _fetchAllMembers(cacheKey = 'members') {
        try {
            const freshData = await admin.getAllMembers();

            // Strategy 4: Compare hash - only update if changed
            const newHash = simpleHash(freshData);
            if (this._dataHashes['members'] === newHash) {
                this._markFresh('members');
                return this.data.members;
            }

            this.data.members = freshData;
            this._dataHashes['members'] = newHash;
            cache.set(cacheKey, this.data.members);
            this._markFresh('members');
        } catch (e) {
            console.warn('members fetch failed, using cache');
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
    _pollDelay: 8000,
    _visibilityListenerAttached: false,
    _visibilityChangeHandler: null,

    // Strategy 3: Prefetch next likely pages
    _schedulePrefetch() {
        const currentPath = window.location.pathname;

        // Prefetch based on current page
        if (currentPath.includes('dashboard') && !this._prefetchInProgress['transactions']) {
            this._prefetchInProgress['transactions'] = true;
            setTimeout(() => {
                this.loadTransactions({}, false).catch(() => {}).finally(() => {
                    this._prefetchInProgress['transactions'] = false;
                });
            }, 1000);
        }

        if (currentPath.includes('transactions') && !this._prefetchInProgress['careFundRequests']) {
            this._prefetchInProgress['careFundRequests'] = true;
            setTimeout(() => {
                this.loadCareFundRequests(null, false).catch(() => {}).finally(() => {
                    this._prefetchInProgress['careFundRequests'] = false;
                });
            }, 1000);
        }

        if (currentPath.includes('care-fund') && !this._prefetchInProgress['notifications']) {
            this._prefetchInProgress['notifications'] = true;
            setTimeout(() => {
                this.loadNotifications(false).catch(() => {}).finally(() => {
                    this._prefetchInProgress['notifications'] = false;
                });
            }, 1000);
        }
    },

    // Start polling
    startPolling() {
        if (this._polling) return;
        this._polling = true;
        this.stopPolling();

        if (!this.isLoggedIn()) return;

        // Strategy 4: Stop polling when tab is hidden
        if (!this._visibilityListenerAttached) {
            this._visibilityChangeHandler = () => {
                if (document.hidden) {
                    this.stopPolling();
                } else if (this.isLoggedIn()) {
                    this.startPolling();
                }
            };
            document.addEventListener('visibilitychange', this._visibilityChangeHandler);
            this._visibilityListenerAttached = true;
        }

        // Reset poll delay
        this._pollDelay = 8000;
        this._pollFailures = 0;

        // Poll notifications
        if (!this.isAdmin()) {
            this._notifInterval = setInterval(async () => {
                try {
                    await this.loadNotifications();
                    this.updateNotifBadge();
                    // Reset delay on success
                    if (this._pollFailures > 0) {
                        this._pollFailures = 0;
                        this._pollDelay = 8000;
                    }
                } catch (e) {
                    this._handlePollFailure();
                }
            }, this._pollDelay);
        }

        // Poll dashboard
        this._dashboardInterval = setInterval(async () => {
            try {
                await this.loadDashboard();
            } catch (e) {
                this._handlePollFailure();
            }
        }, this._pollDelay);

        // Poll transactions
        this._txInterval = setInterval(async () => {
            try {
                await this.loadTransactions();
            } catch (e) {
                this._handlePollFailure();
            }
        }, this._pollDelay);
    },

    // Strategy 4: Exponential backoff on poll failures
    _handlePollFailure() {
        this._pollFailures++;
        const newDelay = Math.min(this._pollDelay * 2, 60000); // Max 60s
        if (newDelay !== this._pollDelay) {
            this._pollDelay = newDelay;
            // Restart polling with new delay
            this.stopPolling();
            this.startPolling();
        }
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
