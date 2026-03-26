// Store - State management with tokens and session handling
const store = {
    data: {
        user: null,
        accessToken: null,
        refreshToken: null,
        notifications: [],
        lastActivity: Date.now()
    },
    
    init() {
        this.data.user = JSON.parse(localStorage.getItem('user') || 'null');
        this.data.accessToken = localStorage.getItem('access_token');
        this.data.refreshToken = localStorage.getItem('refresh_token');
        this.data.notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        
        this.setupActivityTracking();
    },
    
    setupActivityTracking() {
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, () => this.updateActivity(), { passive: true });
        });
        
        setInterval(() => {
            if (this.isLoggedIn() && this.data.accessToken) {
                const inactiveTime = Date.now() - this.data.lastActivity;
                if (inactiveTime > 30 * 60 * 1000) {
                    console.log('Session active');
                }
            }
        }, 60000);
    },
    
    updateActivity() {
        this.data.lastActivity = Date.now();
    },
    
    setUser(user, accessToken = null, refreshToken = null) {
        this.data.user = user;
        this.data.accessToken = accessToken;
        this.data.refreshToken = refreshToken;
        
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            if (accessToken) {
                localStorage.setItem('access_token', accessToken);
            }
            if (refreshToken) {
                localStorage.setItem('refresh_token', refreshToken);
            }
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    },
    
    getAccessToken() {
        return this.data.accessToken;
    },
    
    getRefreshToken() {
        return this.data.refreshToken;
    },
    
    async login(name, password, isAdmin = false) {
        const role = isAdmin ? 'admin' : 'member';
        
        // Mock authentication - in real app this would call API
        const mockUsers = {
            'admin': { id: 0, name: 'Family Manager', role: 'admin', password: 'admin123' },
            'Taiwo Odelade': { id: 1, name: 'Taiwo Odelade', role: 'member', schedule: 'monthly', amount: 5000, password: 'taiwo123' },
            'Kehinde Odelade': { id: 2, name: 'Kehinde Odelade', role: 'member', schedule: 'monthly', amount: 3000, password: 'kehinde123' },
            'Adebayo Odelade': { id: 3, name: 'Adebayo Odelade', role: 'member', schedule: 'weekly', amount: 1000, password: 'adebayo123' },
            'Folake Odelade': { id: 4, name: 'Folake Odelade', role: 'member', schedule: 'monthly', amount: 5000, password: 'folake123' },
        };
        
        const user = mockUsers[name];
        
        if (!user) {
            return { success: false, error: t('auth.userNotFound') };
        }
        
        if (user.password !== password) {
            return { success: false, error: t('auth.wrongPassword') };
        }
        
        if (isAdmin && user.role !== 'admin') {
            return { success: false, error: t('auth.notAdmin') };
        }
        
        if (!isAdmin && user.role === 'admin') {
            return { success: false, error: t('auth.useAdminLogin') };
        }
        
        // Generate mock tokens
        const accessToken = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 900000 }));
        const refreshToken = btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 604800000 }));
        
        this.setUser(user, accessToken, refreshToken);
        
        return { success: true, user };
    },
    
    async register(name, password, schedule, amount, startDate) {
        // Mock registration - in real app this would call API
        const user = {
            id: Date.now(),
            name: name,
            role: 'member',
            schedule: schedule,
            amount: parseInt(amount),
            startDate: startDate,
            createdAt: new Date().toISOString()
        };
        
        const accessToken = btoa(JSON.stringify({ userId: user.id, role: 'member', exp: Date.now() + 900000 }));
        const refreshToken = btoa(JSON.stringify({ userId: user.id, role: 'member', exp: Date.now() + 604800000 }));
        
        this.setUser(user, accessToken, refreshToken);
        
        return { success: true, user };
    },
    
    logout() {
        this.setUser(null);
        router.navigate('/login');
    },
    
    isLoggedIn() {
        if (!this.data.user || !this.data.accessToken) return false;
        
        try {
            const tokenData = JSON.parse(atob(this.data.accessToken));
            if (tokenData.exp < Date.now()) {
                return this.refreshSession();
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    
    refreshSession() {
        if (!this.data.refreshToken) return false;
        
        try {
            const tokenData = JSON.parse(atob(this.data.refreshToken));
            if (tokenData.exp < Date.now()) {
                this.logout();
                return false;
            }
            
            const newAccessToken = btoa(JSON.stringify({ userId: tokenData.userId, role: tokenData.role, exp: Date.now() + 900000 }));
            this.data.accessToken = newAccessToken;
            localStorage.setItem('access_token', newAccessToken);
            return true;
        } catch (e) {
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
