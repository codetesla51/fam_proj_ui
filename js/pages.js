// Pages with Lucide Icons

const pages = {
    // Auth Pages
    login: () => `
        <div class="flex min-h-screen">
            <!-- Left Panel - Premium Brand -->
            <div class="hidden lg:flex lg:w-[55%] bg-brand relative flex-col items-center justify-center p-12 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-brand via-brand-hover to-brand-900"></div>
                <div class="absolute inset-0 opacity-[0.07]">
                    <svg class="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <defs>
                            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="2" fill="white"/>
                            </pattern>
                        </defs>
                        <rect width="400" height="400" fill="url(#dots)"/>
                    </svg>
                </div>
                <div class="relative z-10 text-center max-w-lg">
                    <h1 class="text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">${t('app.name')}</h1>
                    <p class="text-xl text-white/70 leading-relaxed">Your family savings, all in one place. Simple, secure, together.</p>
                    <div class="mt-14 grid grid-cols-3 gap-8">
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                ${Icons.piggyBank()}
                            </div>
                            <span class="text-sm font-medium text-white/80">Track Savings</span>
                        </div>
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                ${Icons.heartHandshake()}
                            </div>
                            <span class="text-sm font-medium text-white/80">Care Fund</span>
                        </div>
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                ${Icons.shield()}
                            </div>
                            <span class="text-sm font-medium text-white/80">Family First</span>
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-10 text-white/30 text-xs tracking-wider uppercase">Trusted by the Odelade family</div>
            </div>
            
            <!-- Right Panel - Form -->
            <div class="flex w-full lg:w-[45%] flex-col">
                <!-- Language Switcher - Top Right -->
                <div class="flex justify-end p-6">
                    <button onclick="openLangModal()" class="flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-soft active:scale-95 transition-all select-none">
                        ${Icons.globe()}
                        <span>${getCurrentLangName()}</span>
                        ${Icons.chevronDown()}
                    </button>
                </div>
                
                <!-- Form Area -->
                <div class="flex flex-1 items-center justify-center px-6 pb-20">
                    <div class="w-full max-w-md">
                        <!-- Mobile Brand -->
                        <div class="lg:hidden mb-10 text-center">
                            <h1 class="text-3xl font-extrabold text-brand tracking-tight">${t('app.name')}</h1>
                            <p class="mt-2 text-sm text-text-muted">Your family savings, all in one place</p>
                        </div>
                        
                        <!-- Welcome Text -->
                        <div class="mb-8">
                            <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">Welcome back</h2>
                            <p class="mt-2 text-sm text-text-muted">Sign in to see your family savings</p>
                        </div>
                        
                        <div id="login-error" class="mb-5 hidden rounded-xl border border-error/20 bg-error/5 p-4 text-sm text-error flex items-center gap-2">
                            ${Icons.alertCircle()}
                            <span></span>
                        </div>
                        
                        <form onsubmit="handleLogin(event)" class="space-y-5">
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.yourName')}</label>
                                <input type="text" id="login-name" placeholder="${t('auth.yourNamePlaceholder')}"
                                    class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface px-4 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.password')}</label>
                                <div class="relative">
                                    <input type="password" id="login-password" 
                                        class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface px-4 pr-14 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                    <button type="button" onclick="togglePassword('login-password')" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-text-secondary active:scale-90 transition-all select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <button type="submit" id="login-btn"
                                class="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/35 active:scale-[0.98] select-none">
                                ${Icons.logIn()}
                                ${t('auth.signIn')}
                            </button>
                        </form>
                        
                        <!-- Divider -->
                        <div class="my-8 flex items-center gap-4">
                            <div class="flex-1 h-px bg-border"></div>
                            <span class="text-xs text-text-muted uppercase tracking-wider">New here?</span>
                            <div class="flex-1 h-px bg-border"></div>
                        </div>
                        
                        <!-- Join CTA -->
                        <a href="/register" class="flex h-14 w-full items-center justify-center gap-3 rounded-xl border-2 border-brand/30 bg-brand-light/30 text-base font-bold text-brand transition-all hover:bg-brand-light hover:border-brand active:scale-[0.98] select-none">
                            ${Icons.userPlus()}
                            Join the Odelade Family
                        </a>
                    </div>
                </div>
                
                <!-- Manager Link - Mobile -->
                <div class="pb-8 text-center lg:hidden">
                </div>
            </div>
        </div>
    `,
    
    register: () => `
        <div class="flex min-h-screen">
            <!-- Left Panel - Premium Brand -->
            <div class="hidden lg:flex lg:w-[55%] bg-brand relative flex-col items-center justify-center p-12 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-brand via-brand-hover to-brand-900"></div>
                <div class="absolute inset-0 opacity-[0.07]">
                    <svg class="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <defs>
                            <pattern id="dots2" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="2" fill="white"/>
                            </pattern>
                        </defs>
                        <rect width="400" height="400" fill="url(#dots2)"/>
                    </svg>
                </div>
                <div class="relative z-10 text-center max-w-lg">
                    <h1 class="text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">Join the Family</h1>
                    <p class="text-xl text-white/70 leading-relaxed">Start saving together. Build wealth as a family. Be there for each other.</p>
                    <div class="mt-14 grid grid-cols-3 gap-8">
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                ${Icons.wallet()}
                            </div>
                            <span class="text-2xl font-bold text-white">₦500K+</span>
                            <span class="text-xs text-white/60">Saved Together</span>
                        </div>
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                ${Icons.users()}
                            </div>
                            <span class="text-2xl font-bold text-white">6</span>
                            <span class="text-xs text-white/60">Family Members</span>
                        </div>
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                ${Icons.heartHandshake()}
                            </div>
                            <span class="text-2xl font-bold text-white">2</span>
                            <span class="text-xs text-white/60">Savings Funds</span>
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-10 text-white/30 text-xs tracking-wider uppercase">Trusted by the Odelade family</div>
            </div>
            
            <!-- Right Panel - Form -->
            <div class="flex w-full lg:w-[45%] flex-col">
                <!-- Language Switcher - Top Right -->
                <div class="flex justify-end p-6">
                    <button onclick="openLangModal()" class="flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-soft active:scale-95 transition-all select-none">
                        ${Icons.globe()}
                    </button>
                </div>
                
                <!-- Form Area -->
                <div class="flex flex-1 items-start justify-center overflow-y-auto px-6 pb-20">
                    <div class="w-full max-w-md py-4">
                        <!-- Mobile Brand -->
                        <div class="lg:hidden mb-8 text-center">
                            <h1 class="text-3xl font-extrabold text-brand tracking-tight">${t('app.name')}</h1>
                            <p class="mt-2 text-sm text-text-muted">Join and start saving with your family</p>
                        </div>
                        
                        <!-- Welcome Text -->
                        <div class="mb-8">
                            <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">Create your account</h2>
                            <p class="mt-2 text-sm text-text-muted">Tell us a bit about yourself so we can get you started</p>
                        </div>
                        
                        <form onsubmit="handleRegister(event)" class="space-y-5">
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.fullName')} <span class="text-error">*</span></label>
                                <input type="text" id="reg-name" placeholder="e.g. Taiwo Odelade"
                                    class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface px-4 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                <p class="text-xs text-text-muted pl-1">${t('auth.fullNameHelper')}</p>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.createPassword')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <input type="password" id="reg-password"
                                        class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface px-4 pr-14 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                    <button type="button" onclick="togglePassword('reg-password')" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-text-secondary active:scale-90 transition-all select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.confirmPassword')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <input type="password" id="reg-confirm"
                                        class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface px-4 pr-14 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                    <button type="button" onclick="togglePassword('reg-confirm')" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-text-secondary active:scale-90 transition-all select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('register.howOften')} <span class="text-error">*</span></label>
                                <div class="flex rounded-xl border-2 border-border p-1.5 gap-2">
                                    <button type="button" onclick="setSchedule('weekly')" id="btn-weekly"
                                        class="flex-1 rounded-lg py-3.5 text-sm font-semibold transition-all text-text-secondary hover:bg-surface-soft select-none">
                                        ${Icons.calendar()} ${t('register.everyWeek')}
                                    </button>
                                    <button type="button" onclick="setSchedule('monthly')" id="btn-monthly"
                                        class="flex-1 rounded-lg py-3.5 text-sm font-semibold bg-brand text-white shadow-md select-none">
                                        ${Icons.calendar()} ${t('register.everyMonth')}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('register.howMuch')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <span class="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                    <input type="number" id="reg-amount" placeholder="50,000"
                                        class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface py-3 pl-12 pr-4 text-lg font-semibold transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                </div>
                                <p class="text-xs text-text-muted pl-1">${t('register.howMuchHelper')}</p>
                            </div>
                            
                            <button type="submit" id="reg-btn"
                                class="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-brand text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/35 active:scale-[0.98] select-none">
                                ${Icons.userPlus()}
                                ${t('auth.createAccount')}
                            </button>
                        </form>
                        
                        <!-- Divider -->
                        <div class="my-8 flex items-center gap-4">
                            <div class="flex-1 h-px bg-border"></div>
                            <span class="text-xs text-text-muted uppercase tracking-wider">Already joined?</span>
                            <div class="flex-1 h-px bg-border"></div>
                        </div>
                        
                        <!-- Login Link -->
                        <a href="/login" class="flex h-14 w-full items-center justify-center gap-3 rounded-xl border-2 border-brand/30 bg-brand-light/30 text-base font-bold text-brand transition-all hover:bg-brand-light hover:border-brand active:scale-[0.98] select-none">
                            ${Icons.logIn()}
                            Sign in to your account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    adminLogin: () => `
        <div class="flex min-h-screen">
            <!-- Left Panel - Brand (hidden on mobile) -->
            <div class="hidden lg:flex lg:w-1/2 bg-brand relative flex-col items-center justify-center p-12 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-brand via-brand-hover to-brand-800"></div>
                <div class="absolute inset-0 opacity-10">
                    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid3" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid3)"/>
                    </svg>
                </div>
                <div class="relative z-10 text-center">
                    <div class="mb-8 flex justify-center">
                        <div class="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm text-white">
                            ${Icons.shield()}
                        </div>
                    </div>
                    <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4">${t('common.familyManager')}</h1>
                    <p class="text-xl text-white/80 max-w-md">Manage your family savings and care fund</p>
                    <div class="mt-12 flex items-center justify-center gap-8 text-white/60 text-sm">
                        <div class="flex flex-col items-center gap-2">
                            ${Icons.users()}
                            <span>Manage Members</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            ${Icons.piggyBank()}
                            <span>Track Savings</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            ${Icons.heartHandshake()}
                            <span>Care Fund</span>
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-8 text-white/40 text-sm">© 2026 Odelade Family</div>
            </div>
            
            <!-- Right Panel - Form -->
            <div class="flex w-full lg:w-1/2 items-center justify-center p-6 pb-24">
                <div class="w-full max-w-md">
                    <!-- Mobile Logo -->
                    <div class="lg:hidden mb-8 flex justify-center">
                        <div class="text-brand flex items-center gap-2">
                            ${Icons.shield()}
                            <span class="text-xl font-bold">${t('common.familyManager')}</span>
                        </div>
                    </div>
                    
                    <div class="mb-6 flex justify-center">
                        <div class="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm text-brand font-bold">
                            ${Icons.shield()}
                            ${t('common.familyManagerAccess')}
                        </div>
                    </div>
                    
                    <div class="mb-6 flex justify-end">
                        <button onclick="openLangModal()" class="flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary active:bg-surface-soft select-none">
                            ${Icons.globe()}
                        </button>
                    </div>
                    
                    <div class="w-full min-w-0 rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-8">
                        <h2 class="mb-6 text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                            ${Icons.logIn()}
                            ${t('auth.signInAsManager')}
                        </h2>
                        
                        <div id="admin-error" class="mb-4 hidden rounded-xl border border-error/20 bg-error/10 p-4 text-sm text-error flex items-center gap-2">
                            ${Icons.alertCircle()}
                            <span></span>
                        </div>
                        
                        <form onsubmit="handleAdminLogin(event)" class="space-y-5">
                            <div class="space-y-2">
                                <label class="block text-sm font-bold text-text-primary flex items-center gap-1.5">
                                    ${Icons.lock()}
                                    ${t('auth.managerPassword')}
                                </label>
                                <div class="relative">
                                    <input type="password" id="admin-password"
                                        class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface px-4 pr-12 text-base sm:text-sm transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                    <button type="button" onclick="togglePassword('admin-password')" class="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-text-secondary active:scale-95 transition-all select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <button type="submit"
                                class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-white transition-all hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98] select-none">
                                ${Icons.shield()}
                                ${t('auth.signInAsManager')}
                            </button>
                        </form>
                        
                        <p class="mt-6 text-center">
                            <a href="/login" class="flex items-center justify-center gap-2 font-semibold text-brand hover:underline select-none">
                                ${Icons.arrowLeft()}
                                ${t('auth.backToFamily')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    // Member Pages
    memberDashboard: async () => {
        const dashboard = await store.loadDashboard();
        const d = dashboard || {};
        const txData = await store.loadTransactions();
        const recent = (txData || []).slice(0, 5);
        const name = store.user?.name?.split(' ')[0] || 'Friend';
        return `
            <div class="w-full min-w-0">
                <!-- Greeting -->
                <div class="mb-5">
                    <p class="text-xs font-medium text-text-muted">${getGreeting()}</p>
                    <h1 class="text-xl sm:text-2xl font-bold text-text-primary">${name}</h1>
                </div>
                
                <!-- KPI Grid -->
                <div class="w-full min-w-0 mb-5 grid grid-cols-2 gap-3">
                    ${KpiCard({ label: 'My Savings', amount: d.my_contributions || 0, subtext: t('common.upToDate'), highlight: true })}
                    ${KpiCard({ label: 'Care Fund', amount: d.my_pool2_contributions || 0, subtext: (d.member_count || 0) + ' members' })}
                </div>
                
                <!-- Recent Activity -->
                <div class="w-full min-w-0 mb-5">
                    <div class="mb-3 flex items-center justify-between">
                        <p class="text-xs font-bold uppercase tracking-wider text-text-muted">Recent Activity</p>
                        <a href="/member/history" class="text-xs font-semibold text-brand select-none">View all</a>
                    </div>
                    ${recent.length > 0 ? `
                        <div class="w-full min-w-0 space-y-2">
                            ${recent.map(p => `
                                <div class="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${p.type === 'credit' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                        ${p.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-semibold text-text-primary truncate">${p.reason}</p>
                                        <p class="text-xs text-text-muted">${PoolTag({ pool: p.pool })} · ${formatDate(p.created_at)}</p>
                                    </div>
                                    <p class="text-sm font-bold whitespace-nowrap ${p.type === 'credit' ? 'text-success' : 'text-error'}">
                                        ${p.type === 'credit' ? '+' : '-'}${formatCurrency(p.amount)}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="rounded-xl border border-border bg-surface p-6 text-center">
                            <p class="text-sm text-text-muted">${t('member.noPayments')}</p>
                        </div>
                    `}
                </div>
                
                <!-- Quick Actions -->
                <div class="w-full min-w-0 grid grid-cols-2 gap-3">
                    <a href="/member/transfer" class="flex items-center justify-center gap-2 rounded-xl bg-brand p-3.5 font-semibold text-white text-sm select-none">
                        ${Icons.arrowRightLeft()} Transfer
                    </a>
                    <a href="/member/care-fund" class="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface p-3.5 font-semibold text-sm select-none">
                        ${Icons.heartHandshake()} Request Help
                    </a>
                </div>
            </div>
        `;
    },
    
    memberSavings: async () => {
        const txData = await store.loadTransactions({ pool: 'pool1' });
        const transactions = txData || store.transactions;
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.wallet()}
                    ${t('nav.mySavings')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">Your Family Savings history</p>
            </div>
            
            <div class="w-full min-w-0">
            ${Card({
                children: transactions.length ? `
                    <div class="rounded-xl overflow-hidden border border-border">
                        <div class="overflow-x-auto w-full">
                            <table class="w-full min-w-[520px]">
                                <thead>
                                    <tr class="bg-table-header text-left border-b border-border">
                                        <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.date')}</th>
                                        <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.type')}</th>
                                        <th class="whitespace-nowrap px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.amount')}</th>
                                        <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.reason')}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-border">
                                    ${transactions.map((tx, i) => `
                                        <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors cursor-pointer">
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${formatDate(tx.created_at)}</td>
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm font-medium ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                                <span class="inline-flex items-center gap-1.5">
                                                    ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()} 
                                                    ${tx.type === 'credit' ? t('table.moneyIn') : t('table.moneyOut')}
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-3.5 text-right text-sm font-bold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                                ${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${tx.reason}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ` : EmptyState({ icon: Icons.wallet(), message: t('member.noPayments') })
            })}
            </div>
        `;
    },
    
    memberTransfer: async () => {
        const dashboard = await store.loadDashboard();
        const d = dashboard || {};
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.arrowRightLeft()}
                    Transfer Funds
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">Move money from Care Fund to Family Savings</p>
            </div>
            
            <!-- Balances -->
            <div class="w-full min-w-0 mb-6 grid grid-cols-2 gap-3">
                <div class="rounded-2xl border border-border bg-surface p-4">
                    <p class="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">${t('member.careFund')}</p>
                    <p class="text-2xl font-bold text-brand">${formatCurrency(d.my_pool2_contributions || 0)}</p>
                    <p class="text-xs text-text-muted mt-1">Available to transfer</p>
                </div>
                <div class="rounded-2xl border border-border bg-surface p-4">
                    <p class="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">${t('member.familySavings')}</p>
                    <p class="text-2xl font-bold text-text-primary">${formatCurrency(d.my_contributions || 0)}</p>
                    <p class="text-xs text-text-muted mt-1">Current balance</p>
                </div>
            </div>
            
            <!-- Transfer Form -->
            <div class="w-full min-w-0">
                ${Card({
                    title: 'Transfer from Care Fund to Savings',
                    children: `
                        <form onsubmit="handleTransferSubmit(event)" class="space-y-5">
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">How much to transfer? <span class="text-error">*</span></label>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                    <input type="number" id="transfer-amount" placeholder="0" max="${d.my_pool2_contributions || 0}"
                                        class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface py-3 pl-12 pr-4 text-lg font-semibold transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                </div>
                                <p class="text-xs text-text-muted">Maximum: ${formatCurrency(d.my_pool2_contributions || 0)}</p>
                            </div>
                            
                            <button type="submit" id="transfer-btn" class="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-bold text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 transition-all select-none">
                                ${Icons.arrowRightLeft()} Transfer Now
                            </button>
                        </form>
                        
                        <div class="mt-6 rounded-xl bg-surface-soft p-4">
                            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">How it works</p>
                            <ul class="space-y-2 text-sm text-text-secondary">
                                <li class="flex items-start gap-2">${Icons.checkCircle()} Money moves from your Care Fund to your Family Savings</li>
                                <li class="flex items-start gap-2">${Icons.checkCircle()} This is one-way only - you cannot transfer back</li>
                                <li class="flex items-start gap-2">${Icons.checkCircle()} Transfer is instant and cannot be undone</li>
                            </ul>
                        </div>
                    `
                })}
            </div>
        `;
    },
    
    memberHistory: async () => {
        const txData = await store.loadTransactions();
        const transactions = txData || store.transactions;
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.history()}
                    ${t('nav.myHistory')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">All your transactions across both funds</p>
            </div>
            
            <div class="w-full min-w-0">
                ${Card({
                    children: transactions.length > 0 ? `
                        <div class="rounded-xl overflow-hidden border border-border">
                            <div class="overflow-x-auto w-full">
                                <table class="w-full min-w-[560px]">
                                    <thead>
                                        <tr class="bg-table-header text-left border-b border-border">
                                            <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.date')}</th>
                                            <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.type')}</th>
                                            <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.fund')}</th>
                                            <th class="whitespace-nowrap px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.amount')}</th>
                                            <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.reason')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-border">
                                        ${transactions.map((tx, i) => `
                                            <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors cursor-pointer">
                                                <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${formatDate(tx.created_at)}</td>
                                                <td class="whitespace-nowrap px-4 py-3.5 text-sm font-medium ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                                    <span class="inline-flex items-center gap-1.5">
                                                        ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()} 
                                                        ${tx.type === 'credit' ? t('table.moneyIn') : t('table.moneyOut')}
                                                    </span>
                                                </td>
                                                <td class="whitespace-nowrap px-4 py-3.5">${PoolTag({ pool: tx.pool })}</td>
                                                <td class="whitespace-nowrap px-4 py-3.5 text-right text-sm font-bold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                                    ${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}
                                                </td>
                                                <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${tx.reason}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : EmptyState({ icon: Icons.history(), message: t('member.noPayments') })
                })}
            </div>
        `;
    },
    
    memberCareFund: async () => {
        const dashboard = await store.loadDashboard();
        const d = dashboard || {};
        const requests = await store.loadCareFundRequests();
        const occasionIcons = {
            birthday: Icons.cake,
            wedding: Icons.ring,
            newBaby: Icons.baby,
            graduation: Icons.graduationCap,
            medical: Icons.stethoscope,
            other: Icons.helpCircle
        };
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.heartHandshake()}
                    ${t('nav.careFund')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">Request help from your family</p>
            </div>
            
            <div class="w-full min-w-0 mb-6 rounded-2xl border-2 border-brand/20 bg-gradient-to-br from-brand-light to-white p-5 sm:p-6 shadow-lg shadow-brand/10">
                <div class="mb-1 text-sm font-bold text-brand flex items-center gap-1.5">${Icons.heartHandshake()} ${t('careFund.balance')}</div>
                <div class="text-3xl sm:text-4xl font-bold text-brand">${formatCurrency(d.my_pool2_contributions || 0)}</div>
            </div>
            
            <div class="w-full min-w-0">
            ${Card({
                title: t('careFund.requestHelp'),
                children: `
                    <form onsubmit="handleCareFundRequest(event)" class="space-y-5">
                        <div class="space-y-3">
                            <label class="block text-sm font-bold text-text-primary">${t('careFund.whatFor')}</label>
                            <div class="grid grid-cols-3 gap-3">
                                ${['birthday', 'wedding', 'newBaby', 'graduation', 'medical', 'other'].map(o => `
                                    <button type="button" class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border p-4 aspect-square text-xs font-semibold transition-all hover:border-brand hover:bg-brand-light/30 active:scale-95 select-none">
                                        <span class="text-3xl text-brand">${occasionIcons[o]()}</span>
                                        <span class="text-center text-text-secondary">${t('occasions.' + o)}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-bold text-text-primary">${t('careFund.howMuchNeed')}</label>
                            <div class="relative">
                                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                <input type="number" placeholder="0" class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface py-3 pl-12 pr-4 text-lg font-semibold transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-bold text-text-primary">${t('careFund.whenOccasion')}</label>
                            ${DatePicker({ id: 'care-date', placeholder: 'Select a date' })}
                        </div>
                        <button type="submit" class="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-bold text-white shadow-lg shadow-brand/25 transition-all select-none">
                            ${Icons.heartHandshake()} ${t('careFund.sendRequest')}
                        </button>
                    </form>
                `
            })}
            </div>
            <div class="w-full min-w-0 mt-6">
                ${Card({
                    title: t('careFund.pastRequests'),
                    children: requests.length > 0 ? `
                        <div class="w-full min-w-0 space-y-3">
                            ${requests.map(r => `
                                <div class="flex items-center gap-4 rounded-2xl border border-border p-4">
                                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand flex-shrink-0">
                                        ${occasionIcons[r.occasion] ? occasionIcons[r.occasion]() : Icons.helpCircle()}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="font-bold text-text-primary">${t('occasions.' + r.occasion) || r.occasion}</p>
                                        <p class="text-xs text-text-muted">${formatDate(r.event_date)}</p>
                                    </div>
                                    <div class="text-right flex-shrink-0">
                                        <p class="font-bold text-text-primary">${formatCurrency(r.amount)}</p>
                                        ${StatusBadge({ status: r.status })}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : EmptyState({ icon: Icons.heartHandshake(), message: t('careFund.noRequests') })
                })}
            </div>
        `;
    },
    
    adminDashboard: async () => {
        const dashboard = await store.loadDashboard();
        const d = dashboard || {};
        return `
            <div class="w-full min-w-0">
                <div class="mb-6">
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                        ${Icons.layoutDashboard()}
                        ${t('admin.familyOverview')}
                    </h1>
                    <p class="text-xs sm:text-sm text-text-muted">Family savings at a glance</p>
                </div>
                
                <div class="w-full min-w-0 mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    ${KpiCard({ label: 'Family Savings', amount: d.pool1_balance || 0, subtext: 'Total Pool 1', highlight: true })}
                    ${KpiCard({ label: 'Care Fund', amount: d.pool2_balance || 0, subtext: 'Total Pool 2' })}
                    ${KpiCard({ label: 'Members', amount: d.member_count || 0, subtext: (d.active_count || 0) + ' active', isCurrency: false })}
                    ${KpiCard({ label: 'Overdue', amount: d.overdue_count || 0, subtext: 'Behind on savings', isCurrency: false })}
                </div>
                
                ${d.underfunded_members && d.underfunded_members.length > 0 ? `
                    <div class="w-full min-w-0 mb-6 rounded-2xl border border-error/20 bg-error/5 p-4">
                        <div class="mb-3 flex items-center gap-2">${Icons.alertTriangle()}<p class="text-sm font-semibold text-error">Members Behind on Savings</p></div>
                        <div class="w-full min-w-0 space-y-2">
                            ${d.underfunded_members.map(m => `
                                <div class="flex items-center justify-between rounded-xl bg-surface p-3">
                                    <div class="flex items-center gap-3">
                                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-error/10 text-sm font-bold text-error">${m.name?.charAt(0) || '?'}</div>
                                        <span class="text-sm font-medium">${m.name}</span>
                                    </div>
                                    <span class="text-sm font-semibold text-error">${formatCurrency(m.committed_amount - m.current_sum)} behind</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : `<div class="w-full min-w-0 mb-6 rounded-2xl border border-success/20 bg-success/5 p-4 flex items-center gap-3">${Icons.checkCircle()}<p class="text-sm font-medium text-success">${t('admin.allUpToDate')}</p></div>`}
                
                <div class="w-full min-w-0">
                    <p class="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">${t('admin.quickActions')}</p>
                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <a href="/admin/transactions/new" class="flex items-center justify-center gap-2.5 rounded-2xl bg-brand p-4 font-semibold text-white shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 transition-all select-none">${Icons.plusCircle()}<span>${t('admin.recordPayment')}</span></a>
                        <a href="/admin/members" class="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-border bg-surface p-4 font-semibold hover:border-brand hover:text-brand hover:bg-brand-light/30 transition-all select-none">${Icons.userPlus()}<span>${t('admin.addMember')}</span></a>
                        <a href="/admin/care-fund" class="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-border bg-surface p-4 font-semibold hover:border-brand hover:text-brand hover:bg-brand-light/30 transition-all select-none">${Icons.heartHandshake()}<span>${t('admin.reviewRequests')}</span></a>
                    </div>
                </div>
            </div>
        `;
    },
    
    adminTransactions: async () => {
        const txData = await store.loadTransactions();
        const transactions = txData || store.transactions;
        return `
            <div class="w-full min-w-0 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">${Icons.clipboardList()}${t('transaction.familyMoneyHistory')}</h1>
                    <p class="text-xs sm:text-sm text-text-muted">All family transactions</p>
                </div>
                <a href="/admin/transactions/new" class="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all select-none">${Icons.plus()} Record Payment</a>
            </div>
            <div class="w-full min-w-0">
                ${Card({ children: transactions.length > 0 ? `
                    <div class="rounded-xl overflow-hidden border border-border">
                        <div class="overflow-x-auto w-full">
                            <table class="w-full min-w-[640px]">
                                <thead><tr class="bg-table-header text-left border-b border-border">
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.member')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.fund')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.type')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.amount')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.reason')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.date')}</th>
                                </tr></thead>
                                <tbody class="divide-y divide-border">
                                    ${transactions.map((tx, i) => `
                                        <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors cursor-pointer">
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm font-medium">${tx.member_name || tx.memberName || ''}</td>
                                            <td class="whitespace-nowrap px-4 py-3.5">${PoolTag({ pool: tx.pool })}</td>
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm font-medium ${tx.type === 'credit' ? 'text-success' : 'text-error'}">${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}</td>
                                            <td class="whitespace-nowrap px-4 py-3.5 text-right text-sm font-bold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}</td>
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${tx.reason}</td>
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${formatDate(tx.created_at)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ` : EmptyState({ icon: Icons.clipboardList(), message: t('common.noData') }) })}
            </div>
        `;
    },
    
    adminTransactionsNew: async () => {
        const dashboard = await store.loadDashboard();
        const members = dashboard?.underfunded_members || [];
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">${Icons.plusCircle()} Record a Payment</h1>
                <p class="text-xs sm:text-sm text-text-muted">Log a new transaction for a family member</p>
            </div>
            <div class="w-full min-w-0">
                ${Card({ children: `
                    <form onsubmit="handleRecordPayment(event)" class="space-y-5">
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.whichMember')} <span class="text-error">*</span></label>
                            <select id="txn-member" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface px-4 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                <option value="">Select a member</option>
                                ${members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                                <option value="other">Other member...</option>
                            </select>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.whichFund')} <span class="text-error">*</span></label>
                            <div class="flex rounded-xl border border-border p-1 gap-2">
                                <button type="button" onclick="setFund('pool1')" id="fund-pool1" class="flex-1 rounded-lg py-3 text-sm font-medium bg-brand text-white select-none">${t('member.familySavings')}</button>
                                <button type="button" onclick="setFund('pool2')" id="fund-pool2" class="flex-1 rounded-lg py-3 text-sm font-medium text-text-secondary select-none">${t('member.careFund')}</button>
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.whatType')} <span class="text-error">*</span></label>
                            <div class="flex rounded-xl border border-border p-1 gap-2">
                                <button type="button" onclick="setTxType('credit')" id="type-credit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium bg-success text-white select-none">${Icons.arrowUpRight()} ${t('table.moneyIn')}</button>
                                <button type="button" onclick="setTxType('debit')" id="type-debit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-text-secondary select-none">${Icons.arrowDownRight()} ${t('table.moneyOut')}</button>
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.howMuch')} <span class="text-error">*</span></label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                <input type="number" id="txn-amount" placeholder="0" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface py-3 pl-8 pr-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.whatFor')} <span class="text-error">*</span></label>
                            <input type="text" id="txn-reason" placeholder="${t('transaction.whatForHelper')}" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface px-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            <p class="text-xs text-text-muted">${t('transaction.whatForHelper')}</p>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.attachProof')}</label>
                            <div class="flex items-center gap-3">
                                <label class="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface-soft px-4 text-sm font-medium text-text-secondary hover:border-brand hover:text-brand transition-all select-none">
                                    ${Icons.paperclip()}
                                    <span id="receipt-label">Choose file</span>
                                    <input type="file" id="txn-receipt" accept="image/*,.pdf" class="hidden" onchange="document.getElementById('receipt-label').textContent = this.files[0]?.name || 'Choose file'">
                                </label>
                                <span class="text-xs text-text-muted">Photo or PDF</span>
                            </div>
                        </div>
                        
                        <button type="submit" id="txn-btn" class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/35 active:scale-[0.98] transition-all select-none">
                            ${Icons.check()} ${t('transaction.recordBtn')}
                        </button>
                    </form>
                ` })}
            </div>
        `;
    },
    
    memberSettings: async () => {
        const name = store.user?.name || 'Member';
        return `
            <div class="w-full min-w-0">
                <div class="mb-6">
                    <h1 class="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2">
                        ${Icons.settings()}
                        ${t('nav.settings')}
                    </h1>
                </div>
                
                <!-- Profile -->
                <div class="w-full min-w-0 mb-4 rounded-xl border border-border bg-surface p-4">
                    <div class="flex items-center gap-3">
                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white font-bold">
                            ${name.charAt(0)}
                        </div>
                        <div>
                            <p class="font-semibold">${name}</p>
                            <p class="text-xs text-text-muted">${t('settings.contactManager')}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Install App -->
                <div class="w-full min-w-0 mb-4 rounded-xl border border-border bg-surface p-4">
                    <p class="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">${t('settings.installApp')}</p>
                    <button onclick="installApp()" class="flex w-full items-center gap-3 rounded-lg bg-brand-light p-3 text-sm font-semibold text-brand active:bg-brand/20 select-none">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        ${t('settings.install')}
                    </button>
                    <p class="mt-2 text-xs text-text-muted">${t('settings.installPrompt')}</p>
                </div>
                
                <!-- Language -->
                <div class="w-full min-w-0 rounded-xl border border-border bg-surface p-4">
                    <p class="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">${t('settings.language')}</p>
                    <button onclick="openLangModal()" class="flex w-full items-center gap-3 rounded-lg bg-surface-soft p-3 text-sm font-medium text-text-secondary active:bg-surface-raised select-none">
                        ${Icons.globe()}
                        ${getCurrentLangName()}
                    </button>
                </div>
            </div>
        `;
    },
    
    adminCareFund: async () => {
        const allRequests = await store.loadCareFundRequests();
        const requests = allRequests || store.careFundRequests;
        const pending = requests.filter(r => r.status === 'pending');
        const accepted = requests.filter(r => r.status === 'approved' || r.status === 'accepted');
        const rejected = requests.filter(r => r.status === 'rejected');
        const activeTab = window.careFundTab || 'pending';
        
        const occasionIcons = {
            birthday: Icons.cake,
            wedding: Icons.ring,
            newBaby: Icons.baby,
            graduation: Icons.graduationCap,
            medical: Icons.stethoscope,
            other: Icons.helpCircle
        };
        
        function tabBtn(tab, label, count) {
            const isActive = activeTab === tab;
            return `<button onclick="window.careFundTab='${tab}'; router.refresh()" class="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-3 text-xs sm:text-sm font-medium select-none transition-all ${isActive ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:bg-surface-soft'}">
                ${label} ${count > 0 ? `<span class="rounded-full ${isActive ? 'bg-white/20' : 'bg-surface-soft'} px-2 py-0.5 text-xs">${count}</span>` : ''}
            </button>`;
        }
        
        let requestsToShow = pending;
        if (activeTab === 'accepted') requestsToShow = accepted;
        if (activeTab === 'rejected') requestsToShow = rejected;
        
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.heartHandshake()}
                    ${t('nav.helpRequests')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">Review and respond to family help requests</p>
            </div>
            
            <div class="w-full min-w-0 mb-4 flex gap-1 rounded-xl border border-border bg-surface p-1">
                ${tabBtn('pending', t('careFund.pending'), pending.length)}
                ${tabBtn('accepted', t('careFund.accepted'), accepted.length)}
                ${tabBtn('rejected', t('careFund.notApproved'), rejected.length)}
            </div>
            
            <div class="w-full min-w-0 space-y-4">
                ${requestsToShow.length > 0 ? requestsToShow.map(r => `
                    <div class="w-full min-w-0 rounded-2xl border border-border bg-surface p-5 shadow-sm hover:shadow-md transition-all">
                        <div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div class="flex items-center gap-3">
                                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand flex-shrink-0">
                                    ${occasionIcons[r.occasion] ? occasionIcons[r.occasion]() : Icons.helpCircle()}
                                </div>
                                <div>
                                    <h3 class="font-bold text-text-primary">${r.member_name || 'Member'}</h3>
                                    <p class="text-sm text-text-muted flex items-center gap-1">
                                        ${t('occasions.' + r.occasion) || r.occasion} • ${formatDate(r.event_date)}
                                    </p>
                                </div>
                            </div>
                            <div class="text-left sm:text-right">
                                <p class="text-xl sm:text-2xl font-bold">${formatCurrency(r.amount)}</p>
                                ${StatusBadge({ status: r.status })}
                            </div>
                        </div>
                        ${r.description ? `
                            <div class="mb-4 rounded-xl bg-surface-soft p-3">
                                <p class="text-sm flex items-center gap-2">
                                    ${Icons.messageSquare()}
                                    ${r.description}
                                </p>
                            </div>
                        ` : ''}
                        ${activeTab === 'pending' ? `
                        <div class="flex gap-3">
                            <button onclick="acceptRequest('${r.id}')" class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-success py-3 font-medium text-white transition-colors active:bg-success/90 select-none">
                                ${Icons.check()} ${t('careFund.accepted')}
                            </button>
                            <button onclick="declineRequest('${r.id}')" class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-error py-3 font-medium text-error transition-colors active:bg-error/5 select-none">
                                ${Icons.x()} ${t('careFund.notApproved')}
                            </button>
                        </div>
                        ` : ''}
                    </div>
                `).join('') : EmptyState({ icon: Icons.heartHandshake(), message: activeTab === 'pending' ? 'No pending requests' : activeTab === 'accepted' ? 'No accepted requests yet' : 'No declined requests' })}
            </div>
        `;
    },
    
    adminMembers: async () => {
        // Note: GET /admin/members is not in the API spec, but we can get members from dashboard
        const dashboard = await store.loadDashboard();
        const memberCount = dashboard?.member_count || 0;
        const underfunded = dashboard?.underfunded_members || [];
        
        return `
        <div class="w-full min-w-0 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.users()}
                    ${t('nav.familyMembers')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">${memberCount} family members</p>
            </div>
            <button onclick="showAddMemberModal()" class="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-white shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 transition-all select-none sm:w-auto">
                ${Icons.userPlus()}
                <span>${t('members.addMember')}</span>
            </button>
        </div>
        
        <div class="w-full min-w-0 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            ${underfunded.map(m => `
                <div class="w-full min-w-0 rounded-2xl border border-border bg-surface p-5 shadow-sm hover:shadow-lg hover:shadow-brand/5 transition-all group">
                    <div class="mb-4 flex items-center gap-3">
                        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-xl font-bold text-brand flex-shrink-0 group-hover:scale-110 transition-transform">
                            ${m.name?.charAt(0) || '?'}
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-bold text-text-primary truncate text-base">${m.name}</h3>
                            <p class="text-xs text-text-muted flex items-center gap-1">
                                ${Icons.target()} Committed: ${formatCurrency(m.committed_amount)}
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 space-y-2.5 rounded-xl bg-surface-soft p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-text-muted flex items-center gap-1.5">${Icons.piggyBank()} Current</span>
                            <span class="font-bold text-text-primary">${formatCurrency(m.current_sum)}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-text-muted flex items-center gap-1.5">${Icons.alertTriangle()} Gap</span>
                            <span class="font-medium ${m.committed_amount - m.current_sum > 0 ? 'text-error' : 'text-success'}">${formatCurrency(m.committed_amount - m.current_sum)}</span>
                        </div>
                    </div>
                </div>
            `).join('') || `
                <div class="col-span-full text-center py-12">
                    <p class="text-sm text-text-muted">All members are up to date or no member data available</p>
                </div>
            `}
        </div>
        
        <!-- Add Member Modal - Bottom Sheet -->
        <div id="add-member-modal" class="fixed inset-0 z-50 hidden">
            <div class="absolute inset-0 bg-black/50" onclick="closeAddMemberModal()"></div>
            <div class="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-6 pb-8">
                <div class="mb-6">
                    <h2 class="text-lg font-semibold flex items-center gap-2">
                        ${Icons.userPlus()}
                        ${t('members.addMember')}
                    </h2>
                </div>
                <form onsubmit="handleAddMember(event)" class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.fullName')} <span class="text-error">*</span></label>
                        <input type="text" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface px-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.password')} <span class="text-error">*</span></label>
                        <input type="password" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface px-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.howMuchEach')}</label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">₦</span>
                            <input type="number" placeholder="0" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface py-3 pl-8 pr-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="button" onclick="closeAddMemberModal()" class="flex h-12 flex-1 items-center justify-center rounded-xl border border-border font-medium select-none">${t('common.cancel')}</button>
                        <button type="submit" class="flex h-12 flex-1 items-center justify-center rounded-xl bg-brand font-medium text-white select-none">${t('members.addMember')}</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    },
    
    notifications: async () => {
        const notifications = await store.loadNotifications();
        const unread = notifications.filter(n => !n.read);
        const read = notifications.filter(n => n.read);
        
        function item(n, isUnread) {
            return `
                <div class="flex items-start gap-3 p-4 ${isUnread ? 'bg-white shadow-sm' : 'bg-surface-soft'} rounded-xl border-l-[3px] ${isUnread ? 'border-brand' : 'border-transparent'}">
                    <div class="flex-shrink-0 mt-0.5">
                        <div class="flex h-9 w-9 items-center justify-center rounded-full ${isUnread ? 'bg-brand text-white' : 'bg-surface-raised text-text-muted'}">
                            ${Icons.bell()}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm ${isUnread ? 'font-semibold text-text-primary' : 'text-text-secondary'} leading-snug">${n.message}</p>
                        <p class="mt-1.5 text-[11px] text-text-muted">${timeAgo(n.created_at)}</p>
                    </div>
                    ${isUnread ? `
                        <button onclick="handleMarkRead('${n.id}')" class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-colors select-none">
                            ${Icons.check()}
                        </button>
                    ` : ''}
                </div>
            `;
        }
        
        return `
            <div class="w-full min-w-0">
                <!-- Top -->
                <div class="mb-4 flex items-center justify-between">
                    <h1 class="text-lg font-bold text-text-primary">${t('nav.notifications')}</h1>
                    ${unread.length > 0 ? `
                        <button onclick="handleMarkAllRead()" class="text-xs font-semibold text-brand select-none">Mark all read</button>
                    ` : ''}
                </div>
                
                ${notifications.length === 0 ? `
                    <div class="flex flex-col items-center py-20">
                        <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-soft text-text-muted">
                            ${Icons.bell()}
                        </div>
                        <p class="text-sm text-text-muted">${t('common.allCaughtUp')}</p>
                    </div>
                ` : `
                    <div class="space-y-2">
                        ${unread.map(n => item(n, true)).join('')}
                        ${read.map(n => item(n, false)).join('')}
                    </div>
                `}
            </div>
        `;
    },
    
    // Error Pages
    notFound: () => `
        <div class="flex min-h-screen flex-col items-center justify-center p-6">
            <div class="text-8xl text-brand mb-6">${Icons.alertCircle()}</div>
            <h1 class="text-4xl font-bold mb-2">404</h1>
            <h2 class="text-xl font-semibold text-text-secondary mb-4">Page Not Found</h2>
            <p class="text-text-muted mb-8 text-center max-w-md">The page you're looking for doesn't exist or has been moved.</p>
            <a href="/" class="flex h-12 items-center justify-center rounded-xl bg-brand px-6 font-medium text-white hover:bg-brand-hover active:bg-brand-hover">
                ${Icons.home()}
                Go Home
            </a>
        </div>
    `,
    
    serverError: () => `
        <div class="flex min-h-screen flex-col items-center justify-center p-6">
            <div class="text-8xl text-error mb-6">${Icons.alertOctagon()}</div>
            <h1 class="text-4xl font-bold mb-2">500</h1>
            <h2 class="text-xl font-semibold text-text-secondary mb-4">Server Error</h2>
            <p class="text-text-muted mb-8 text-center max-w-md">Something went wrong on our end. Please try again later.</p>
            <button onclick="location.reload()" class="flex h-12 items-center justify-center rounded-xl bg-brand px-6 font-medium text-white hover:bg-brand-hover active:bg-brand-hover">
                ${Icons.refreshCw()}
                Try Again
            </button>
        </div>
    `,
    
    home: () => {
        if (store.isLoggedIn()) {
            const path = store.isAdmin() ? '/admin/dashboard' : '/member/dashboard';
            router.navigate(path);
        } else {
            router.navigate('/login');
        }
        return `<div class="flex min-h-screen items-center justify-center"><div class="h-12 w-12 animate-spin rounded-full border-4 border-brand border-t-transparent"></div></div>`;
    }
};

// Event Handlers
function handleLogin(e) {
    e.preventDefault();
    const name = document.getElementById('login-name').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    const btn = document.getElementById('login-btn');
    
    if (!name || !password) {
        errorEl.querySelector('span:last-child').textContent = t('validation.required');
        errorEl.classList.remove('hidden');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ' + t('common.loading');
    
    store.login(name, password).then(() => {
        showToast(t('common.success'), 'success');
        router.navigate('/member/dashboard');
    }).catch(err => {
        errorEl.querySelector('span:last-child').textContent = err.message || t('auth.wrongCredentials');
        errorEl.classList.remove('hidden');
    }).finally(() => {
        btn.disabled = false;
        btn.innerHTML = Icons.logIn() + ' ' + t('auth.signIn');
    });
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const amount = document.getElementById('reg-amount').value;
    const schedule = document.getElementById('btn-weekly')?.classList.contains('bg-brand') ? 'weekly' : 'monthly';
    const btn = document.getElementById('reg-btn');
    
    if (!name || !password || !confirm) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    if (password !== confirm) {
        showToast(t('validation.passwordMismatch'), 'error');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ' + t('common.loading');
    
    const startDate = new Date().toISOString().split('T')[0];
    
    store.register({
        name,
        password,
        interval: schedule,
        committed_amount: parseInt(amount) || 0,
        start_date: startDate
    }).then(() => {
        showToast(t('common.success'), 'success');
        router.navigate('/member/dashboard');
    }).catch(err => {
        showToast(err.message || t('common.error'), 'error');
    }).finally(() => {
        btn.disabled = false;
        btn.innerHTML = Icons.userPlus() + ' ' + t('auth.createAccount');
    });
}

function handleAdminLogin(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('admin-error');
    const btn = document.querySelector('#admin-password')?.closest('form')?.querySelector('button[type="submit"]');
    
    if (btn) {
        btn.disabled = true;
    }
    
    store.adminLogin(password).then(() => {
        showToast(t('common.success'), 'success');
        router.navigate('/admin/dashboard');
    }).catch(err => {
        errorEl.querySelector('span:last-child').textContent = err.message || t('auth.wrongCredentials');
        errorEl.classList.remove('hidden');
    }).finally(() => {
        if (btn) btn.disabled = false;
    });
}

function handleMarkAllRead() {
    store.markAllRead().then(() => router.refresh());
}

function handleMarkRead(id) {
    store.markRead(id).then(() => router.refresh());
}

function togglePassword(id) {
    const input = document.getElementById(id);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

function setSchedule(schedule) {
    document.getElementById('btn-weekly').className = 'flex-1 rounded-lg py-3 text-sm font-medium transition-all select-none ' + (schedule === 'weekly' ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:bg-surface-soft');
    document.getElementById('btn-monthly').className = 'flex-1 rounded-lg py-3 text-sm font-medium transition-all select-none ' + (schedule === 'monthly' ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:bg-surface-soft');
}

function setFund(fund) {
    document.getElementById('fund-pool1').className = 'flex-1 rounded-lg py-3 text-sm font-medium select-none ' + (fund === 'pool1' ? 'bg-brand text-white' : 'text-text-secondary');
    document.getElementById('fund-pool2').className = 'flex-1 rounded-lg py-3 text-sm font-medium select-none ' + (fund === 'pool2' ? 'bg-brand text-white' : 'text-text-secondary');
}

function setTxType(type) {
    document.getElementById('type-credit').className = 'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium select-none ' + (type === 'credit' ? 'bg-success text-white' : 'text-text-secondary');
    document.getElementById('type-debit').className = 'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium select-none ' + (type === 'debit' ? 'bg-error text-white' : 'text-text-secondary');
}

// Admin - Record Payment
async function handleRecordPayment(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('txn-btn');
    const memberId = document.getElementById('txn-member')?.value;
    const fund = document.getElementById('fund-pool1')?.classList.contains('bg-brand') ? 'pool1' : 'pool2';
    const type = document.getElementById('type-credit')?.classList.contains('bg-success') ? 'credit' : 'debit';
    const amount = document.getElementById('txn-amount')?.value;
    const reason = document.getElementById('txn-reason')?.value;
    const receiptFile = document.getElementById('txn-receipt')?.files[0];
    
    if (!memberId || !amount || !reason) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ' + t('common.loading');
    
    try {
        let receipt_url = '';
        
        // Upload receipt first if provided
        if (receiptFile) {
            const uploadResult = await store.uploadReceipt(receiptFile);
            receipt_url = uploadResult.receipt_url || '';
        }
        
        await store.createTransaction({
            member_id: memberId,
            pool: fund,
            type,
            amount: parseInt(amount),
            reason,
            receipt_url
        });
        
        showToast(t('common.success'), 'success');
        router.navigate('/admin/transactions');
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = Icons.check() + ' ' + t('transaction.recordBtn');
    }
}

// Admin - Add Member
async function handleAddMember(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const name = inputs[0]?.value;
    const password = inputs[1]?.value;
    const amount = inputs[2]?.value;
    const btn = form.querySelector('button[type="submit"]');
    
    if (!name || !password) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    btn.disabled = true;
    
    try {
        await store.createMember({
            name,
            password,
            interval: 'monthly',
            committed_amount: parseInt(amount) || 0,
            start_date: new Date().toISOString().split('T')[0]
        });
        showToast(t('common.success'), 'success');
        closeAddMemberModal();
        router.refresh();
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    } finally {
        btn.disabled = false;
    }
}

// Member - Submit Care Fund Request
async function handleCareFundRequest(e) {
    e.preventDefault();
    const form = e.target;
    const amount = form.querySelector('input[type="number"]')?.value;
    const btn = form.querySelector('button[type="submit"]');
    
    if (!amount) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    btn.disabled = true;
    
    try {
        const dateInput = document.getElementById('care-date-value');
        await store.submitCareFundRequest({
            amount: parseInt(amount),
            occasion: 'other',
            event_date: dateInput?.value || new Date().toISOString().split('T')[0],
            description: ''
        });
        showToast(t('common.success'), 'success');
        router.refresh();
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    } finally {
        btn.disabled = false;
    }
}

// Admin - Accept Care Fund Request
async function acceptRequest(id) {
    try {
        await store.updateCareFundRequest(id, 'approved');
        showToast(t('careFund.accepted'), 'success');
        router.refresh();
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    }
}

// Admin - Decline Care Fund Request
async function declineRequest(id) {
    const reason = prompt('Reason for declining:');
    if (!reason) return;
    
    try {
        await store.updateCareFundRequest(id, 'rejected', reason);
        showToast(t('careFund.notApproved'), 'info');
        router.refresh();
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    }
}

// Member - Change Password
async function handleChangePassword(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const current = inputs[0]?.value;
    const newPass = inputs[1]?.value;
    const confirm = inputs[2]?.value;
    
    if (!current || !newPass || !confirm) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    if (newPass !== confirm) {
        showToast(t('validation.passwordMismatch'), 'error');
        return;
    }
    
    try {
        await store.changePassword(current, newPass);
        showToast(t('common.success'), 'success');
        form.reset();
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    }
}

// Member - Pool Transfer
async function handlePoolTransfer() {
    const amount = prompt('How much to transfer from Care Fund to Savings?');
    if (!amount || isNaN(amount)) return;
    
    try {
        await store.transferPool(parseInt(amount));
        showToast(t('common.success'), 'success');
        router.refresh();
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    }
}

// Member - Transfer Form Submit
async function handleTransferSubmit(e) {
    e.preventDefault();
    const amount = document.getElementById('transfer-amount')?.value;
    const btn = document.getElementById('transfer-btn');
    
    if (!amount || parseInt(amount) <= 0) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ' + t('common.loading');
    
    try {
        await store.transferPool(parseInt(amount));
        showToast(t('common.success'), 'success');
        router.refresh();
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = Icons.arrowRightLeft() + ' Transfer Now';
    }
}

function showAddMemberModal() {
    document.getElementById('add-member-modal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();
}

function closeAddMemberModal() {
    document.getElementById('add-member-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}
