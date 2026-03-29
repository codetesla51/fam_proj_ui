// Pages with Lucide Icons

// Helper to clean reason text
function cleanReason(reason, type) {
    if (!reason) return type === 'credit' ? 'Money In' : 'Money Out';
    const r = reason.toLowerCase();
    if (r.includes('transfer from pool2 to pool1') || r.includes('transfer from pool2')) return 'Transfer to Family Savings';
    if (r.includes('transfer from pool1 to pool2') || r.includes('transfer from pool1')) return 'Transfer to Personal Savings';
    if (r === 'pool2') return 'Personal Savings Deposit';
    if (r === 'pool1') return 'Family Savings Deposit';
    if (r.includes('care fund approved') || r.includes('care fund')) return 'Care Fund Withdrawal';
    if (r.includes('contribution')) return 'Contribution';
    if (r.includes('withdrawal')) return 'Withdrawal';
    // Remove amount suffix like ": 50" from transfer reasons
    return reason.replace(/:\s*\d+(\.\d+)?$/, '').trim() || reason;
}

// Filter transactions for family view - hides private Pool 2 transactions from other members
function filterFamilyTransactions(transactions, currentMemberId) {
    if (!transactions || !currentMemberId) return transactions || [];
    return transactions.filter(t => {
        const pool = t.pool || t.Pool;
        const type = t.type || t.Type;
        const memberId = t.member_id || t.MemberID;
        
        // Always show Pool 1
        if (pool === 'pool1') return true;
        // Always show transfers regardless of pool
        if (type === 'transfer' || type === 'pool_transfer') return true;
        // Pool 2 — only show if it belongs to current member
        if (pool === 'pool2') return memberId === currentMemberId;
        
        return true;
    });
}

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
                    <p class="text-xl text-white/90 leading-relaxed">Your family savings, all in one place. Simple, secure, together.</p>
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
                            <span class="text-sm font-medium text-white/80">Personal Savings</span>
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
                    <button onclick="openLangModal()" class="flex h-12 items-center gap-2 rounded-2xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-soft active:scale-95 transition-all select-none">
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
                        
                        <div id="login-error" class="mb-5 hidden rounded-2xl border border-error/20 bg-error/5 p-4 text-sm text-error flex items-center gap-2">
                            ${Icons.alertCircle()}
                            <span></span>
                        </div>
                        
                        <form onsubmit="handleLogin(event)" class="space-y-5">
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.yourName')}</label>
                                <input type="text" id="login-name" placeholder="${t('auth.yourNamePlaceholder')}"
                                    onblur="this.classList.toggle('border-error', !this.value.trim())"
                                    class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface px-4 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.password')}</label>
                                <div class="relative">
                                    <input type="password" id="login-password" 
                                        onblur="this.classList.toggle('border-error', !this.value.trim())"
                                        class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface px-4 pr-14 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                    <button type="button" onclick="togglePassword('login-password')" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-text-secondary active:scale-90 transition-all select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <button type="submit" id="login-btn"
                                class="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/35 active:scale-[0.98] select-none">
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
                        <a href="/register" class="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-brand/30 bg-brand-light/30 text-base font-bold text-brand transition-all hover:bg-brand-light hover:border-brand active:scale-[0.98] select-none">
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
                    <button onclick="openLangModal()" class="flex h-12 items-center gap-2 rounded-2xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-soft active:scale-95 transition-all select-none">
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
                                    class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface px-4 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                <p class="text-xs text-text-muted pl-1">${t('auth.fullNameHelper')}</p>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.createPassword')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <input type="password" id="reg-password"
                                        class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface px-4 pr-14 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                    <button type="button" onclick="togglePassword('reg-password')" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-text-secondary active:scale-90 transition-all select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('auth.confirmPassword')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <input type="password" id="reg-confirm"
                                        class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface px-4 pr-14 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                    <button type="button" onclick="togglePassword('reg-confirm')" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-text-secondary active:scale-90 transition-all select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('register.howOften')} <span class="text-error">*</span></label>
                                <div class="flex rounded-2xl border-2 border-border p-1.5 gap-2">
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
                                        class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface py-3 pl-12 pr-4 text-lg font-semibold transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                </div>
                                <p class="text-xs text-text-muted pl-1">${t('register.howMuchHelper')}</p>
                            </div>
                            
                            <button type="submit" id="reg-btn"
                                class="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-brand text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/35 active:scale-[0.98] select-none">
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
                        <a href="/login" class="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-brand/30 bg-brand-light/30 text-base font-bold text-brand transition-all hover:bg-brand-light hover:border-brand active:scale-[0.98] select-none">
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
            <!-- Left Panel - Brand -->
            <div class="hidden lg:flex lg:w-1/2 bg-brand relative flex-col items-center justify-center p-12 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-brand-hover via-brand to-brand-800"></div>
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
                        <div class="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white shadow-2xl">
                            ${Icons.shield()}
                        </div>
                    </div>
                    <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4">${t('common.familyManager')}</h1>
                    <p class="text-lg text-white/80 max-w-md mb-8">Full control over your family savings and care fund</p>
                    <div class="grid grid-cols-3 gap-6 text-white/70 text-sm">
                        <div class="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                            ${Icons.users()}
                            <span>Members</span>
                        </div>
                        <div class="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                            ${Icons.piggyBank()}
                            <span>Savings</span>
                        </div>
                        <div class="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                            ${Icons.heartHandshake()}
                            <span>Care Fund</span>
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-8 text-white/40 text-sm">© 2026 Odelade Family Ledger</div>
            </div>
            
            <!-- Right Panel - Form -->
            <div class="flex w-full lg:w-1/2 items-center justify-center p-6 pb-24 bg-surface-soft">
                <div class="w-full max-w-md">
                    <!-- Mobile Logo -->
                    <div class="lg:hidden mb-8 flex flex-col items-center gap-4">
                        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white shadow-xl">
                            ${Icons.shield()}
                        </div>
                        <span class="text-2xl font-bold text-text-primary">${t('common.familyManager')}</span>
                    </div>
                    
                    <div class="mb-8 text-center">
                        <div class="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm text-brand font-bold mb-4">
                            ${Icons.shield()}
                            ${t('common.familyManagerAccess')}
                        </div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-text-primary">Welcome Back</h2>
                        <p class="text-text-muted mt-2">Enter your manager password to continue</p>
                    </div>
                    
                    <div class="mb-4 flex justify-end">
                        <button onclick="openLangModal()" class="flex h-12 items-center gap-2 rounded-2xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-raised transition-colors select-none">
                            ${Icons.globe()}
                            <span class="hidden sm:inline">Language</span>
                        </button>
                    </div>
                    
                    <div class="w-full min-w-0 rounded-3xl border border-border bg-surface p-8 shadow-xl">
                        <div id="admin-error" class="mb-6 hidden rounded-2xl border border-error/20 bg-error/10 p-4 text-sm text-error flex items-center gap-3">
                            ${Icons.alertCircle()}
                            <span></span>
                        </div>
                        
                        <div id="admin-success" class="mb-4 hidden rounded-2xl border border-success/20 bg-success/10 p-4 text-sm text-success flex items-center gap-3">
                            ${Icons.checkCircle()}
                            <span></span>
                        </div>
                        
                        <form onsubmit="handleAdminLogin(event)" class="space-y-6">
                            <div class="space-y-3">
                                <label class="block text-sm font-semibold text-text-primary flex items-center gap-2">
                                    ${Icons.lock()}
                                    Manager Password
                                </label>
                                <div class="relative">
                                    <input type="password" id="admin-password" placeholder="Enter your password"
                                        class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface px-4 pr-14 text-base transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 placeholder:text-text-muted">
                                    <button type="button" onclick="togglePassword('admin-password')" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted h-10 w-10 flex items-center justify-center hover:text-brand transition-colors select-none">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <button type="submit" id="admin-submit-btn"
                                class="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-base font-bold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98] select-none">
                                ${Icons.logIn()}
                                Sign In as Manager
                            </button>
                        </form>
                        
                        <div class="mt-8 pt-6 border-t border-border">
                            <a href="/login" class="flex items-center justify-center gap-2 text-sm font-medium text-text-muted hover:text-brand transition-colors select-none">
                                ${Icons.arrowLeft()}
                                Back to family login
                            </a>
                        </div>
                    </div>
                    
                    <p class="mt-8 text-center text-xs text-text-muted">
                        For family use only. Contact support if you need access.
                    </p>
                </div>
            </div>
        </div>
    `,
    
    // Member Pages
    memberDashboard: async () => {
        // Load dashboard and transactions if not already loaded
        const [dashboard, recentTx] = await Promise.all([
            store.data.dashboard ? Promise.resolve(store.data.dashboard) : store.loadDashboard(),
            member.getAllTransactions({ limit: 50 })
        ]);
        
        const d = dashboard || {};
        
        // Get pool2 balance from dashboard
        let pool2Balance = d.my_pool2_contributions;
        
        // Get recent transactions - filter to hide other members' Pool 2 transactions
        const allTransactions = recentTx?.transactions || [];
        const filteredTransactions = filterFamilyTransactions(allTransactions, store.user?.id);
        let recent = filteredTransactions.slice(0, 10);
        
        const name = store.user?.name?.split(' ')[0] || 'Friend';
        return `
            <div class="w-full min-w-0">
                <!-- Greeting -->
                <div class="mb-6 flex items-center gap-4">
                    <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white text-xl font-bold shadow-lg shadow-brand/30">
                        ${name.charAt(0)}
                    </div>
                    <div>
                        <p class="text-sm text-text-muted">${getGreeting()}</p>
                        <h1 class="text-2xl font-bold text-text-primary">${name}</h1>
                    </div>
                </div>
                
                <!-- KPI Grid -->
                <div class="w-full min-w-0 mb-6 grid grid-cols-2 gap-4">
                    ${KpiCard({ label: 'Family Savings', amount: d.pool1_balance || 0, subtext: t('common.totalPool1'), highlight: true })}
                    ${KpiCard({ label: 'My Savings', amount: d.my_contributions || 0, subtext: t('common.yourContributions') })}
                    ${KpiCard({ label: 'Personal Savings', amount: pool2Balance || 0, subtext: t('common.yourBalance') })}
                    ${KpiCard({ label: 'Alerts', amount: store.unreadCount || 0, subtext: 'Unread', isCurrency: false })}
                </div>
                
                <!-- Recent Activity -->
                <div class="w-full min-w-0 mb-6">
                    <div class="mb-4 flex items-center justify-between">
                        <h2 class="text-base font-bold text-text-primary">${t('common.recentActivity')}</h2>
                        <a href="/member/activity" class="flex items-center gap-1 text-sm font-semibold text-brand select-none">${Icons.arrowRight()} ${t('common.viewAll')}</a>
                    </div>
                    ${recent.length > 0 ? `
                        <div class="w-full min-w-0 space-y-3">
                            ${recent.map(p => {
                                const pType = p.type || p.Type || 'credit';
                                const pReason = p.reason || p.Reason || '';
                                const pAmount = p.amount || p.Amount || 0;
                                const pCreated = p.created_at || p.CreatedAt || '';
                                const pMemberName = p.member_name || p.MemberName || 'Family member';
                                const pReceiptUrl = p.receipt_url || p.ReceiptURL || '';
                                const pReceiptData = p.receiptData || p.ReceiptData || '';
                                return `
                                <div class="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 hover:shadow-md transition-shadow">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${pType === 'credit' || pReason.includes('Transfer from pool2') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                        ${pType === 'credit' || pReason.includes('Transfer from pool2') ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-semibold text-text-primary truncate">${cleanReason(pReason, pType)}</p>
                                        <p class="text-xs text-text-muted">${pMemberName} • ${formatDate(pCreated)}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        ${pReceiptUrl ? `<button onclick="showReceiptImage('${pReceiptUrl}')" class="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                        ${!pReceiptUrl && pReceiptData ? `<button onclick="showTransferReceiptData('${p.id || p.ID}', '${encodeURIComponent(pReceiptData)}')" class="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                        <p class="text-sm font-bold whitespace-nowrap ${pType === 'credit' || pReason.includes('Transfer from pool2') ? 'text-success' : 'text-error'}">
                                            ${pType === 'credit' || pReason.includes('Transfer from pool2') ? '+' : '-'}${formatCurrency(pAmount)}
                                        </p>
                                    </div>
                                </div>
                            `}).join('')}
                        </div>
                    ` : `
                        <div class="rounded-2xl border border-border bg-surface p-8 text-center">
                            <div class="mb-3 flex justify-center">${Icons.wallet()}</div>
                            <p class="text-sm text-text-muted">${t('member.noPayments')}</p>
                        </div>
                    `}
                </div>
                
                <!-- Quick Actions -->
                <div class="w-full min-w-0 grid grid-cols-2 gap-4">
                    <a href="/member/transfer" class="flex items-center justify-center gap-3 rounded-2xl bg-brand p-4 font-bold text-white shadow-lg shadow-brand/25 select-none">
                        ${Icons.arrowRightLeft()} ${t('common.transfer')}
                    </a>
                    <a href="/member/care-fund" class="flex items-center justify-center gap-3 rounded-2xl border-2 border-border bg-surface p-4 font-bold select-none">
                        ${Icons.heartHandshake()} ${t('common.requestWithdraw')}
                    </a>
                </div>
            </div>
        `;
    },
    
    memberSavings: async () => {
        // Use cached transactions from store, filter by pool1
        let transactions = (store.data.transactions || []).filter(t => t.pool === 'pool1' || t.Pool === 'pool1');
        
        // Calculate summary
        const totalIn = transactions.filter(t => t.type === 'credit' || t.Type === 'credit').reduce((sum, t) => sum + parseFloat(t.amount || t.Amount || 0), 0);
        const totalOut = transactions.filter(t => t.type === 'debit' || t.Type === 'debit').reduce((sum, t) => sum + parseFloat(t.amount || t.Amount || 0), 0);
        
        return `
            <div class="w-full min-w-0 mb-4">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.wallet()}
                    My Family Savings
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">Your contributions to the family savings pool</p>
            </div>
            
            <!-- Summary -->
            <div class="w-full min-w-0 mb-4">
                <div class="rounded-2xl bg-success/10 p-4 border border-success/20">
                    <p class="text-xs text-success font-medium">Total Saved</p>
                    <p class="text-xl font-bold text-success">+${formatCurrency(totalIn)}</p>
                </div>
            </div>
            
            <!-- Transactions -->
            <div class="w-full min-w-0">
            ${transactions.length > 0 ? `
                <div class="w-full min-w-0 space-y-2">
                    ${transactions.map((tx, i) => {
                        const txType = tx.type || tx.Type || 'credit';
                        const txAmount = tx.amount || tx.Amount || 0;
                        const txReason = tx.reason || tx.Reason || '';
                        const txCreated = tx.created_at || tx.CreatedAt || '';
                        const txMemberName = tx.member_name || tx.MemberName || 'Family member';
                        const txReceiptUrl = tx.receipt_url || tx.ReceiptURL || '';
                        const txReceiptData = tx.receiptData || tx.ReceiptData || '';
                        return `
                        <div class="rounded-2xl border border-border bg-surface p-4 hover:shadow-md transition-shadow">
                            <div class="flex items-start gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${txType === 'credit' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                    ${txType === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-text-primary">${cleanReason(txReason, txType)}</p>
                                    <p class="text-xs text-text-muted mt-1">${txMemberName} • ${formatDate(txCreated)}</p>
                                </div>
                                <div class="text-right flex items-center gap-2">
                                    <div>
                                        <p class="text-lg font-bold ${txType === 'credit' ? 'text-success' : 'text-error'}">${txType === 'credit' ? '+' : '-'}${formatCurrency(txAmount)}</p>
                                        ${txReceiptUrl ? `<button onclick="showReceiptImage('${txReceiptUrl}')" class="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                        ${!txReceiptUrl && txReceiptData ? `<button onclick="showTransferReceiptData('${tx.id || tx.ID}', '${encodeURIComponent(txReceiptData)}')" class="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                <p class="text-center text-sm text-text-muted mt-4">${transactions.length} payment${transactions.length !== 1 ? 's' : ''} recorded</p>
            ` : `
                <div class="rounded-2xl border border-border bg-surface p-8 text-center">
                    <div class="mb-3 flex justify-center">${Icons.wallet()}</div>
                    <p class="text-sm font-medium text-text-primary">No payments recorded yet</p>
                    <p class="text-xs text-text-muted mt-1">Your family manager will record your first payment</p>
                </div>
            `}
            </div>
        `;
    },
    
    memberTransfer: async () => {
        const dashboard = await store.loadDashboard();
        const d = dashboard || {};
        
        // Get pool2 balance (personal savings available to transfer FROM)
        let pool2Balance = d.my_pool2_contributions;
        if (!pool2Balance || pool2Balance === '0') {
            const txns = await store.loadTransactions({ pool: 'pool2' });
            const txArray = Array.isArray(txns) ? txns : (txns?.data || []);
            const credits = txArray.filter(t => t.type === 'credit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
            const debits = txArray.filter(t => t.type === 'debit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
            pool2Balance = String(credits - debits);
        }
        
        // Get pool1 total balance (family savings) - this is the TOTAL pool1, not member's contributions
        const pool1Balance = d.pool1_balance || '0';
        
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.arrowRightLeft()}
                    ${t('common.transfer')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">${t('transfer.description')}</p>
            </div>
            
            <!-- Balances -->
            <div class="w-full min-w-0 mb-6 grid grid-cols-2 gap-3">
                <div class="rounded-2xl border border-border bg-surface p-4">
                    <p class="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">${t('member.personalSavings')}</p>
                    <p class="text-2xl font-bold text-brand">${formatCurrency(pool2Balance || 0)}</p>
                    <p class="text-xs text-text-muted mt-1">${t('transfer.available')}</p>
                </div>
                <div class="rounded-2xl border border-border bg-surface p-4">
                    <p class="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">${t('member.familySavings')}</p>
                    <p class="text-2xl font-bold text-text-primary">${formatCurrency(pool1Balance)}</p>
                    <p class="text-xs text-text-muted mt-1">${t('transfer.currentBalance')}</p>
                </div>
            </div>
            
            <!-- Transfer Form -->
            <div class="w-full min-w-0">
                ${Card({
                    title: t('transfer.title'),
                    children: `
                        <form onsubmit="handleTransferSubmit(event)" class="space-y-5">
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-text-primary">${t('transfer.howMuch')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                    <input type="number" id="transfer-amount" placeholder="0" max="${pool2Balance || 0}"
                                        class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface py-3 pl-12 pr-4 text-lg font-semibold transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 hover:border-brand/40">
                                </div>
                                <p class="text-xs text-text-muted">${t('transfer.maximum')}: ${formatCurrency(pool2Balance || 0)}</p>
                            </div>
                            
                            <button type="submit" id="transfer-btn" class="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 font-bold text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 transition-all select-none">
                                ${Icons.arrowRightLeft()} ${t('common.transferNow')}
                            </button>
                        </form>
                        
                        <div class="mt-6 rounded-2xl bg-surface-soft p-4">
                            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">${t('transfer.howItWorks')}</p>
                            <ul class="space-y-2 text-sm text-text-secondary">
                                <li class="flex items-start gap-2">${Icons.checkCircle()} ${t('transfer.step1')}</li>
                                <li class="flex items-start gap-2">${Icons.checkCircle()} ${t('transfer.step2')}</li>
                                <li class="flex items-start gap-2">${Icons.checkCircle()} ${t('transfer.step3')}</li>
                            </ul>
                        </div>
                    `
                })}
            </div>
        `;
    },
    
    memberHistory: async () => {
        // Reset filters and pagination for fresh page load
        window.historyFilters = window.historyFilters || { fund: 'all', type: 'all' };
        window.historyPage = window.historyPage || 1;
        const limit = 20;
        const page = window.historyPage;
        
        // Load transactions and receipts
        let transactions = [];
        let receipts = {};
        try {
            const memberApi = window.member;
            const result = await memberApi.getTransactions({ limit: 100 });
            transactions = result?.transactions || result?.data || [];
            // Normalize field names from API (Pool, Type, Amount, CreatedAt)
            transactions = transactions.map(tx => ({
                id: tx.ID,
                pool: tx.Pool,
                type: tx.Type,
                amount: tx.Amount,
                reason: tx.Reason,
                created_at: tx.CreatedAt,
                receipt_url: tx.ReceiptURL
            }));
            const rpts = await memberApi.getReceipts();
            rpts.forEach(r => { receipts[r.TransactionID] = r; });
            // Attach receipt to both sides of transfer
            transactions.forEach(tx => {
                if (receipts[tx.id]) {
                    tx.receiptData = receipts[tx.id].ReceiptData;
                }
            });
        } catch (e) { }
        
        const filters = window.historyFilters;
        
        // Calculate summary
        const totalIn = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        const totalOut = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        
        // Apply filters
        let filtered = transactions.filter(tx => {
            if (filters.fund !== 'all' && tx.pool !== filters.fund) return false;
            if (filters.type !== 'all' && tx.type !== filters.type) return false;
            return true;
        });
        
        // Paginate
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedTransactions = filtered.slice(start, end);
        
        return `
            <div class="w-full min-w-0 mb-4">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.history()}
                    My Transaction History
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">A complete record of your activity across Family Savings and Personal Savings</p>
            </div>
            
            <!-- Summary Bar -->
            <div class="w-full min-w-0 mb-4 grid grid-cols-2 gap-3">
                <div class="rounded-2xl bg-success/10 p-3 border border-success/20">
                    <p class="text-xs text-success font-medium">Total Money In</p>
                    <p class="text-lg font-bold text-success">+${formatCurrency(totalIn)}</p>
                </div>
                <div class="rounded-2xl bg-error/10 p-3 border border-error/20">
                    <p class="text-xs text-error font-medium">Total Money Out</p>
                    <p class="text-lg font-bold text-error">-${formatCurrency(totalOut)}</p>
                </div>
            </div>
            
            <!-- Filters -->
            <div class="w-full min-w-0 mb-4 flex flex-wrap gap-2">
                <div class="flex rounded-lg border border-border overflow-hidden">
                    <button onclick="window.historyFilters={fund:'all',type:'all'};window.historyPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium ${filters.fund==='all' && filters.type==='all' ? 'bg-brand text-white' : 'bg-surface text-text-secondary'}">All</button>
                </div>
                <div class="flex rounded-lg border border-border overflow-hidden">
                    <button onclick="window.historyFilters.fund='pool1';window.historyPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium ${filters.fund==='pool1' ? 'bg-brand text-white' : 'bg-surface text-text-secondary'}">Family Savings</button>
                    <button onclick="window.historyFilters.fund='pool2';window.historyPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium ${filters.fund==='pool2' ? 'bg-brand text-white' : 'bg-surface text-text-secondary'}">Personal Savings</button>
                </div>
                <div class="flex rounded-lg border border-border overflow-hidden">
                    <button onclick="window.historyFilters.type='credit';window.historyPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium ${filters.type==='credit' ? 'bg-success text-white' : 'bg-surface text-text-secondary'}">Money In</button>
                    <button onclick="window.historyFilters.type='debit';window.historyPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium ${filters.type==='debit' ? 'bg-error text-white' : 'bg-surface text-text-secondary'}">Money Out</button>
                </div>
                ${(filters.fund !== 'all' || filters.type !== 'all') ? `<button onclick="window.historyFilters={fund:'all',type:'all'};window.historyPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium text-brand">Clear</button>` : ''}
            </div>
            
            <!-- Transactions -->
            <div class="w-full min-w-0">
                ${filtered.length > 0 ? `
                    <div class="w-full min-w-0 space-y-2">
                        ${paginatedTransactions.map((tx, i) => `
                            <div class="rounded-2xl border border-border bg-surface p-4 hover:shadow-md transition-shadow">
                                <div class="flex items-start gap-3">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${tx.type === 'credit' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                        ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center gap-2 mb-1">
                                            <span class="text-xs font-medium px-2 py-0.5 rounded-full ${tx.pool === 'pool1' ? 'bg-brand/10 text-brand' : 'bg-pool2/10 text-pool2'}">${tx.pool === 'pool1' ? 'Family Savings' : 'Personal Savings'}</span>
                                        </div>
                                        <p class="text-sm font-semibold text-text-primary">${cleanReason(tx.reason, tx.type)}</p>
                                        <p class="text-xs text-text-muted mt-1">${formatDate(tx.created_at)}</p>
                                    </div>
                                    <div class="text-right flex items-center gap-2">
                                        <p class="text-lg font-bold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}</p>
                                        ${tx.receipt_url ? `<button onclick="showReceiptImage('${tx.receipt_url}')" class="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                        ${tx.receiptData && !tx.receipt_url ? `<button onclick="showTransferReceiptData('${tx.id}', '${encodeURIComponent(tx.receiptData)}')" class="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${renderPagination('history', page, filtered.length, limit)}
                ` : `
                    <div class="rounded-2xl border border-border bg-surface p-8 text-center">
                        <div class="mb-3 flex justify-center">${Icons.history()}</div>
                        <p class="text-sm font-medium text-text-primary">${transactions.length === 0 ? 'No transactions yet' : 'No transactions match your filter'}</p>
                        <p class="text-xs text-text-muted mt-1">${transactions.length === 0 ? 'Your transactions will appear here once your family manager records your first payment' : 'Clear filters to see all transactions'}</p>
                    </div>
                `}
            </div>
        `;
    },
    
    // Family Activity - All Pool 1 transactions from all members
    memberActivity: async () => {
        window.activityPage = window.activityPage || 1;
        const limit = 20;
        const page = window.activityPage;
        
        // Fetch all pool1 transactions from API
        let transactions = [];
        try {
            const memberApi = window.member;
            const result = await memberApi.getAllTransactions({ limit: 100 });
            let rawTx = result?.transactions || result?.data || [];
            // Normalize PascalCase fields
            transactions = rawTx.map(tx => ({
                id: tx.ID || tx.id,
                member_id: tx.MemberID || tx.member_id,
                member_name: tx.MemberName || tx.member_name,
                type: tx.Type || tx.type,
                amount: tx.Amount || tx.amount,
                reason: tx.Reason || tx.reason,
                created_at: tx.CreatedAt || tx.created_at,
                pool: tx.Pool || tx.pool,
                receipt_url: tx.ReceiptURL || tx.receipt_url
            }));
            // Attach receipts from receipts table
            const receipts = await memberApi.getReceipts();
            const receiptMap = {};
            receipts.forEach(r => { receiptMap[r.TransactionID] = r; });
            transactions = transactions.map(p => ({
                ...p,
                receiptData: receiptMap[p.id]?.ReceiptData
            }));
            
            // Filter to hide other members' Pool 2 transactions
            transactions = filterFamilyTransactions(transactions, store.user?.id);
        } catch (e) { }
        
        // Paginate
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedTransactions = transactions.slice(start, end);
        
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.users()}
                    Family Activity
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">All family savings activity across Pool 1</p>
            </div>
            
            <div class="w-full min-w-0">
                ${transactions.length > 0 ? `
                    <div class="w-full min-w-0 space-y-3">
                        ${paginatedTransactions.map(p => `
                            <div class="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 hover:shadow-md transition-shadow">
                                <div class="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${p.type === 'credit' || p.reason?.includes('Transfer from pool2') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                    ${p.type === 'credit' || p.reason?.includes('Transfer from pool2') ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-text-primary truncate">${cleanReason(p.reason, p.type)}</p>
                                    <p class="text-xs text-text-muted">${p.member_name || 'Family member'} • ${formatDate(p.created_at)}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    ${p.receipt_url ? `<a href="${p.receipt_url}" target="_blank" class="p-2 text-brand hover:text-brand-hover" title="View Receipt">${Icons.fileText()}</a>` : ''}
                                    ${!p.receipt_url && p.receiptData ? `<button onclick="showTransferReceiptData('${p.id}', '${encodeURIComponent(p.receiptData || '')}')" class="p-2 text-brand hover:text-brand-hover" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                    <p class="text-sm font-bold whitespace-nowrap ${p.type === 'credit' || p.reason?.includes('Transfer from pool2') ? 'text-success' : 'text-error'}">
                                        ${p.type === 'credit' || p.reason?.includes('Transfer from pool2') ? '+' : '-'}${formatCurrency(p.amount)}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${renderPagination('activity', page, transactions.length, limit)}
                ` : `
                    <div class="rounded-2xl border border-border bg-surface p-8 text-center">
                        <div class="mb-3 flex justify-center">${Icons.users()}</div>
                        <p class="text-sm text-text-muted">No family activity yet. Transactions will appear here.</p>
                    </div>
                `}
            </div>
        `;
    },
    
    memberCareFund: async () => {
        const dashboard = await store.loadDashboard();
        const d = dashboard || {};
        const requests = await store.loadCareFundRequests();
        
        // Get pool2 balance from transactions if not in dashboard
        let pool2Balance = d.my_pool2_contributions;
        if (!pool2Balance || pool2Balance === '0') {
            const txns = await store.loadTransactions({ pool: 'pool2' });
            const txArray = Array.isArray(txns) ? txns : (txns?.data || []);
            const credits = txArray.filter(t => t.type === 'credit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
            const debits = txArray.filter(t => t.type === 'debit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
            pool2Balance = String(credits - debits);
        }
        
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-2xl font-bold text-text-primary">${t('nav.personalSavings')}</h1>
                <p class="text-sm text-text-muted mt-1">Request help from your family</p>
            </div>
            
            <!-- Balance -->
            <div class="w-full min-w-0 mb-6 rounded-2xl border-2 border-brand/20 bg-gradient-to-br from-brand-light to-white p-5 shadow-lg shadow-brand/10">
                <p class="text-sm font-bold text-brand mb-1">Personal Savings Balance</p>
                <p class="text-3xl font-bold text-brand">${formatCurrency(pool2Balance || 0)}</p>
            </div>
            
            <!-- Request Form -->
            <div class="w-full min-w-0 mb-6">
                ${Card({
                    title: t('careFund.requestHelp'),
                    children: `
                        <form onsubmit="handleCareFundRequest(event)" class="space-y-5">
                            <div class="space-y-2">
                                <label class="block text-sm font-bold text-text-primary">${t('careFund.howMuchNeed')}</label>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                    <input type="number" id="care-amount" placeholder="0" max="${pool2Balance || 0}"
                                        class="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-surface pl-12 pr-4 text-lg font-bold transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                </div>
                                <p class="text-xs text-text-muted">Available: ${formatCurrency(pool2Balance || 0)}</p>
                            </div>
                            <button type="submit" id="care-btn" class="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-lg font-bold text-white shadow-lg shadow-brand/25 select-none">
                                ${Icons.heartHandshake()} ${t('careFund.sendRequest')}
                            </button>
                        </form>
                    `
                })}
            </div>
            
            <!-- Past Requests -->
            <div class="w-full min-w-0">
                ${Card({
                    title: t('careFund.pastRequests'),
                    children: requests.length > 0 ? `
                        <div class="space-y-3">
                            ${requests.map(r => `
                                <div class="rounded-2xl border border-border bg-surface-soft p-4">
                                    <div class="flex items-center justify-between mb-2">
                                        <div>
                                            <p class="font-bold text-text-primary">${formatCurrency(r.amount)}</p>
                                            ${r.occasion ? `<p class="text-xs font-medium text-brand mt-1">${r.occasion}</p>` : ''}
                                        </div>
                                        ${StatusBadge({ status: r.status })}
                                    </div>
                                    ${r.description ? `<p class="text-xs text-text-secondary mt-2 italic">"${r.description}"</p>` : ''}
                                    <p class="text-xs text-text-muted mt-2">${r.event_date ? formatDate(r.event_date) : formatDate(r.created_at)}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : EmptyState({ icon: Icons.heartHandshake(), message: t('careFund.noRequests') })
                })}
            </div>
        `;
    },
    
    adminDashboard: async () => {
        let dashboard;
        try {
            dashboard = await store.loadDashboard();
        } catch (e) {
            console.warn('dashboard failed', e);
        }
        const d = dashboard || {};
        return `
            <div class="w-full min-w-0">
                <!-- Title -->
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-text-primary">${t('admin.familyOverview')}</h1>
                    <p class="text-sm text-text-muted mt-1">${t('admin.dashboardDesc')}</p>
                </div>
                
                <!-- KPI Grid -->
                <div class="w-full min-w-0 mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    ${KpiCard({ label: 'Family Savings', amount: d.pool1_balance || 0, subtext: t('common.totalPool1'), highlight: true })}
                    ${KpiCard({ label: 'Personal Savings', amount: d.pool2_balance || 0, subtext: 'Total Pool 2' })}
                    ${KpiCard({ label: t('admin.members'), amount: d.member_count || 0, subtext: (d.active_count || 0) + ' ' + t('common.active'), isCurrency: false })}
                    ${KpiCard({ label: 'Overdue', amount: d.overdue_count || 0, subtext: t('member.behind'), isCurrency: false })}
                </div>
                
                ${d.underfunded_members && d.underfunded_members.length > 0 ? `
                    <div class="w-full min-w-0 mb-6 rounded-2xl border border-error/20 bg-error/5 p-4 overflow-x-hidden">
                        <div class="mb-3 flex items-center gap-2">${Icons.alertTriangle()}<p class="text-sm font-bold text-error">${t('admin.behindTitle')}</p></div>
                        <div class="w-full min-w-0 space-y-2 overflow-x-hidden">
                            ${d.underfunded_members.map(m => {
                                const name = m.Name || m.name || '?';
                                const committed = parseFloat(m.CommittedAmount || m.committed_amount || 0);
                                const current = parseFloat(m.CurrentSum || m.current_sum || 0);
                                const gap = committed - current;
                                return `
                                <div class="flex items-center justify-between gap-2 rounded-lg bg-surface p-3 min-w-0">
                                    <div class="flex items-center gap-2 min-w-0">
                                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-error/10 text-xs font-bold text-error flex-shrink-0">${name.charAt(0)}</div>
                                        <span class="text-sm font-medium text-text-primary truncate min-w-0">${name}</span>
                                    </div>
                                    <span class="text-xs font-bold text-error whitespace-nowrap flex-shrink-0">${formatCurrency(gap)} behind</span>
                                </div>
                            `}).join('')}
                        </div>
                    </div>
                ` : `<div class="w-full min-w-0 mb-6 rounded-2xl border border-success/20 bg-success/5 p-4 flex items-center gap-2">${Icons.checkCircle()}<p class="text-sm font-semibold text-success">${t('admin.allUpToDate')}</p></div>`}
                
                <!-- Quick Actions -->
                <div class="w-full min-w-0">
                    <h2 class="mb-4 text-base font-bold text-text-primary">${t('admin.quickActions')}</h2>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <a href="/admin/transactions/new" class="flex items-center justify-center gap-3 rounded-2xl bg-brand p-5 font-bold text-white shadow-lg shadow-brand/25 select-none">
                            ${Icons.plusCircle()}<span>${t('admin.recordPayment')}</span>
                        </a>
                        <a href="/admin/members" class="flex items-center justify-center gap-3 rounded-2xl border-2 border-border bg-surface p-5 font-bold select-none">
                            ${Icons.userPlus()}<span>${t('admin.addMember')}</span>
                        </a>
                        <a href="/admin/care-fund" class="flex items-center justify-center gap-3 rounded-2xl border-2 border-border bg-surface p-5 font-bold select-none">
                            ${Icons.heartHandshake()}<span>${t('admin.reviewRequests')}</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    },
    
    adminTransactions: async () => {
        // Reset filters and pagination
        window.adminTxFilters = window.adminTxFilters || { fund: 'all', type: 'all' };
        window.adminTxPage = window.adminTxPage || 1;
        
        // Load fresh data
        const txData = await store.loadTransactions({ limit: 500 });
        let transactions = Array.isArray(txData) ? txData : (txData?.transactions || []);
        
        // Normalize fields
        transactions = transactions.map(tx => ({
            id: tx.ID || tx.id,
            member_name: tx.member_name || tx.MemberName || '',
            pool: tx.pool || tx.Pool,
            type: tx.type || tx.Type,
            amount: tx.amount || tx.Amount,
            reason: tx.Reason || tx.reason,
            created_at: tx.created_at || tx.CreatedAt,
            receipt_url: tx.receipt_url || tx.ReceiptURL || tx.receiptData
        }));
        
        const filters = window.adminTxFilters;
        
        // Apply filters
        let filtered = transactions.filter(tx => {
            if (filters.fund !== 'all' && tx.pool !== filters.fund) return false;
            if (filters.type !== 'all' && tx.type !== filters.type) return false;
            return true;
        });
        
        // Pagination
        const limit = 20;
        const page = window.adminTxPage;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedTransactions = filtered.slice(start, end);
        
        // Summary
        const totalIn = filtered.filter(t => t.type === 'credit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        const totalOut = filtered.filter(t => t.type === 'debit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        
        // Group by date (use paginated data)
        const grouped = {};
        paginatedTransactions.forEach(tx => {
            const date = new Date(tx.created_at);
            const today = new Date();
            today.setHours(0,0,0,0);
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            let dateKey = formatDate(tx.created_at);
            if (date.toDateString() === today.toDateString()) dateKey = 'Today';
            else if (date.toDateString() === yesterday.toDateString()) dateKey = 'Yesterday';
            
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(tx);
        });
        
        return `
            <div class="w-full min-w-0 mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">${Icons.clipboardList()}${t('transaction.familyMoneyHistory')}</h1>
                    <p class="text-xs sm:text-sm text-text-muted">All family transactions</p>
                </div>
                <a href="/admin/transactions/new" class="flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand px-4 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all select-none">${Icons.plus()} Record Payment</a>
            </div>
            
            <!-- Summary Bar -->
            <div class="w-full min-w-0 mb-4 grid grid-cols-3 gap-3">
                <div class="rounded-2xl bg-success/10 p-3 border border-success/20">
                    <p class="text-xs text-success font-medium">Money In</p>
                    <p class="text-lg font-bold text-success">+${formatCurrency(totalIn)}</p>
                </div>
                <div class="rounded-2xl bg-error/10 p-3 border border-error/20">
                    <p class="text-xs text-error font-medium">Money Out</p>
                    <p class="text-lg font-bold text-error">-${formatCurrency(totalOut)}</p>
                </div>
                <div class="rounded-2xl bg-brand/10 p-3 border border-brand/20">
                    <p class="text-xs text-brand font-medium">Net Balance</p>
                    <p class="text-lg font-bold text-brand">${formatCurrency(totalIn - totalOut)}</p>
                </div>
            </div>
            
            <!-- Filters -->
            <div class="w-full min-w-0 mb-4 flex flex-wrap gap-2">
                <button onclick="window.adminTxFilters={fund:'all',type:'all'};window.adminTxPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium rounded-lg ${filters.fund==='all' && filters.type==='all' ? 'bg-brand text-white' : 'bg-surface text-text-secondary border border-border'}">All</button>
                <button onclick="window.adminTxFilters.fund='pool1';window.adminTxPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium rounded-lg ${filters.fund==='pool1' ? 'bg-brand text-white' : 'bg-surface text-text-secondary border border-border'}">Family Savings</button>
                <button onclick="window.adminTxFilters.fund='pool2';window.adminTxPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium rounded-lg ${filters.fund==='pool2' ? 'bg-brand text-white' : 'bg-surface text-text-secondary border border-border'}">Personal Savings</button>
                <button onclick="window.adminTxFilters.type='credit';window.adminTxPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium rounded-lg ${filters.type==='credit' ? 'bg-success text-white' : 'bg-surface text-text-secondary border border-border'}">Money In</button>
                <button onclick="window.adminTxFilters.type='debit';window.adminTxPage=1;router.refresh()" class="px-3 py-2 text-xs font-medium rounded-lg ${filters.type==='debit' ? 'bg-error text-white' : 'bg-surface text-text-secondary border border-border'}">Money Out</button>
            </div>
            
            <!-- Transactions -->
            <div class="w-full min-w-0">
            ${filtered.length > 0 ? `
                <div class="space-y-6">
                    ${Object.entries(grouped).map(([dateKey, txs]) => `
                        <div>
                            <h3 class="text-sm font-semibold text-text-muted mb-3">${dateKey}</h3>
                            <div class="grid gap-3 grid-cols-1 md:grid-cols-2">
                                ${txs.map(tx => `
                                    <div class="rounded-2xl border border-border bg-surface p-4 hover:shadow-md transition-shadow">
                                        <div class="flex items-start gap-3">
                                            <div class="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${tx.type === 'credit' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                                ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-semibold text-text-primary">${tx.member_name}</p>
                                                <p class="text-xs text-text-muted mt-1">${cleanReason(tx.reason, tx.type)}</p>
                                                <div class="flex items-center gap-2 mt-2">
                                                    <span class="text-xs font-medium px-2 py-0.5 rounded-full ${tx.pool === 'pool1' ? 'bg-brand/10 text-brand' : 'bg-pool2/10 text-pool2'}">${tx.pool === 'pool1' ? 'Family Savings' : 'Personal Savings'}</span>
                                                </div>
                                            </div>
                                            <div class="text-right flex flex-col items-end gap-2">
                                                <p class="text-xl font-bold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}</p>
                                                <div class="flex items-center gap-2">
                                                    ${tx.receipt_url ? `<button onclick="showReceiptImage('${tx.receipt_url}')" class="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all" title="View Receipt">${Icons.fileText()}</button>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                ${renderPagination('adminTx', page, filtered.length, limit)}
            ` : `
                <div class="rounded-2xl border border-border bg-surface p-8 text-center">
                    <div class="mb-3 flex justify-center">${Icons.wallet()}</div>
                    <p class="text-sm font-medium text-text-primary">No transactions found</p>
                    <p class="text-xs text-text-muted mt-1">Record a payment to get started</p>
                </div>
            `}
            </div>
        `;
    },
    
    adminTransactionsNew: async () => {
        const dashboard = await store.loadDashboard();
        // all_members has all family members (excluding admin)
        const members = dashboard?.all_members || dashboard?.underfunded_members || [];
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
                            <select id="txn-member" class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface px-4 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                <option value="">Select a member</option>
                                ${members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                                <option value="other">Other member...</option>
                            </select>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.whichFund')} <span class="text-error">*</span></label>
                            <div class="flex rounded-2xl border border-border p-1 gap-2">
                                <button type="button" onclick="setFund('pool1')" id="fund-pool1" class="flex-1 rounded-lg py-3 text-sm font-medium bg-brand text-white select-none">${t('member.familySavings')}</button>
                                <button type="button" onclick="setFund('pool2')" id="fund-pool2" class="flex-1 rounded-lg py-3 text-sm font-medium text-text-secondary select-none">${t('member.personalSavings')}</button>
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.whatType')} <span class="text-error">*</span></label>
                            <div class="flex rounded-2xl border border-border p-1 gap-2">
                                <button type="button" onclick="setTxType('credit')" id="type-credit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium bg-success text-white select-none">${Icons.arrowUpRight()} ${t('table.moneyIn')}</button>
                                <button type="button" onclick="setTxType('debit')" id="type-debit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-text-secondary select-none">${Icons.arrowDownRight()} ${t('table.moneyOut')}</button>
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.howMuch')} <span class="text-error">*</span></label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                <input type="number" id="txn-amount" placeholder="0" class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface py-3 pl-8 pr-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.whatFor')} <span class="text-error">*</span></label>
                            <input type="text" id="txn-reason" placeholder="${t('transaction.whatForHelper')}" class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface px-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            <p class="text-xs text-text-muted">${t('transaction.whatForHelper')}</p>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('transaction.attachProof')}</label>
                            <div class="flex items-center gap-3">
                                <label class="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface-soft px-4 text-sm font-medium text-text-secondary hover:border-brand hover:text-brand transition-all select-none">
                                    ${Icons.paperclip()}
                                    <span id="receipt-label">Choose file</span>
                                    <input type="file" id="txn-receipt" accept="image/*,.pdf" class="hidden" onchange="document.getElementById('receipt-label').textContent = this.files[0]?.name || 'Choose file'">
                                </label>
                                <span class="text-xs text-text-muted">Photo or PDF</span>
                            </div>
                        </div>
                        
                        <button type="submit" id="txn-btn" class="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 font-semibold text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/35 active:scale-[0.98] transition-all select-none">
                            ${Icons.check()} ${t('transaction.recordBtn')}
                        </button>
                    </form>
                ` })}
            </div>
        `;
    },
    
    memberSettings: async () => {
        const name = store.user?.name || 'Member';
        const profile = await store.loadProfile();
        const p = profile || store.user || {};
        return `
            <div class="w-full min-w-0">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-text-primary">${t('nav.settings')}</h1>
                    <p class="text-sm text-text-muted mt-1">Manage your account</p>
                </div>
                
                <!-- Profile -->
                <div class="w-full min-w-0 mb-5 rounded-2xl border border-border bg-surface p-5">
                    <div class="flex items-center gap-4">
                        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white text-xl font-bold shadow-lg shadow-brand/30">
                            ${name.charAt(0)}
                        </div>
                        <div>
                            <p class="text-lg font-bold">${name}</p>
                            <p class="text-sm text-text-muted">${p.start_date ? 'Started: ' + formatDate(p.start_date) : t('settings.contactManager')}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Savings Settings -->
                <div class="w-full min-w-0 mb-5 rounded-2xl border border-border bg-surface p-5">
                    <h2 class="mb-4 text-sm font-bold uppercase tracking-wider text-text-muted">${t('settings.savingsSettings')}</h2>
                    <form onsubmit="handleUpdateSettings(event)" class="space-y-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('settings.savingsInterval')}</label>
                            <div class="flex rounded-2xl border border-border p-1 gap-2">
                                <button type="button" onclick="setSettingsInterval('weekly')" id="interval-weekly" class="flex-1 rounded-lg py-3 text-sm font-medium ${p.interval === 'weekly' ? 'bg-brand text-white' : 'text-text-secondary'} select-none">
                                    ${t('register.everyWeek')}
                                </button>
                                <button type="button" onclick="setSettingsInterval('monthly')" id="interval-monthly" class="flex-1 rounded-lg py-3 text-sm font-medium ${p.interval === 'monthly' ? 'bg-brand text-white' : 'text-text-secondary'} select-none">
                                    ${t('register.everyMonth')}
                                </button>
                            </div>
                            <input type="hidden" id="settings-interval" value="${p.interval || 'monthly'}">
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('settings.committedAmount')}</label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">₦</span>
                                <input type="number" id="settings-amount" value="${p.committed_amount || ''}" placeholder="0"
                                    class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface pl-10 pr-4 text-base font-medium focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            </div>
                            <p class="text-xs text-text-muted">${t('settings.committedAmountHelper')}</p>
                        </div>
                        
                        <button type="submit" id="settings-btn" class="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-base font-semibold text-white shadow-lg shadow-brand/25 select-none">
                            ${Icons.save()} ${t('common.save')}
                        </button>
                    </form>
                </div>
                
                <!-- Change Password -->
                <div class="w-full min-w-0 mb-5 rounded-2xl border border-border bg-surface p-5">
                    <h2 class="mb-4 text-sm font-bold uppercase tracking-wider text-text-muted">${t('settings.changePassword')}</h2>
                    <form onsubmit="handleChangePassword(event)" class="space-y-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('settings.currentPassword')}</label>
                            <input type="password" id="settings-current-pw" placeholder="${t('settings.currentPassword')}"
                                class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface px-4 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('settings.newPassword')}</label>
                            <input type="password" id="settings-new-pw" placeholder="${t('settings.newPassword')}"
                                class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface px-4 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-text-primary">${t('settings.confirmNew')}</label>
                            <input type="password" id="settings-confirm-pw" placeholder="${t('settings.confirmNew')}"
                                class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface px-4 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                        <button type="submit" id="password-btn" class="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-brand text-base font-semibold text-brand select-none">
                            ${Icons.lock()} ${t('settings.changePassword')}
                        </button>
                    </form>
                </div>
                
                <!-- Install App -->
                <div class="w-full min-w-0 mb-5 rounded-2xl border border-border bg-surface p-5">
                    <h2 class="mb-4 text-sm font-bold uppercase tracking-wider text-text-muted">${t('settings.installApp')}</h2>
                    <button onclick="installApp()" class="flex w-full items-center gap-4 rounded-2xl bg-brand-light p-4 text-base font-bold text-brand select-none">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        ${t('settings.install')}
                    </button>
                    <p class="mt-3 text-sm text-text-muted">${t('settings.installPrompt')}</p>
                </div>
                
                <!-- Language -->
                <div class="w-full min-w-0 rounded-2xl border border-border bg-surface p-5">
                    <h2 class="mb-4 text-sm font-bold uppercase tracking-wider text-text-muted">${t('settings.language')}</h2>
                    <button onclick="openLangModal()" class="flex w-full items-center gap-4 rounded-2xl bg-surface-soft p-4 text-base font-semibold text-text-primary select-none">
                        ${Icons.globe()}
                        ${getCurrentLangName()}
                    </button>
                </div>
            </div>
        `;
    },
    
    adminCareFund: async () => {
        window.careFundPage = window.careFundPage || 1;
        const limit = 10;
        const page = window.careFundPage;
        
        const allRequests = await store.loadCareFundRequests();
        const requests = allRequests || store.careFundRequests || [];
        
        // Normalize field names and filter by status
        const pending = requests.filter(r => {
            const status = r.Status || r.status || '';
            return status === 'pending' || status === 'Pending';
        });
        const accepted = requests.filter(r => {
            const status = r.Status || r.status || '';
            return status === 'approved' || status === 'accepted';
        });
        const rejected = requests.filter(r => {
            const status = r.Status || r.status || '';
            return status === 'rejected';
        });
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
        
        let allRequestsToShow = pending;
        if (activeTab === 'accepted') allRequestsToShow = accepted;
        if (activeTab === 'rejected') allRequestsToShow = rejected;
        
        // Paginate
        const start = (page - 1) * limit;
        const end = start + limit;
        const requestsToShow = allRequestsToShow.slice(start, end);
        
        return `
            <div class="w-full min-w-0 mb-6">
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.heartHandshake()}
                    ${t('nav.helpRequests')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">Review and respond to withdrawal requests</p>
            </div>
            
            <div class="w-full min-w-0 mb-4 flex gap-1 rounded-2xl border border-border bg-surface p-1">
                ${tabBtn('pending', t('careFund.pending'), pending.length)}
                ${tabBtn('accepted', t('careFund.accepted'), accepted.length)}
                ${tabBtn('rejected', t('careFund.notApproved'), rejected.length)}
            </div>
            
            <div class="w-full min-w-0 space-y-3">
                ${requestsToShow.length > 0 ? requestsToShow.map(r => {
                    const occasion = r.Occasion || r.occasion;
                    const memberName = r.MemberName || r.member_name || 'Member';
                    const amount = r.Amount || r.amount;
                    const eventDate = r.EventDate || r.event_date || r.CreatedAt || r.created_at;
                    const desc = r.Description || r.description;
                    const reqId = r.ID || r.id;
                    const status = r.Status || r.status;
                    
                    return `
                    <div id="request-card-${reqId}" class="w-full min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-sm hover:shadow-md transition-all">
                        <div class="flex items-start gap-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand flex-shrink-0">
                                ${occasionIcons[occasion] ? occasionIcons[occasion]() : Icons.helpCircle()}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="min-w-0">
                                        <h3 class="font-semibold text-text-primary truncate">${memberName}</h3>
                                        <p class="text-xs text-text-muted flex items-center gap-1">
                                            ${occasion ? (t('occasions.' + occasion) || occasion) : 'Request'} • ${eventDate ? formatDate(eventDate) : ''}
                                        </p>
                                    </div>
                                    <div class="text-right flex-shrink-0">
                                        <p class="font-bold text-text-primary">${formatCurrency(amount)}</p>
                                        ${StatusBadge({ status: status })}
                                    </div>
                                </div>
                                ${desc ? `<p class="text-xs text-text-muted mt-1 truncate">${desc}</p>` : ''}
                            </div>
                        </div>
                        ${activeTab === 'pending' ? `
                        <div class="flex gap-2 mt-3">
                            <button onclick="acceptRequest('${reqId}')" class="flex-1 flex items-center justify-center gap-1 rounded-lg bg-success px-3 py-2 text-xs font-medium text-white transition-colors active:bg-success/90 select-none">
                                ${Icons.check()} Accept
                            </button>
                            <button onclick="showDeclineForm('${reqId}')" class="flex-1 flex items-center justify-center gap-1 rounded-lg border border-error px-3 py-2 text-xs font-medium text-error transition-colors active:bg-error/5 select-none">
                                ${Icons.x()} Decline
                            </button>
                        </div>
                        ` : ''}
                    </div>
                `}).join('') : EmptyState({ icon: Icons.heartHandshake(), message: activeTab === 'pending' ? 'No pending requests' : activeTab === 'accepted' ? 'No accepted requests yet' : 'No declined requests' })}
            </div>
            ${renderPagination('careFund', page, allRequestsToShow.length, limit)}
        `;
    },
    
    adminMembers: async () => {
        window.adminMembersPage = window.adminMembersPage || 1;
        const limit = 12;
        const page = window.adminMembersPage;
        
        const dashboard = await store.loadDashboard();
        const memberCount = dashboard?.member_count || 0;
        const allMembers = await store.loadAllMembers();
        
        // Paginate
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedMembers = allMembers.slice(start, end);
        
        return `
        <div class="w-full min-w-0 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.users()}
                    ${t('nav.familyMembers')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">${memberCount} family members</p>
            </div>
            <button onclick="showAddMemberModal()" class="flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand px-4 font-semibold text-white shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 transition-all select-none sm:w-auto">
                ${Icons.userPlus()}
                <span>${t('members.addMember')}</span>
            </button>
        </div>
        
        <div class="w-full min-w-0 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            ${paginatedMembers.map(m => `
                <div class="w-full min-w-0 rounded-2xl border border-border bg-surface p-5 shadow-sm hover:shadow-lg hover:shadow-brand/5 transition-all group">
                    <div class="mb-4 flex items-center gap-3">
                        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-xl font-bold text-brand flex-shrink-0 group-hover:scale-110 transition-transform">
                            ${m.name?.charAt(0) || '?'}
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-bold text-text-primary truncate text-base">${m.name}</h3>
                            <p class="text-xs text-text-muted flex items-center gap-1">
                                ${m.interval === 'weekly' ? 'Weekly' : 'Monthly'} • ${formatCurrency(m.committed_amount)}
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 space-y-2 rounded-2xl bg-surface-soft p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-text-muted">Status</span>
                            <span class="font-bold ${m.status === 'active' ? 'text-success' : 'text-error'}">${m.status === 'active' ? 'Up to date' : 'Behind'}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-text-muted">Started</span>
                            <span class="text-xs font-medium">${m.start_date ? formatDate(m.start_date) : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            `).join('') || `
                <div class="col-span-full text-center py-12">
                    <p class="text-sm text-text-muted">No members found</p>
                </div>
            `}
        </div>
        ${renderPagination('adminMembers', page, allMembers.length, limit)}
        
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
                        <input type="text" id="new-member-name" class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface px-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.password')} <span class="text-error">*</span></label>
                        <input type="password" id="new-member-password" class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface px-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">How often will they save?</label>
                        <div class="flex rounded-2xl border border-border p-1 gap-1">
                            <button type="button" onclick="setNewMemberInterval('weekly')" id="interval-weekly-btn" class="flex-1 rounded-lg py-2 text-sm font-medium select-none">Every Week</button>
                            <button type="button" onclick="setNewMemberInterval('monthly')" id="interval-monthly-btn" class="flex-1 rounded-lg py-2 text-sm font-medium select-none bg-brand text-white">Every Month</button>
                        </div>
                        <input type="hidden" id="new-member-interval" value="monthly">
                    </div>
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.howMuchEach')}</label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">₦</span>
                            <input type="number" id="new-member-amount" placeholder="0" class="h-[52px] w-full min-w-0 rounded-2xl border border-border bg-surface py-3 pl-8 pr-4 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="button" onclick="closeAddMemberModal()" class="flex h-12 flex-1 items-center justify-center rounded-2xl border border-border font-medium select-none">${t('common.cancel')}</button>
                        <button type="submit" class="flex h-12 flex-1 items-center justify-center rounded-2xl bg-brand font-medium text-white select-none">${t('members.addMember')}</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    },
    
    notifications: async () => {
        window.notifPage = window.notifPage || 1;
        const limit = 20;
        const page = window.notifPage;
        
        const allNotifications = await store.loadNotifications().catch(e => {
            console.warn('notifications load failed:', e);
            return [];
        });
        
        // Paginate
        const start = (page - 1) * limit;
        const end = start + limit;
        const notifications = allNotifications.slice(start, end);
        
        const unread = (notifications || []).filter(n => !n.read);
        const read = (notifications || []).filter(n => n.read);
        
        function item(n, isUnread) {
            return `
                <button onclick="${isUnread ? `handleMarkRead('${n.id}')` : ''}" class="w-full text-left flex items-start gap-4 p-4 rounded-2xl ${isUnread ? 'bg-brand-light/50 border border-brand/30' : 'bg-surface-soft border border-transparent'} hover:shadow-md transition-all select-none">
                    <div class="flex-shrink-0 mt-1">
                        <div class="flex h-10 w-10 items-center justify-center rounded-2xl ${isUnread ? 'bg-brand text-white shadow-md shadow-brand/30' : 'bg-surface-raised text-text-muted'}">
                            ${Icons.bell()}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[15px] ${isUnread ? 'font-semibold text-text-primary' : 'text-text-secondary'} leading-relaxed">${n.message}</p>
                        <p class="mt-2 text-xs text-text-muted">${timeAgo(n.created_at)}</p>
                    </div>
                    ${isUnread ? `
                        <div class="flex-shrink-0 mt-1">
                            <span class="flex h-3 w-3 rounded-full bg-brand"></span>
                        </div>
                    ` : ''}
                </button>
            `;
        }
        
        return `
            <div class="w-full min-w-0 px-4">
                <div class="mb-6 flex items-center justify-between">
                    <div>
                        <h1 class="text-xl font-bold text-text-primary">${t('nav.notifications')}</h1>
                        <p class="text-sm text-text-muted mt-0.5">${unread.length > 0 ? unread.length + ' unread' : t('common.allCaughtUp')}</p>
                    </div>
                    ${unread.length > 0 ? `
                        <button onclick="handleMarkAllRead()" class="h-10 px-4 rounded-2xl bg-brand text-white text-sm font-semibold shadow-md shadow-brand/25 select-none">
                            ${t('common.markAllRead')}
                        </button>
                    ` : ''}
                </div>
                
                ${allNotifications.length === 0 ? `
                    <div class="flex flex-col items-center justify-center py-20">
                        <div class="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-soft text-3xl">
                            ${Icons.bell()}
                        </div>
                        <h3 class="text-lg font-semibold text-text-primary mb-1">${t('common.allCaughtUp')}</h3>
                        <p class="text-sm text-text-muted">${t('common.noNewNotifications')}</p>
                    </div>
                ` : `
                    <div class="space-y-3">
                        ${notifications.map(n => item(n, !n.read)).join('')}
                    </div>
                    ${renderPagination('notif', page, allNotifications.length, limit)}
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
            <a href="/" class="flex h-12 items-center justify-center rounded-2xl bg-brand px-6 font-medium text-white hover:bg-brand-hover active:bg-brand-hover">
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
            <button onclick="location.reload()" class="flex h-12 items-center justify-center rounded-2xl bg-brand px-6 font-medium text-white hover:bg-brand-hover active:bg-brand-hover">
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
        let msg = err.message || 'errors.wrongPassword';
        // Check if it's a translation key
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
            if (!msg || msg === 'Request failed') {
                msg = t('errors.wrongPassword');
            }
        }
        errorEl.querySelector('span:last-child').textContent = msg;
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
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
    }).finally(() => {
        btn.disabled = false;
        btn.innerHTML = Icons.userPlus() + ' ' + t('auth.createAccount');
    });
}

async function handleAdminLogin(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('admin-error');
    const successEl = document.getElementById('admin-success');
    const btn = e.target.querySelector('button[type="submit"]');
    
    errorEl.classList.add('hidden');
    successEl.classList.add('hidden');
    
    if (!password) {
        errorEl.querySelector('span:last-child').textContent = 'Password is required';
        errorEl.classList.remove('hidden');
        return;
    }
    
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> Signing in...';
    }
    
    try {
        await store.adminLogin(password);
        successEl.querySelector('span:last-child').textContent = 'Login successful! Redirecting...';
        successEl.classList.remove('hidden');
        await new Promise(r => setTimeout(r, 300));
        router.navigate('/admin/dashboard');
    } catch(err) {
        let msg = err.message || 'Wrong password. Please try again.';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
            if (!msg || msg === 'Request failed' || msg === 'Network Error') {
                msg = 'Wrong password. Please try again.';
            }
        }
        errorEl.querySelector('span:last-child').textContent = msg;
        errorEl.classList.remove('hidden');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `${Icons.shield()} Sign In as Manager`;
        }
    }
}

function handleMarkAllRead() {
    store.markAllRead();
    // Update UI immediately - no waiting
    router.refresh();
}

function handleMarkRead(id) {
    store.markRead(id);
    // Update UI immediately - no waiting
    router.refresh();
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
    
    if (!receiptFile) {
        showToast('Receipt is required before recording a payment', 'error');
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
function setNewMemberInterval(interval) {
    document.getElementById('new-member-interval').value = interval;
    document.getElementById('interval-weekly-btn').className = interval === 'weekly' ? 'flex-1 rounded-lg py-2 text-sm font-medium select-none bg-brand text-white' : 'flex-1 rounded-lg py-2 text-sm font-medium select-none';
    document.getElementById('interval-monthly-btn').className = interval === 'monthly' ? 'flex-1 rounded-lg py-2 text-sm font-medium select-none bg-brand text-white' : 'flex-1 rounded-lg py-2 text-sm font-medium select-none';
}

async function handleAddMember(e) {
    e.preventDefault();
    const name = document.getElementById('new-member-name')?.value;
    const password = document.getElementById('new-member-password')?.value;
    const amount = document.getElementById('new-member-amount')?.value;
    const interval = document.getElementById('new-member-interval')?.value || 'monthly';
    const btn = e.target.querySelector('button[type="submit"]');
    
    if (!name || !password) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    if (!amount || parseInt(amount) <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ';
    
    try {
        await store.createMember({
            name,
            password,
            interval: interval,
            committed_amount: parseInt(amount),
            start_date: new Date().toISOString().split('T')[0]
        });
        showToast(t('common.success'), 'success');
        closeAddMemberModal();
        router.refresh();
    } catch (err) {
        let msg = err.message || t('common.error');
        if (msg.includes('.')) {
            msg = t(msg) || t('common.error');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = t('members.addMember');
    }
}

// Member - Submit Care Fund Request
 async function handleCareFundRequest(e) {
    e.preventDefault();
    const amount = document.getElementById('care-amount')?.value;
    const btn = document.getElementById('care-btn');
    
    if (!amount || parseInt(amount) <= 0) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    // Check if member has enough balance in personal savings - calculate from transactions if needed
    let balance = 0;
    const dashboard = await store.loadDashboard();
    if (dashboard?.my_pool2_contributions && dashboard.my_pool2_contributions !== '0') {
        balance = parseFloat(dashboard.my_pool2_contributions);
    } else {
        const txns = await store.loadTransactions({ pool: 'pool2' });
        const txArray = Array.isArray(txns) ? txns : (txns?.data || []);
        const credits = txArray.filter(t => t.type === 'credit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        const debits = txArray.filter(t => t.type === 'debit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        balance = credits - debits;
    }
    const requested = parseInt(amount);
    
    if (requested > balance) {
        showToast('Not enough money in your personal savings. You have ' + formatCurrency(balance), 'error');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ' + t('common.loading');
    
    try {
        await store.submitCareFundRequest({
            amount: String(parseInt(amount)),
            occasion: 'other',
            event_date: new Date().toISOString().split('T')[0],
            description: ''
        });
        showToast(t('common.success'), 'success');
        router.refresh();
    } catch (err) {
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = Icons.heartHandshake() + ' ' + t('careFund.sendRequest');
    }
}

// Admin - Accept Care Fund Request
async function acceptRequest(id) {
    try {
        await store.updateCareFundRequest(id, 'approved');
        showToast(t('careFund.accepted'), 'success');
        router.refresh();
    } catch (err) {
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
    }
}

// Admin - Decline Care Fund Request
window.decliningRequestId = null;

function showDeclineForm(id) {
    window.decliningRequestId = id;
    const card = document.getElementById(`request-card-${id}`);
    if (card) {
        card.innerHTML += `
            <div id="decline-form-${id}" class="mt-3 rounded-2xl bg-error/5 border border-error/20 p-4">
                <p class="text-sm font-medium text-text-primary mb-2">Reason for declining:</p>
                <textarea id="decline-reason-${id}" rows="3" class="w-full rounded-lg border border-border bg-surface p-3 text-sm focus:border-brand focus:outline-none" placeholder="Enter reason..."></textarea>
                <div class="mt-3 flex gap-2">
                    <button onclick="submitDecline('${id}')" class="flex-1 rounded-lg bg-error py-2 text-sm font-medium text-white">Confirm Decline</button>
                    <button onclick="cancelDecline('${id}')" class="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-text-secondary">Cancel</button>
                </div>
            </div>
        `;
    }
}

function cancelDecline(id) {
    window.decliningRequestId = null;
    const form = document.getElementById(`decline-form-${id}`);
    if (form) form.remove();
}

async function submitDecline(id) {
    const reasonEl = document.getElementById(`decline-reason-${id}`);
    const reason = reasonEl?.value?.trim();
    if (!reason) {
        showToast('Please enter a reason', 'error');
        return;
    }
    
    try {
        await store.updateCareFundRequest(id, 'rejected', reason);
        showToast('Request declined', 'info');
        window.decliningRequestId = null;
        router.refresh();
    } catch (err) {
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
    }
}

async function declineRequest(id) {
    showDeclineForm(id);
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
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
    }
}

// Member - Pool Transfer
async function handlePoolTransfer() {
    const amount = prompt(t('transaction.howMuch') || 'How much to transfer?');
    if (!amount || isNaN(amount)) return;
    
    try {
        await store.transferPool(parseInt(amount));
        showToast(t('common.success'), 'success');
        router.refresh();
    } catch (err) {
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
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
    
    // Check if member has enough balance - calculate from transactions if needed
    let balance = 0;
    const dashboard = await store.loadDashboard();
    if (dashboard?.my_pool2_contributions && dashboard.my_pool2_contributions !== '0') {
        balance = parseFloat(dashboard.my_pool2_contributions);
    } else {
        const txns = await store.loadTransactions({ pool: 'pool2' });
        const txArray = Array.isArray(txns) ? txns : (txns?.data || []);
        const credits = txArray.filter(t => t.type === 'credit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        const debits = txArray.filter(t => t.type === 'debit').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        balance = credits - debits;
    }
    const requested = parseInt(amount);
    
    if (requested > balance) {
        showToast('Not enough money. You have ' + formatCurrency(balance) + ' available', 'error');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ' + t('common.loading');
    
    try {
        const result = await store.transferPool(parseInt(amount));
        
        // New format: receipt_id and receipt_number returned directly
        if (result.receipt_id) {
            const receiptData = {
                id: result.receipt_id,
                receipt_number: result.receipt_number,
                amount: amount,
                created_at: new Date().toISOString()
            };
            localStorage.setItem('last_receipt_data', JSON.stringify(receiptData));
            showTransferReceiptModal(receiptData, result.pool2_balance, result.pool1_contribution);
            // Reload transactions so the new transfer appears in history
            await store.loadTransactions();
            router.refresh();
        } else if (result.transaction_id) {
            // Old format fallback
            try {
                const receipt = await store.getReceipt(result.transaction_id);
                localStorage.setItem('last_receipt_data', JSON.stringify(receipt));
                showTransferReceiptModal(receipt, result.pool2_balance, result.pool1_contribution);
                await store.loadTransactions();
                router.refresh();
            } catch (receiptErr) {
                console.error('Failed to fetch receipt:', receiptErr);
                showToast(t('common.success') + ' (Receipt unavailable)', 'success');
                router.refresh();
            }
        } else {
            showToast(t('common.success'), 'success');
            await store.loadTransactions();
            router.refresh();
        }
    } catch (err) {
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
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

// Settings - Set interval
function setSettingsInterval(interval) {
    document.getElementById('settings-interval').value = interval;
    const weeklyBtn = document.getElementById('interval-weekly');
    const monthlyBtn = document.getElementById('interval-monthly');
    if (interval === 'weekly') {
        weeklyBtn.classList.add('bg-brand', 'text-white');
        weeklyBtn.classList.remove('text-text-secondary');
        monthlyBtn.classList.remove('bg-brand', 'text-white');
        monthlyBtn.classList.add('text-text-secondary');
    } else {
        monthlyBtn.classList.add('bg-brand', 'text-white');
        monthlyBtn.classList.remove('text-text-secondary');
        weeklyBtn.classList.remove('bg-brand', 'text-white');
        weeklyBtn.classList.add('text-text-secondary');
    }
}

// Settings - Update savings settings
async function handleUpdateSettings(e) {
    e.preventDefault();
    const interval = document.getElementById('settings-interval')?.value;
    const amount = document.getElementById('settings-amount')?.value;
    const btn = document.getElementById('settings-btn');
    
    if (!interval) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    if (!amount || parseInt(amount) <= 0) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<div class="loader !w-5 !h-5 !border-2"></div> ' + t('common.loading');
    
    try {
        await store.updateProfile({ interval, committed_amount: parseInt(amount) });
        showToast(t('common.success'), 'success');
    } catch (err) {
        let msg = err.message || 'errors.tryAgain';
        if (msg.includes('.')) {
            msg = t(msg) || t('errors.tryAgain');
        } else {
            msg = msg.replace(/[{}"\[\]]/g, '').trim();
        }
        showToast(msg, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = Icons.save() + ' ' + t('common.save');
    }
}

// Receipt Modal
function showReceiptModal(url) {
    const modal = document.getElementById('receipt-modal');
    const img = document.getElementById('receipt-image');
    if (modal && img) {
        img.src = url;
        modal.classList.remove('hidden');
        // Trigger animation
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('.transform')?.classList.remove('scale-95');
        }, 10);
        document.body.classList.add('overflow-hidden');
        lucide.createIcons();
    }
}

function closeReceiptModal() {
    const modal = document.getElementById('receipt-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        modal.querySelector('.transform')?.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 200);
    }
}

function showReceiptImage(url) {
    const modal = document.getElementById('receipt-modal');
    if (!modal) return;
    
    modal.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/50" onclick="closeReceiptModal()"></div>
            <div class="relative w-full max-w-lg rounded-2xl bg-surface shadow-2xl transform transition-all scale-95 opacity-0" id="receipt-image-content">
                <div class="flex items-center justify-between border-b border-border p-4">
                    <h2 class="text-lg font-bold text-text-primary">Payment Receipt</h2>
                    <button onclick="closeReceiptModal()" class="rounded-lg p-2 hover:bg-surface-soft">
                        ${Icons.x()}
                    </button>
                </div>
                <div class="p-4">
                    <img src="${url}" alt="Receipt" class="w-full rounded-lg" onerror="this.parentElement.innerHTML='<div class=\\'text-center p-8\\'><p class=\\'text-text-muted\\'>Could not load receipt image</p></div>'">
                    <a href="${url}" target="_blank" download class="mt-4 flex items-center justify-center gap-2 h-12 rounded-2xl bg-brand text-white font-semibold hover:bg-brand-hover transition-colors">
                        ${Icons.download()}
                        Open Full Image
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('#receipt-image-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();
}

// Transfer Receipt Modal
async function showTransferReceiptModal(receipt, newPool2Balance, newPool1Balance) {
    const modal = document.getElementById('transfer-receipt-modal');
    if (!modal) return;
    
    const user = store.user;
    const memberName = user?.name || 'Member';
    const amount = receipt?.amount || receipt?.Amount || '0';
    const date = receipt?.created_at ? new Date(receipt.created_at).toLocaleString() : new Date().toLocaleString();
    const receiptNumber = receipt?.receipt_number || receipt?.ReceiptNumber || receipt?.id || '';
    
    modal.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/50" onclick="closeTransferReceiptModal()"></div>
            <div class="relative w-full max-w-md rounded-2xl bg-surface shadow-2xl transform transition-all scale-95 opacity-0" id="transfer-receipt-content">
                <div class="flex items-center justify-between border-b border-border p-5">
                    <h2 class="text-xl font-bold text-text-primary">Transfer Receipt</h2>
                    <button onclick="closeTransferReceiptModal()" class="rounded-lg p-2 hover:bg-surface-soft">
                        ${Icons.x()}
                    </button>
                </div>
                <div class="p-6 space-y-4">
                    <div class="text-center pb-4 border-b border-border">
                        <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-3">
                            ${Icons.checkCircle()}
                        </div>
                        <p class="text-success font-bold text-lg">Transfer Successful!</p>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-text-muted">Member</span>
                            <span class="font-semibold text-text-primary">${memberName}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-text-muted">Amount</span>
                            <span class="font-bold text-brand">₦${parseFloat(amount).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-text-muted">From</span>
                            <span class="text-text-primary">Personal Savings (Pool 2)</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-text-muted">To</span>
                            <span class="text-text-primary">Family Savings (Pool 1)</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-text-muted">Date</span>
                            <span class="text-text-primary">${date}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-text-muted">Receipt No.</span>
                            <span class="text-text-primary text-sm font-mono font-bold">${receiptNumber}</span>
                        </div>
                    </div>
                    
                    <div class="bg-surface-soft rounded-2xl p-4 space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="text-text-muted">New Personal Savings</span>
                            <span class="font-bold text-text-primary">₦${parseFloat(newPool2Balance || 0).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-text-muted">New Family Savings</span>
                            <span class="font-bold text-text-primary">₦${parseFloat(newPool1Balance || 0).toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div class="flex gap-2 pt-2">
                        <button onclick="downloadReceiptFromModal()" class="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl bg-brand text-white font-semibold hover:bg-brand-hover transition-colors">
                            ${Icons.download()}
                            Download
                        </button>
                        <button onclick="copyReceiptNumber('${receiptNumber}')" class="flex items-center justify-center gap-2 h-12 px-4 rounded-2xl bg-surface-soft border border-border font-semibold hover:bg-surface-raised transition-colors">
                            ${Icons.copy()}
                        </button>
                        <button onclick="closeTransferReceiptModal()" class="flex items-center justify-center gap-2 h-12 px-4 rounded-2xl border-2 border-border font-semibold hover:bg-surface-soft transition-colors">
                            ${Icons.x()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('#transfer-receipt-content').classList.remove('scale-95', 'opacity-0');
    }, 10);
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();
}

function copyReceiptNumber(number) {
    navigator.clipboard.writeText(number).then(() => {
        showToast('Receipt number copied!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

function closeTransferReceiptModal() {
    const modal = document.getElementById('transfer-receipt-modal');
    const content = modal?.querySelector('#transfer-receipt-content');
    if (modal && content) {
        content.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            store.loadDashboard();
            store.loadTransactions();
        }, 200);
    }
}

function downloadTransferReceipt(receiptNumber, amount, memberName) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 600, 400);
    
    // Border
    ctx.strokeStyle = '#0D9488';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 580, 380);
    
    // Header
    ctx.fillStyle = '#0D9488';
    ctx.fillRect(10, 10, 580, 60);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TRANSFER RECEIPT', 300, 50);
    
    // Checkmark
    ctx.beginPath();
    ctx.arc(300, 120, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#059669';
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('✓', 300, 132);
    
    // Success text
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Transfer Successful!', 300, 175);
    
    // Details
    ctx.fillStyle = '#333333';
    ctx.font = '14px Arial';
    const details = [
        ['Receipt Number:', receiptNumber || 'N/A'],
        ['Member:', memberName || 'Member'],
        ['Amount:', '₦' + parseFloat(amount || 0).toLocaleString()],
        ['From:', 'Personal Savings (Pool 2)'],
        ['To:', 'Family Savings (Pool 1)'],
        ['Date:', new Date().toLocaleDateString()],
        ['Time:', new Date().toLocaleTimeString()]
    ];
    
    let y = 210;
    details.forEach(([label, value]) => {
        ctx.fillStyle = '#666666';
        ctx.textAlign = 'left';
        ctx.fillText(label, 100, y);
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value, 500, y);
        y += 25;
    });
    
    // Footer
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Odelade Family Ledger', 300, 375);
    
    // Download
    const link = document.createElement('a');
    link.download = `Receipt-${receiptNumber || 'transfer'}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function downloadReceiptFromModal() {
    const modal = document.getElementById('transfer-receipt-modal');
    const receiptNo = modal?.querySelector('.font-mono.font-bold')?.textContent || 'RCP';
    const amount = modal?.querySelector('.text-brand.font-bold')?.textContent?.replace(/[₦,]/g, '') || '0';
    const member = store.user?.name || 'Member';
    downloadTransferReceipt(receiptNo, amount, member);
}

function showTransferReceiptData(transactionId, receiptData) {
    const rawData = decodeURIComponent(receiptData);
    const modal = document.getElementById('receipt-modal');
    
    // Parse receipt data
    let amount = '0';
    let fromFund = 'Personal Savings';
    let toFund = 'Family Savings';
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Parse the text format: "Transfer Receipt: Amount 150 transferred from pool2 to pool1. Transaction ID: ..., Date: ..."
    const amountMatch = rawData.match(/Amount (\d+)/);
    if (amountMatch) amount = amountMatch[1];
    
    if (rawData.includes('pool2 to pool1') || rawData.includes('pool2 to pool1')) {
        fromFund = 'Personal Savings';
        toFund = 'Family Savings';
    } else if (rawData.includes('pool1 to pool2')) {
        fromFund = 'Family Savings';
        toFund = 'Personal Savings';
    }
    
    const dateMatch = rawData.match(/Date: ([^,]+)/);
    if (dateMatch) {
        const d = new Date(dateMatch[1]);
        date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
    
    const refId = transactionId ? transactionId.slice(0, 8) : 'N/A';
    
    if (modal) {
        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/60" onclick="closeReceiptModal()"></div>
                <div class="relative w-full max-w-sm rounded-2xl bg-surface shadow-2xl overflow-hidden">
                    <!-- Header -->
                    <div class="bg-brand px-6 py-4 text-center">
                        <p class="text-white font-bold text-lg">Transfer Receipt</p>
                    </div>
                    
                    <!-- Body -->
                    <div class="p-6 space-y-4">
                        <div class="text-center pb-4 border-b border-border">
                            <p class="text-3xl font-bold text-brand">₦${parseInt(amount).toLocaleString()}</p>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-text-muted text-sm">From</span>
                                <span class="text-text-primary font-medium">${fromFund}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-text-muted text-sm">To</span>
                                <span class="text-text-primary font-medium">${toFund}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-text-muted text-sm">Date</span>
                                <span class="text-text-primary">${date}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-text-muted text-sm">Time</span>
                                <span class="text-text-primary">${time}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-text-muted text-sm">Reference</span>
                                <span class="text-text-primary font-mono text-sm">${refId}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="flex gap-3 p-4 border-t border-border bg-surface-soft">
                        <button onclick="downloadReceiptData('${transactionId}', '${encodeURIComponent(rawData)}')" class="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl bg-brand text-white font-semibold hover:bg-brand-hover">
                            ${Icons.download()} Download
                        </button>
                        <button onclick="closeReceiptModal()" class="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border-2 border-border font-semibold hover:bg-surface">
                            ${Icons.x()} Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
        document.body.classList.add('overflow-hidden');
        lucide.createIcons();
    }
}

function downloadReceiptData(transactionId, receiptData) {
    const data = decodeURIComponent(receiptData);
    const refId = transactionId ? transactionId.slice(0, 8) : 'receipt';
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${refId}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Infinite Scroll Pagination
const infiniteScroll = {
    observers: {},
    
    init(pageKey, fetchFn, options = {}) {
        const { containerId = 'infinite-scroll-container', loaderId = 'infinite-scroll-loader', threshold = 100 } = options;
        
        // Clean up existing observer
        if (this.observers[pageKey]) {
            this.observers[pageKey].disconnect();
        }
        
        // Reset page state
        window[`${pageKey}Offset`] = 0;
        window[`${pageKey}Loading`] = false;
        window[`${pageKey}HasMore`] = true;
        window[`${pageKey}Data`] = [];
        
        const container = document.getElementById(containerId);
        const loader = document.getElementById(loaderId);
        
        if (!container) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !window[`${pageKey}Loading`] && window[`${pageKey}HasMore`]) {
                    this.loadMore(pageKey, fetchFn, options);
                }
            });
        }, { rootMargin: `${threshold}px` });
        
        if (loader) {
            observer.observe(loader);
        }
        
        this.observers[pageKey] = observer;
    },
    
    async loadMore(pageKey, fetchFn, options) {
        if (window[`${pageKey}Loading`] || !window[`${pageKey}HasMore`]) return;
        
        window[`${pageKey}Loading`] = true;
        const loader = document.getElementById('infinite-scroll-loader');
        const endMessage = document.getElementById('infinite-scroll-end');
        
        if (loader) loader.classList.remove('hidden');
        if (endMessage) endMessage.classList.add('hidden');
        
        try {
            const offset = window[`${pageKey}Offset`] || 0;
            const newData = await fetchFn(offset);
            
            if (!newData || newData.length === 0) {
                window[`${pageKey}HasMore`] = false;
            } else {
                window[`${pageKey}Data`] = [...(window[`${pageKey}Data`] || []), ...newData];
                window[`${pageKey}Offset`] = offset + newData.length;
                
                // If returned less than limit, no more data
                if (newData.length < 20) {
                    window[`${pageKey}HasMore`] = false;
                }
            }
        } catch (e) {
            console.error('Load more error:', e);
            window[`${pageKey}HasMore`] = false;
        } finally {
            window[`${pageKey}Loading`] = false;
            if (loader) loader.classList.add('hidden');
            
            if (!window[`${pageKey}HasMore`] && endMessage) {
                endMessage.classList.remove('hidden');
            }
        }
    },
    
    reset(pageKey) {
        window[`${pageKey}Offset`] = 0;
        window[`${pageKey}Loading`] = false;
        window[`${pageKey}HasMore`] = true;
        window[`${pageKey}Data`] = [];
    },
    
    cleanup(pageKey) {
        if (this.observers[pageKey]) {
            this.observers[pageKey].disconnect();
            delete this.observers[pageKey];
        }
    }
};

// Render loading indicator
function renderInfiniteLoader() {
    return `
        <div id="infinite-scroll-loader" class="hidden py-6 text-center">
            <div class="inline-flex items-center gap-2 text-sm text-text-muted">
                <div class="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                Loading more...
            </div>
        </div>
    `;
}

// Render end message
function renderInfiniteEnd(count) {
    return `
        <div id="infinite-scroll-end" class="hidden py-6 text-center text-sm text-text-muted">
            ${count > 0 ? 'You have reached the end' : 'No data'}
        </div>
    `;
}

// Pagination Controls
function renderPagination(pageKey, currentPage, totalItems, limit = 20) {
    const totalPages = Math.ceil(totalItems / limit) || 1;
    if (totalPages <= 1) return '';
    
    return `
        <div class="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <button onclick="window.${pageKey}Page = (window.${pageKey}Page || 1) - 1; if(window.${pageKey}Page < 1) window.${pageKey}Page = 1; router.refresh()" 
                class="px-4 py-2.5 rounded-2xl border border-border text-sm font-medium text-text-secondary hover:bg-surface-soft disabled:opacity-50 ${currentPage <= 1 ? 'disabled' : ''}" 
                ${currentPage <= 1 ? 'disabled' : ''}>
                ${Icons.chevronLeft()} Previous
            </button>
            <span class="text-sm text-text-muted">Page ${currentPage} of ${totalPages}</span>
            <button onclick="window.${pageKey}Page = (window.${pageKey}Page || 1) + 1; router.refresh()" 
                class="px-4 py-2.5 rounded-2xl bg-brand text-white text-sm font-medium hover:bg-brand-hover ${currentPage >= totalPages ? 'disabled opacity-50' : ''}"
                ${currentPage >= totalPages ? 'disabled' : ''}>
                Next ${Icons.chevronRight()}
            </button>
        </div>
    `;
}
