// Router - Smart routing with query params and loading states
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
        '/member/transfer': 'memberTransfer',
        '/member/settings': 'memberSettings',
        '/admin/dashboard': 'adminDashboard',
        '/admin/transactions': 'adminTransactions',
        '/admin/transactions/new': 'adminTransactionsNew',
        '/admin/care-fund': 'adminCareFund',
        '/admin/members': 'adminMembers',
        '/notifications': 'notifications'
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
        
        if (!pageName) {
            app.innerHTML = this.notFound();
            return;
        }
        
        const pageFn = pages[pageName];
        if (!pageFn) {
            app.innerHTML = this.notFound();
            return;
        }
        
        // Check auth for protected routes (exclude login pages)
        const isProtected = (path.startsWith('/member') || path.startsWith('/admin')) && path !== '/admin/login';
        
        if (isProtected) {
            if (!store.isLoggedIn()) {
                this.navigate('/login');
                return;
            }
            if (path.startsWith('/admin') && !store.isAdmin()) {
                this.navigate('/member/dashboard');
                return;
            }
            // Start polling when logged in
            store.startPolling();
        } else {
            // Stop polling on auth pages
            store.stopPolling();
        }
        
        // Show loading state
        app.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-surface-soft">
                <div class="text-center">
                    <div class="loader mx-auto mb-4"></div>
                    <p class="text-sm text-text-muted">${t('common.loading')}</p>
                </div>
            </div>
        `;
        
        // Load page content (async)
        try {
            const content = await pageFn();
            
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
                            <main class="flex-1 overflow-y-auto overflow-x-hidden overscroll-behavior-y-contain p-4 pb-24 md:pb-8 sm:p-6 lg:p-8">
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
        
        // Try to init icons
        try {
            if (window.lucide && window.lucide.createIcons) {
                window.lucide.createIcons();
            }
        } catch(e) {
            console.log('Icon init error:', e);
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
