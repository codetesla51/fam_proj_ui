// Router - Smart routing with query params and loading states

// Configure NProgress
if (typeof NProgress !== 'undefined') {
    NProgress.configure({ 
        showSpinner: false,
        trickleSpeed: 200,
        minimum: 0.1
    });
}

const router = {
    routes: {
        '/': 'home',
        '/login': 'login',
        '/register': 'register',
        '/admin/login': 'adminLogin',
        '/member/dashboard': 'memberDashboard',
        '/member/savings': 'memberSavings',
        '/member/care-fund': 'memberCareFund',
        '/member/history': 'memberHistory',
        '/member/activity': 'memberActivity',
        '/member/transfer': 'memberTransfer',
        '/member/settings': 'memberSettings',
        '/admin/dashboard': 'adminDashboard',
        '/admin/transactions': 'adminTransactions',
        '/admin/transactions/new': 'adminTransactionsNew',
        '/admin/care-fund': 'adminCareFund',
        '/admin/members': 'adminMembers',
        '/notifications': 'notifications'
    },
    
    pageTitles: {
        '/': 'Home — Odelade Family Ledger',
        '/login': 'Sign In — Odelade Family Ledger',
        '/register': 'Create Account — Odelade Family Ledger',
        '/admin/login': 'Manager Login — Odelade Family Ledger',
        '/member/dashboard': 'Dashboard — Odelade Family Ledger',
        '/member/savings': 'My Savings — Odelade Family Ledger',
        '/member/care-fund': 'Personal Savings — Odelade Family Ledger',
        '/member/history': 'Transaction History — Odelade Family Ledger',
        '/member/activity': 'Family Activity — Odelade Family Ledger',
        '/member/transfer': 'Transfer — Odelade Family Ledger',
        '/member/settings': 'My Profile — Odelade Family Ledger',
        '/admin/dashboard': 'Admin — Odelade Family Ledger',
        '/admin/transactions': 'Family Transactions — Odelade Family Ledger',
        '/admin/transactions/new': 'Record Payment — Odelade Family Ledger',
        '/admin/care-fund': 'Withdraw Requests — Odelade Family Ledger',
        '/admin/members': 'Family Members — Odelade Family Ledger',
        '/notifications': 'Alerts — Odelade Family Ledger'
    },
    
    setPageTitle(path) {
        const title = this.pageTitles[path] || 'Odelade Family Ledger';
        document.title = title;
    },
    
    loading: false,
    
    parseUrl(path) {
        const [pathname, queryString] = path.split('?');
        const params = {};
        if (queryString) {
            queryString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[key] = decodeURIComponent(value || '');
            });
        }
        return { pathname, params };
    },
    
    getQuery() {
        const { params } = this.parseUrl(window.location.search.substring(1) ? '?' + window.location.search.substring(1) : window.location.pathname);
        return params;
    },
    
    buildPath(pathname, queryParams = {}) {
        const query = Object.keys(queryParams).length > 0 
            ? '?' + Object.entries(queryParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
            : '';
        return pathname + query;
    },
    
    notFound: () => `
        <div class="flex min-h-[60vh] flex-col items-center justify-center p-6">
            <div class="mb-4 rounded-full bg-surface-soft p-6">
                <span class="text-6xl text-text-muted">${Icons.helpCircle2()}</span>
            </div>
            <h1 class="text-2xl font-bold mb-2">${t('errors.pageNotFound')}</h1>
            <p class="text-text-muted mb-6 text-center max-w-sm">${t('errors.pageNotFoundDesc')}</p>
            <a href="/" class="flex h-12 items-center justify-center rounded-xl bg-brand px-6 font-medium text-white hover:bg-brand-hover active:bg-brand-hover">
                ${Icons.home()}
                <span class="ml-2">${t('nav.home')}</span>
            </a>
        </div>
    `,
    
    setLoading(isLoading) {
        this.loading = isLoading;
        const app = document.getElementById('app');
        if (isLoading) {
            app.classList.add('opacity-50', 'pointer-events-none');
        } else {
            app.classList.remove('opacity-50', 'pointer-events-none');
        }
    },
    
    navigate(path, replace = false) {
        window.scrollTo(0, 0);
        if (replace) {
            history.replaceState(null, '', path);
        } else {
            history.pushState(null, '', path);
        }
        // Start NProgress loading bar
        if (typeof NProgress !== 'undefined') {
            NProgress.start();
        }
        this.render();
    },
    
    navigateWithParams(pathname, queryParams = {}) {
        this.navigate(this.buildPath(pathname, queryParams));
    },
    
    refresh() {
        this.render();
    },
    
    goBack() {
        if (history.length > 1) {
            history.back();
        } else {
            this.navigate('/');
        }
    },
    
    async render() {
        const path = window.location.pathname;
        const pageName = this.routes[path];
        const app = document.getElementById('app');
        
        // Set page title
        this.setPageTitle(path);
        
        if (!pageName) {
            app.innerHTML = this.notFound();
            return;
        }
        
        // If already logged in, redirect to appropriate dashboard
        if (path === '/login' || path === '/register' || path === '/admin/login') {
            if (authState.isLoggedIn) {
                console.log('[router] redirecting to', authState.isAdmin ? '/admin/dashboard' : '/member/dashboard', 'because isLoggedIn=true isAdmin=' + authState.isAdmin);
                this.navigate(authState.isAdmin ? '/admin/dashboard' : '/member/dashboard', true);
                return;
            }
        }
        
        // Check auth for protected routes (exclude login pages)
        const isProtected = (path.startsWith('/member') || path.startsWith('/admin')) && path !== '/admin/login';
        
        if (isProtected) {
            const hasToken = authState.isLoggedIn;
            const isAdminRoute = path.startsWith('/admin');
            const isAdmin = authState.isAdmin;
            
            if (!hasToken) {
                console.log('[router] redirecting to', isAdminRoute ? '/admin/login' : '/login', 'because isLoggedIn=false');
                this.navigate(isAdminRoute ? '/admin/login' : '/login', true);
                return;
            }
            
            if (path.startsWith('/member') && isAdmin) {
                console.log('[router] redirecting to /admin/dashboard because isAdmin=true is trying to access member route');
                this.navigate('/admin/dashboard', true);
                return;
            }
            if (isAdminRoute && !isAdmin) {
                console.log('[router] redirecting to /member/dashboard because isAdmin=false is trying to access admin route');
                this.navigate('/member/dashboard', true);
                return;
            }
        }
        
        const pageFn = pages[pageName];
        if (!pageFn) {
            app.innerHTML = this.notFound();
            return;
        }
        
        // Check if this is a protected route
        const isProtectedRoute = (path.startsWith('/member') || path.startsWith('/admin')) && path !== '/admin/login';
        
        // Show loading for protected routes
        if (isProtectedRoute) {
            if (!store._polling) {
                store._polling = true;
                store.startPolling();
            }
            // Force fresh data after login or when stale
            const forceFresh = store._justLoggedIn;
            store._justLoggedIn = false;
            await Promise.allSettled([
                store.loadDashboard(forceFresh).catch(e => console.warn('dashboard failed', e)),
                store.loadNotifications(forceFresh).catch(e => console.warn('notifications failed', e)),
                store.loadTransactions({}, forceFresh).catch(e => console.warn('transactions failed', e)),
                store.loadCareFundRequests(null, forceFresh).catch(e => console.warn('carefund failed', e)),
                store.loadAllMembers(forceFresh).catch(e => console.warn('members failed', e))
            ]);
            store.updateNotifBadge();
        }
        
        // Show loading spinner for protected routes only
        if (isProtectedRoute) {
            app.innerHTML = `
                <div class="min-h-screen flex flex-col items-center justify-center bg-surface-soft">
                    <div class="mb-6">
                        <svg class="w-16 h-16 text-brand animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5"/>
                            <path d="M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <div class="loader mx-auto mb-4"></div>
                    <p class="text-sm text-text-muted">Loading...</p>
                </div>
            `;
        }
        
        // Load page content (async)
        try {
            const content = await pageFn();
            
            // Save for instant re-render
            this._lastContent = { path, content };
            
            // Render nav + content for protected pages (exclude login pages)
            if ((path.startsWith('/member') || path.startsWith('/admin')) && path !== '/admin/login') {
                const navComponents = Nav({ currentPath: path });
                app.innerHTML = `
                    <div class="min-h-screen bg-surface-soft flex flex-col">
                        <header class="sticky top-0 z-40">${navComponents.topNav}</header>
                        <div class="flex flex-1 overflow-hidden">
                            <aside class="hidden md:flex w-56 flex-shrink-0 border-r border-border bg-surface">
                                ${navComponents.sidebar}
                            </aside>
                            <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 md:pb-8 sm:p-6 lg:p-8 scroll-smooth" style="-webkit-overflow-scrolling: touch; overscroll-behavior: none;">
                                <div class="mx-auto max-w-4xl w-full min-w-0">
                                    ${content}
                                </div>
                            </main>
                        </div>
                        <nav class="fixed bottom-0 left-0 right-0 md:hidden z-40">${navComponents.bottomNav}</nav>
                        ${navComponents.mobileMenu}
                    </div>
                `;
            } else {
                app.innerHTML = content;
            }
        } catch (err) {
            console.error('Page render error:', err);
            // Show cached content if available, otherwise error
            if (this._lastContent && this._lastContent.path === path) {
                // Use last content
                if (path.startsWith('/member') || path.startsWith('/admin')) {
                    const navComponents = Nav({ currentPath: path });
                    app.innerHTML = `
                        <div class="min-h-screen bg-surface-soft flex flex-col">
                            <header class="sticky top-0 z-40 safe-area-top">${navComponents.topNav}</header>
                            <div class="flex flex-1 overflow-hidden">
                                <aside class="hidden md:flex w-56 flex-shrink-0 border-r border-border bg-surface">
                                    ${navComponents.sidebar}
                                </aside>
                                <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 md:pb-8 sm:p-6 lg:p-8 scroll-smooth" style="-webkit-overflow-scrolling: touch; overscroll-behavior: none;">
                                    <div class="mx-auto max-w-4xl w-full min-w-0">
                                        ${this._lastContent.content}
                                    </div>
                                </main>
                            </div>
                            <nav class="fixed bottom-0 left-0 right-0 md:hidden z-40 safe-area-bottom">${navComponents.bottomNav}</nav>
                            ${navComponents.mobileMenu}
                        </div>
                    `;
                } else {
                    app.innerHTML = this._lastContent.content;
                }
            } else {
                app.innerHTML = `
                    <div class="min-h-screen flex items-center justify-center bg-surface-soft p-6">
                        <div class="text-center max-w-sm">
                            <div class="mb-4 text-error">${Icons.alertCircle()}</div>
                            <h2 class="text-lg font-bold text-text-primary mb-2">${t('common.error')}</h2>
                            <p class="text-sm text-text-muted mb-4">${err.message || 'Failed to load page'}</p>
                            <button onclick="router.refresh()" class="h-11 px-6 rounded-xl bg-brand text-white font-medium select-none">${t('common.back')}</button>
                        </div>
                    </div>
                `;
            }
        }
        
        // Try to init icons
        try {
            if (window.lucide && window.lucide.createIcons) {
                window.lucide.createIcons();
            }
        } catch(e) {
            console.log('Icon init error:', e);
        }
        
        // Stop NProgress loading bar
        if (typeof NProgress !== 'undefined') {
            NProgress.done();
        }
        
        // Use Idiomorph for smooth DOM updates
        if (typeof Idiomorph !== 'undefined') {
            Idiomorph.morph(app, app.innerHTML, { morphStyle: 'innerHTML' });
        }
        
        // Initialize date pickers
        try {
            initDatePickers();
        } catch(e) {
            console.log('Date picker init error:', e);
        }
    },
    
    init() {
        // Handle back/forward navigation
        window.addEventListener('popstate', () => this.render());
        
        // Handle route links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('//')) {
                    this.navigate(href);
                }
            }
        });
        
        // Initial render (called directly since we're already in DOMContentLoaded)
        this.render();
    }
};
