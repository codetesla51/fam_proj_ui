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
    
    render() {
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
        
        // Check auth for protected routes
        if (path.startsWith('/member') || path.startsWith('/admin')) {
            if (!store.isLoggedIn()) {
                this.navigate('/login');
                return;
            }
            if (path.startsWith('/admin') && !store.isAdmin()) {
                this.navigate('/member/dashboard');
                return;
            }
        }
        
        // Render nav + content for protected pages
        if (path.startsWith('/member') || path.startsWith('/admin')) {
            const navComponents = Nav({ currentPath: path });
            app.innerHTML = `
                <div class="min-h-screen bg-surface-soft">
                    ${navComponents.topNav}
                    <div class="flex">
                        ${navComponents.sidebar}
                        <main class="flex-1 p-4 pb-24 sm:p-6 sm:pb-6 lg:pb-6 lg:p-8">
                            <div class="mx-auto max-w-6xl">
                                ${pageFn()}
                            </div>
                        </main>
                    </div>
                    ${navComponents.mobileMenu}
                    ${navComponents.bottomNav}
                </div>
            `;
        } else {
            app.innerHTML = pageFn();
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
