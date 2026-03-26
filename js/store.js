// Store - Sophisticated auth state management
const store = {
    data: {
        user: null,
        accessToken: null,
        refreshToken: null,
        notifications: [],
        lastActivity: Date.now(),
        authStatus: 'idle', // idle | loading | authenticated | expired | error
        authError: null,
        sessionExpiry: null
    },
    
    // Property getters
    get user() { return this.data.user; },
    get notifications() { return this.data.notifications; },
    get isAuthenticated() { return this.data.authStatus === 'authenticated'; },
    get isLoading() { return this.data.authStatus === 'loading'; },
    get authState() { return this.data.authStatus; },
    
    init() {
        this.data.user = JSON.parse(localStorage.getItem('user') || 'null');
        this.data.accessToken = localStorage.getItem('access_token');
        this.data.refreshToken = localStorage.getItem('refresh_token');
        this.data.notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        this.data.authStatus = this.data.user ? 'authenticated' : 'idle';
        
        this.setupActivityTracking();
        this.checkSessionExpiry();
    },
    
    setupActivityTracking() {
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, () => this.updateActivity(), { passive: true });
        });
    },
    
    updateActivity() {
        this.data.lastActivity = Date.now();
    },
    
    checkSessionExpiry() {
        if (!this.data.accessToken) return;
        try {
            const tokenData = JSON.parse(atob(this.data.accessToken));
            this.data.sessionExpiry = tokenData.exp;
            if (tokenData.exp < Date.now()) {
                this.refreshSession();
            }
        } catch(e) {
            this.logout();
        }
    },
    
    setUser(user, accessToken = null, refreshToken = null) {
        this.data.user = user;
        this.data.accessToken = accessToken;
        this.data.refreshToken = refreshToken;
        this.data.authStatus = user ? 'authenticated' : 'idle';
        this.data.authError = null;
        
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            if (accessToken) localStorage.setItem('access_token', accessToken);
            if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    },
    
    async login(name, password, isAdmin = false) {
        this.data.authStatus = 'loading';
        this.data.authError = null;
        
        // Simulate network delay for realistic UX
        await new Promise(r => setTimeout(r, 300));
        
        const mockUsers = {
            'admin': { id: 0, name: 'Family Manager', role: 'admin', password: 'admin123' },
            'Taiwo Odelade': { id: 1, name: 'Taiwo Odelade', role: 'member', schedule: 'monthly', amount: 5000, password: 'taiwo123' },
            'Kehinde Odelade': { id: 2, name: 'Kehinde Odelade', role: 'member', schedule: 'monthly', amount: 3000, password: 'kehinde123' },
            'Adebayo Odelade': { id: 3, name: 'Adebayo Odelade', role: 'member', schedule: 'weekly', amount: 1000, password: 'adebayo123' },
            'Folake Odelade': { id: 4, name: 'Folake Odelade', role: 'member', schedule: 'monthly', amount: 5000, password: 'folake123' },
        };
        
        const user = mockUsers[name];
        
        if (!user) {
            this.data.authStatus = 'error';
            this.data.authError = 'user_not_found';
            return { success: false, error: 'We couldn\'t find an account with that name. Please check the spelling and try again.' };
        }
        
        if (user.password !== password) {
            this.data.authStatus = 'error';
            this.data.authError = 'wrong_password';
            return { success: false, error: 'That password doesn\'t match. Please try again or ask your family manager for help.' };
        }
        
        if (isAdmin && user.role !== 'admin') {
            this.data.authStatus = 'error';
            this.data.authError = 'not_admin';
            return { success: false, error: 'This account is not a manager. Use the family login instead.' };
        }
        
        if (!isAdmin && user.role === 'admin') {
            this.data.authStatus = 'error';
            this.data.authError = 'is_admin';
            return { success: false, error: 'This is a manager account. Please use the manager login page.' };
        }
        
        const accessToken = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 900000 }));
        const refreshToken = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 604800000 }));
        
        this.setUser(user, accessToken, refreshToken);
        this.addMockNotifications();
        
        return { success: true, user };
    },
    
    async register(name, password, schedule, amount, startDate) {
        this.data.authStatus = 'loading';
        
        await new Promise(r => setTimeout(r, 300));
        
        const user = {
            id: Date.now(),
            name: name,
            role: 'member',
            schedule: schedule,
            amount: parseInt(amount) || 0,
            startDate: startDate,
            createdAt: new Date().toISOString()
        };
        
        const accessToken = btoa(JSON.stringify({ userId: user.id, role: 'member', exp: Date.now() + 900000 }));
        const refreshToken = btoa(JSON.stringify({ userId: user.id, role: 'member', exp: Date.now() + 604800000 }));
        
        this.setUser(user, accessToken, refreshToken);
        this.addMockNotifications();
        
        return { success: true, user };
    },
    
    addMockNotifications() {
        if (this.data.notifications.length === 0) {
            this.data.notifications = [
                { id: 1, message: 'Welcome to Odelade Family Ledger! Your account is ready.', type: 'success', read: false, time: new Date().toISOString() },
                { id: 2, message: 'Family savings balance updated: ₦1,250,000', type: 'info', read: false, time: new Date(Date.now() - 3600000).toISOString() },
                { id: 3, message: 'New care fund request from Emeka', type: 'warning', read: false, time: new Date(Date.now() - 7200000).toISOString() },
                { id: 4, message: 'Monthly savings reminder: ₦50,000 due soon', type: 'info', read: true, time: new Date(Date.now() - 86400000).toISOString() },
                { id: 5, message: 'Care fund request approved for Folake', type: 'success', read: true, time: new Date(Date.now() - 172800000).toISOString() },
            ];
            localStorage.setItem('notifications', JSON.stringify(this.data.notifications));
        }
    },
    
    logout() {
        this.setUser(null);
        this.data.authStatus = 'idle';
        router.navigate('/login');
    },
    
    isLoggedIn() {
        if (!this.data.user || !this.data.accessToken) return false;
        return this.data.authStatus === 'authenticated';
    },
    
    refreshSession() {
        if (!this.data.refreshToken) {
            this.logout();
            return false;
        }
        
        try {
            const tokenData = JSON.parse(atob(this.data.refreshToken));
            if (tokenData.exp < Date.now()) {
                this.logout();
                return false;
            }
            
            const newAccessToken = btoa(JSON.stringify({ userId: tokenData.userId, role: tokenData.role, exp: Date.now() + 900000 }));
            this.data.accessToken = newAccessToken;
            this.data.sessionExpiry = Date.now() + 900000;
            localStorage.setItem('access_token', newAccessToken);
            return true;
        } catch(e) {
            this.logout();
            return false;
        }
    },
    
    isAdmin() {
        return this.data.user && this.data.user.role === 'admin';
    },
    
    isMember() {
        return this.data.user && this.data.user.role === 'member';
    },
    
    getUser() {
        return this.data.user;
    },
    
    getSessionTimeRemaining() {
        if (!this.data.sessionExpiry) return null;
        const remaining = this.data.sessionExpiry - Date.now();
        return remaining > 0 ? remaining : 0;
    },
    
    addNotification(msg, type = 'info') {
        const notification = {
            id: Date.now(),
            message: msg,
            type,
            read: false,
            time: new Date().toISOString()
        };
        this.data.notifications.unshift(notification);
        localStorage.setItem('notifications', JSON.stringify(this.data.notifications));
    },
    
    markAsRead(id) {
        const notif = this.data.notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            localStorage.setItem('notifications', JSON.stringify(this.data.notifications));
        }
    },
    
    markAllRead() {
        this.data.notifications.forEach(n => n.read = true);
        localStorage.setItem('notifications', JSON.stringify(this.data.notifications));
    },
    
    getNotifications() {
        return this.data.notifications;
    },
    
    unreadCount() {
        return this.data.notifications.filter(n => !n.read).length;
    },
    
    clearNotifications() {
        this.data.notifications = [];
        localStorage.removeItem('notifications');
    }
};
