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
    memberDashboard: () => {
        const d = mockData.dashboard;
        const name = store.user?.name?.split(' ')[0] || 'Friend';
        return `
            <div class="w-full min-w-0">
                <!-- Greeting -->
                <div class="mb-6">
                    <div class="flex items-center gap-3 mb-1">
                        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-white font-bold text-xl shadow-lg shadow-brand/30">
                            ${name.charAt(0)}
                        </div>
                        <div>
                            <p class="text-xs font-medium text-text-muted">${getGreeting()}</p>
                            <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary">${name}</h1>
                        </div>
                    </div>
                </div>
                
                <!-- KPI Grid -->
                <div class="w-full min-w-0 mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        ${KpiCard({ label: 'Family Savings', amount: d.pool1Balance, subtext: t('common.upToDate'), highlight: true })}
                    ${KpiCard({ label: 'Care Fund', amount: d.pool2Balance, subtext: '5 contributing' })}
                    ${KpiCard({ label: 'Last Payment', amount: 15000, subtext: 'Folake - 2 days ago' })}
                    ${KpiCard({ label: 'Alerts', amount: d.pendingRequests, subtext: 'Requests waiting', isCurrency: false })}
                </div>
                
                <!-- Progress - Premium -->
                <div class="w-full min-w-0 mb-6 rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-brand/5">
                    <div class="mb-3 flex items-center justify-between">
                        <span class="text-xs font-bold uppercase tracking-wider text-text-muted">${t('common.thisMonthSavings')}</span>
                        <span class="text-xs font-bold text-brand bg-brand-light px-2 py-1 rounded-lg">75%</span>
                    </div>
                    <div class="h-3 overflow-hidden rounded-full bg-surface-raised">
                        <div class="h-full w-3/4 rounded-full bg-gradient-to-r from-brand to-brand-hover transition-all shadow-sm"></div>
                    </div>
                    <p class="mt-3 text-sm text-text-secondary flex items-center gap-2">
                        ${Icons.piggyBank()} <span class="font-bold text-text-primary">₦37,500</span> of ₦50,000 saved
                    </p>
                </div>
                
                <!-- Recent Payments - Premium -->
                <div class="w-full min-w-0">
                    <div class="mb-3 flex items-center justify-between">
                        <p class="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                            ${Icons.activity()} Recent Activity
                        </p>
                        <a href="/member/history" class="text-xs font-semibold text-brand hover:underline select-none">View all</a>
                    </div>
                    <div class="w-full min-w-0 space-y-2">
                        ${d.recentPayments.map(p => `
                            <div class="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 hover:shadow-md hover:border-brand/20 transition-all cursor-pointer">
                                <div class="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 ${p.type === 'credit' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                    ${p.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-bold text-text-primary truncate">${p.memberName}</p>
                                    <p class="text-xs text-text-muted flex items-center gap-1">
                                        ${Icons.calendar()} ${formatDate(p.date)}
                                    </p>
                                </div>
                                <div class="text-right flex-shrink-0">
                                    <p class="text-base font-bold whitespace-nowrap ${p.type === 'credit' ? 'text-success' : 'text-error'}">
                                        ${p.type === 'credit' ? '+' : '-'}${formatCurrency(p.amount)}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- CTA -->
                <div class="w-full min-w-0 mt-6">
                    <a href="/member/care-fund" class="flex items-center justify-center gap-2.5 rounded-2xl bg-brand p-4 font-semibold text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 transition-all select-none">
                        ${Icons.heartHandshake()}
                        <span>Request Family Help</span>
                    </a>
                </div>
            </div>
        `;
    },
    
    memberSavings: () => {
        const myTx = mockData.transactions.filter(t => t.memberId === '1' && t.pool === 'pool1');
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
                children: myTx.length ? `
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
                                    ${myTx.map((tx, i) => `
                                        <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors cursor-pointer">
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${formatDate(tx.date)}</td>
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
    
    memberCareFund: () => {
        const myRequests = mockData.careFundRequests.filter(r => r.memberId === '1');
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
            
            <!-- Balance Card - Premium -->
            <div class="w-full min-w-0 mb-6 rounded-2xl border-2 border-brand/20 bg-gradient-to-br from-brand-light to-white p-5 sm:p-6 shadow-lg shadow-brand/10">
                <div class="mb-1 text-sm font-bold text-brand flex items-center gap-1.5">
                    ${Icons.heartHandshake()}
                    ${t('careFund.balance')}
                </div>
                <div class="text-3xl sm:text-4xl font-bold text-brand">${formatCurrency(385000)}</div>
                        <div class="mt-3 flex items-center gap-2 text-xs text-brand/70">
                            ${Icons.users()} 5 ${t('common.membersContributing')}
                        </div>
            </div>
            
            <div class="w-full min-w-0">
            ${Card({
                title: t('careFund.requestHelp'),
                children: `
                    <form onsubmit="handleCareFundRequest(event)" class="space-y-5">
                        <div class="space-y-3">
                            <label class="block text-sm font-bold text-text-primary flex items-center gap-1.5">
                                ${Icons.helpCircle()}
                                ${t('careFund.whatFor')}
                            </label>
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
                            <label class="block text-sm font-bold text-text-primary flex items-center gap-1.5">
                                ${Icons.dollarSign()}
                                ${t('careFund.howMuchNeed')}
                            </label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₦</span>
                                <input type="number" placeholder="0" class="h-14 w-full min-w-0 rounded-xl border-2 border-border bg-surface py-3 pl-10 pr-4 text-lg transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-bold text-text-primary flex items-center gap-1.5">
                                ${Icons.calendar()}
                                ${t('careFund.whenOccasion')}
                            </label>
                            ${DatePicker({ id: 'care-date', placeholder: 'Select a date' })}
                        </div>
                        
                        <button type="submit" class="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-bold text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 transition-all select-none">
                            ${Icons.heartHandshake()}
                            ${t('careFund.sendRequest')}
                        </button>
                    </form>
                `
            })}
            </div>
            
            <div class="w-full min-w-0 mt-6">
                ${Card({
                    title: t('careFund.pastRequests'),
                    children: myRequests.length ? `
                        <div class="w-full min-w-0 space-y-3">
                            ${myRequests.map(r => `
                                <div class="flex items-center gap-4 rounded-2xl border border-border p-4 hover:shadow-md hover:border-brand/30 transition-all">
                                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand flex-shrink-0">
                                        ${occasionIcons[r.occasion]()}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="font-bold text-text-primary">${t('occasions.' + r.occasion)}</p>
                                        <p class="text-xs text-text-muted flex items-center gap-1">
                                            ${Icons.calendar()} ${formatDate(r.createdAt)}
                                        </p>
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
    
    memberHistory: () => {
        const myTx = mockData.transactions.filter(t => t.memberId === '1');
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
                children: myTx.length ? `
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
                                    ${myTx.map((tx, i) => `
                                        <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors cursor-pointer">
                                            <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${formatDate(tx.date)}</td>
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
                ` : EmptyState({ icon: Icons.history(), message: t('common.noData') })
            })}
            </div>
        `;
    },
    
    memberSettings: () => `
        <div class="w-full min-w-0">
            <!-- Header -->
            <div class="mb-6 flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand shadow-lg shadow-brand/10">
                    ${Icons.settings()}
                </div>
                <div>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary">${t('nav.settings')}</h1>
                    <p class="text-xs sm:text-sm text-text-muted">${t('common.manageAccount') || 'Manage your account'}</p>
                </div>
            </div>
            
            <!-- Profile Card - Premium -->
            <div class="w-full min-w-0 mb-4 rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-brand/5">
                <div class="flex items-center gap-4">
                    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-white text-2xl font-bold shadow-lg shadow-brand/30">
                        ${(store.user?.name || 'U').charAt(0)}
                    </div>
                    <div>
                        <p class="text-lg font-bold text-text-primary">${store.user?.name || 'Guest'}</p>
                        <p class="text-sm text-text-muted flex items-center gap-1">
                            ${Icons.calendar()} Member since March 2026
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- Savings Info - Premium -->
            <div class="w-full min-w-0 mb-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <p class="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                    ${Icons.piggyBank()} Savings Plan
                </p>
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-3 rounded-xl bg-surface-soft">
                        <span class="text-sm text-text-secondary flex items-center gap-2">${Icons.calendar()} Schedule</span>
                        <span class="text-sm font-bold text-text-primary bg-brand-light px-3 py-1 rounded-lg">Monthly</span>
                    </div>
                    <div class="flex items-center justify-between p-3 rounded-xl bg-surface-soft">
                        <span class="text-sm text-text-secondary flex items-center gap-2">${Icons.dollarSign()} Amount</span>
                        <span class="text-sm font-bold text-text-primary">${formatCurrency(50000)}</span>
                    </div>
                    <div class="flex items-center justify-between p-3 rounded-xl bg-surface-soft">
                        <span class="text-sm text-text-secondary flex items-center gap-2">${Icons.target()} Status</span>
                            <span class="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                            <span class="h-2 w-2 rounded-full bg-success animate-pulse"></span>
                            ${t('common.upToDate')}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Language - Premium -->
            <div class="w-full min-w-0 mb-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <p class="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                    ${Icons.globe()} Language
                </p>
                <button onclick="openLangModal()" class="flex items-center gap-4 rounded-xl bg-surface-soft p-4 w-full hover:bg-brand-light/30 active:scale-[0.99] transition-all select-none">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand shadow-md">
                        ${Icons.globe()}
                    </div>
                    <div class="text-left flex-1">
                        <p class="text-base font-bold text-text-primary">${getCurrentLangName()}</p>
                        <p class="text-xs text-text-muted">Tap to change language</p>
                    </div>
                    ${Icons.chevronRight()}
                </button>
            </div>
        </div>
    `,
    
    // Admin Pages
    adminDashboard: () => {
        const d = mockData.dashboard;
        return `
            <div class="w-full min-w-0">
                <!-- Hero -->
                <div class="mb-6">
                    <div class="flex items-center gap-3 mb-1">
                        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                            ${Icons.layoutDashboard()}
                        </div>
                        <div>
                            <p class="text-xs text-text-muted">${t('admin.familyOverview')}</p>
                            <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary">${t('common.familyManager')}</h1>
                        </div>
                    </div>
                </div>
                
                <!-- KPI Grid -->
                <div class="w-full min-w-0 mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    ${KpiCard({ label: 'Family Savings', amount: d.pool1Balance, subtext: 'Total Pool 1', highlight: true })}
                    ${KpiCard({ label: 'Care Fund', amount: d.pool2Balance, subtext: 'Total Pool 2' })}
                    ${KpiCard({ label: 'Members', amount: d.totalMembers, subtext: 'Family members', isCurrency: false })}
                    ${KpiCard({ label: 'Pending', amount: d.pendingRequests, subtext: 'Awaiting review', isCurrency: false })}
                </div>
                
                <!-- Behind on Savings -->
                ${d.behindMembers.length > 0 ? `
                    <div class="w-full min-w-0 mb-6 rounded-2xl border border-error/20 bg-error/5 p-4">
                        <div class="mb-3 flex items-center gap-2">
                            ${Icons.alertTriangle()}
                            <p class="text-sm font-semibold text-error">Members Behind on Savings</p>
                        </div>
                        <div class="w-full min-w-0 space-y-2">
                            ${d.behindMembers.map(m => `
                                <div class="flex items-center justify-between rounded-xl bg-surface p-3">
                                    <div class="flex items-center gap-3">
                                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-error/10 text-sm font-bold text-error">
                                            ${m.name.split(' ')[1]?.charAt(0) || m.name.charAt(0)}
                                        </div>
                                        <span class="text-sm font-medium">${m.name}</span>
                                    </div>
                                    <span class="text-sm font-semibold text-error">${formatCurrency(m.gap)} behind</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Quick Actions -->
                <div class="w-full min-w-0">
                    <p class="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">Quick Actions</p>
                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <a href="/admin/transactions/new" class="flex items-center justify-center gap-2.5 rounded-2xl bg-brand p-4 font-semibold text-white shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 transition-all select-none">
                            ${Icons.plusCircle()}
                            <span>Record Payment</span>
                        </a>
                        <a href="/admin/members" class="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-border bg-surface p-4 font-semibold hover:border-brand hover:text-brand hover:bg-brand-light/30 transition-all select-none">
                            ${Icons.userPlus()}
                            <span>Add Member</span>
                        </a>
                        <a href="/admin/care-fund" class="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-border bg-surface p-4 font-semibold hover:border-brand hover:text-brand hover:bg-brand-light/30 transition-all select-none">
                            ${Icons.heartHandshake()}
                            <span>Help Requests</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    },
    
    adminTransactionsNew: () => `
        <div class="w-full min-w-0 mb-6">
            <a href="/admin/transactions" class="mb-2 inline-flex items-center gap-1 text-sm text-brand flex items-center gap-1 select-none">
                ${Icons.arrowLeft()}
                ${t('common.back')}
            </a>
            <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                ${Icons.plusCircle()}
                ${t('transaction.recordPayment')}
            </h1>
        </div>
        
        <div class="w-full min-w-0">
        ${Card({
            children: `
                <form onsubmit="handleRecordPayment(event)" class="space-y-5">
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                            ${Icons.user()}
                            ${t('transaction.whichMember')} <span class="text-error">*</span>
                        </label>
                        <select class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface px-4 text-base sm:text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            <option value="">Select a family member</option>
                            ${mockData.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-text-primary">${t('transaction.whichFund')}</label>
                        <div class="flex rounded-xl border border-border p-1">
                            <button type="button" onclick="setFund('pool1')" id="fund-pool1" class="flex-1 rounded-lg py-3 text-sm font-medium bg-brand text-white select-none">
                                ${Icons.piggyBank()} ${t('member.familySavings')}
                            </button>
                            <button type="button" onclick="setFund('pool2')" id="fund-pool2" class="flex-1 rounded-lg py-3 text-sm font-medium text-text-secondary select-none">
                                ${Icons.heartHandshake()} ${t('member.careFund')}
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-text-primary">${t('transaction.whatType')}</label>
                        <div class="flex rounded-xl border border-border p-1">
                            <button type="button" onclick="setTxType('credit')" id="type-credit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium bg-success text-white select-none">
                                ${Icons.arrowUpRight()} ${t('table.moneyIn')}
                            </button>
                            <button type="button" onclick="setTxType('debit')" id="type-debit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-text-secondary select-none">
                                ${Icons.arrowDownRight()} ${t('table.moneyOut')}
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                            ${Icons.dollarSign()}
                            ${t('transaction.howMuch')} <span class="text-error">*</span>
                        </label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">₦</span>
                            <input type="number" placeholder="0" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface py-3 pl-8 pr-4 text-base sm:text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                    </div>
                    
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                            ${Icons.filePlus()}
                            ${t('transaction.whatFor')} <span class="text-error">*</span>
                        </label>
                        <input type="text" placeholder="${t('transaction.whatForHelper')}" class="h-12 w-full min-w-0 rounded-xl border border-border bg-surface px-4 text-base sm:text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    
                    <button type="submit" class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-medium text-white transition-colors active:bg-brand-hover select-none">
                        ${Icons.check()}
                        ${t('transaction.recordBtn')}
                    </button>
                </form>
            `
        })}
        </div>
    `,
    
    adminTransactions: () => `
        <div class="w-full min-w-0 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.clipboardList()}
                    ${t('transaction.familyMoneyHistory')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">All family transactions</p>
            </div>
            <button class="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium transition-colors hover:bg-surface-soft active:bg-surface-raised select-none">
                ${Icons.download()}
                Export CSV
            </button>
        </div>
        
        <div class="w-full min-w-0">
        ${Card({
            children: `
                <div class="rounded-xl overflow-hidden border border-border">
                    <div class="overflow-x-auto w-full">
                        <table class="w-full min-w-[640px]">
                            <thead>
                                <tr class="bg-table-header text-left border-b border-border">
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.member')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.fund')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.type')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.amount')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.reason')}</th>
                                    <th class="whitespace-nowrap px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">${t('table.date')}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                ${mockData.transactions.map((tx, i) => `
                                    <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors cursor-pointer">
                                        <td class="whitespace-nowrap px-4 py-3.5 text-sm font-medium">${tx.memberName}</td>
                                        <td class="whitespace-nowrap px-4 py-3.5">${PoolTag({ pool: tx.pool })}</td>
                                        <td class="whitespace-nowrap px-4 py-3.5 text-sm font-medium ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                            ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                        </td>
                                        <td class="whitespace-nowrap px-4 py-3.5 text-right text-sm font-bold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                            ${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}
                                        </td>
                                        <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${tx.reason}</td>
                                        <td class="whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary">${formatDate(tx.date)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        })}
        </div>
    `,
    
    adminCareFund: () => {
        const pending = mockData.careFundRequests.filter(r => r.status === 'pending');
        const accepted = mockData.careFundRequests.filter(r => r.status === 'accepted');
        const rejected = mockData.careFundRequests.filter(r => r.status === 'rejected');
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
                                    ${occasionIcons[r.occasion]()}
                                </div>
                                <div>
                                    <h3 class="font-bold text-text-primary">${r.memberName}</h3>
                                    <p class="text-sm text-text-muted flex items-center gap-1">
                                        ${occasionIcons[r.occasion]()} ${t('occasions.' + r.occasion)} • ${formatDate(r.eventDate)}
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
                                ${Icons.check()} Accept
                            </button>
                            <button onclick="showDeclineForm('${r.id}')" class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-error py-3 font-medium text-error transition-colors active:bg-error/5 select-none">
                                ${Icons.x()} Decline
                            </button>
                        </div>
                        ` : ''}
                    </div>
                `).join('') : EmptyState({ icon: Icons.heartHandshake(), message: activeTab === 'pending' ? 'No pending requests' : activeTab === 'accepted' ? 'No accepted requests yet' : 'No declined requests' })}
            </div>
        `;
    },
    
    adminMembers: () => `
        <div class="w-full min-w-0 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.users()}
                    ${t('nav.familyMembers')}
                </h1>
                <p class="text-xs sm:text-sm text-text-muted">${mockData.members.length} family members</p>
            </div>
            <button onclick="showAddMemberModal()" class="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-white shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 transition-all select-none sm:w-auto">
                ${Icons.userPlus()}
                <span>${t('members.addMember')}</span>
            </button>
        </div>
        
        <div class="w-full min-w-0 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            ${mockData.members.map(m => `
                <div class="w-full min-w-0 rounded-2xl border border-border bg-surface p-5 shadow-sm hover:shadow-lg hover:shadow-brand/5 transition-all group">
                    <div class="mb-4 flex items-center gap-3">
                        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-xl font-bold text-brand flex-shrink-0 group-hover:scale-110 transition-transform">
                            ${m.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-bold text-text-primary truncate text-base">${m.name}</h3>
                            <p class="text-xs text-text-muted flex items-center gap-1">
                                ${Icons.clock()} ${m.schedule === 'weekly' ? 'Weekly' : 'Monthly'} saver
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 space-y-2.5 rounded-xl bg-surface-soft p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-text-muted flex items-center gap-1.5">${Icons.target()} Committed</span>
                            <span class="font-bold text-text-primary">${formatCurrency(m.committedAmount)}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-text-muted flex items-center gap-1.5">${Icons.calendar()} Last Payment</span>
                            <span class="font-medium text-text-secondary">${formatDate(m.lastPaymentDate, { month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        ${StatusBadge({ status: m.status })}
                        <button class="text-sm text-brand font-medium flex items-center gap-1.5 hover:bg-brand-light px-3 py-1.5 rounded-lg transition-colors select-none">
                            ${Icons.refreshCw()} ${t('members.resetPassword')}
                        </button>
                    </div>
                </div>
            `).join('')}
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
    `,
    
    notifications: () => {
        const notifications = store.notifications;
        const unread = notifications.filter(n => !n.read).length;
        const read = notifications.filter(n => n.read);
        
        const typeConfig = {
            success: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: Icons.checkCircle },
            warning: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: Icons.alertTriangle },
            info: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', icon: Icons.info },
            error: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: Icons.alertCircle }
        };
        
        function renderNotif(n, isUnread) {
            const cfg = typeConfig[n.type] || typeConfig.info;
            if (isUnread) {
                return `
                    <div class="group w-full min-w-0">
                        <div class="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm border-l-4 border-brand hover:shadow-md transition-all cursor-pointer">
                            <div class="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${cfg.bg} ${cfg.text}">
                                ${cfg.icon()}
                            </div>
                            <div class="flex-1 min-w-0 pr-2">
                                <p class="text-[13px] font-semibold text-text-primary leading-snug line-clamp-2">${n.message}</p>
                                <p class="mt-1.5 text-[11px] text-text-muted flex items-center gap-1">
                                    ${Icons.clock()} ${timeAgo(n.time)}
                                </p>
                            </div>
                            <button onclick="handleMarkRead('${n.id}')" class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                                ${Icons.check()}
                            </button>
                        </div>
                    </div>
                `;
            }
            return `
                <div class="w-full min-w-0">
                    <div class="flex items-start gap-3 rounded-2xl bg-surface-soft/50 p-4 border border-transparent hover:border-border/50 transition-all cursor-pointer">
                        <div class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${cfg.bg} ${cfg.text}">
                            ${cfg.icon()}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-[13px] text-text-secondary leading-snug line-clamp-2">${n.message}</p>
                            <p class="mt-1 text-[11px] text-text-muted flex items-center gap-1">
                                ${Icons.clock()} ${timeAgo(n.time)}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="w-full min-w-0">
                <!-- Page Header - Premium Style -->
                <div class="mb-5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
                                    ${Icons.bell()}
                                </div>
                                ${unread > 0 ? `
                                    <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">${unread > 9 ? '9+' : unread}</span>
                                ` : ''}
                            </div>
                            <div>
                                <h1 class="text-xl font-bold text-text-primary">${t('nav.notifications')}</h1>
                                <p class="text-xs text-text-muted">${unread > 0 ? unread + ' new alert' + (unread > 1 ? 's' : '') : 'All caught up'}</p>
                            </div>
                        </div>
                        ${unread > 0 ? `
                            <button onclick="handleMarkAllRead()" class="flex h-10 items-center gap-2 rounded-xl bg-brand-light px-4 text-sm font-semibold text-brand hover:bg-brand/20 active:bg-brand/30 transition-colors select-none">
                                ${Icons.check()}
                                    <span>${t('common.markAllRead')}</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                ${notifications.length === 0 ? `
                    <!-- Empty State - Premium -->
                    <div class="flex flex-col items-center justify-center py-16 px-6">
                        <div class="relative mb-6">
                            <div class="flex h-24 w-24 items-center justify-center rounded-full bg-surface-soft">
                                <span class="text-4xl text-text-muted">${Icons.bell()}</span>
                            </div>
                            <div class="absolute inset-0 rounded-full bg-brand/5 animate-pulse"></div>
                        </div>
                        <h3 class="text-lg font-semibold text-text-primary mb-2">${t('common.alertsCaughtUp')}</h3>
                        <p class="text-sm text-text-muted text-center max-w-xs">${t('common.alertsCatchUpDesc')}</p>
                        <div class="mt-6 flex items-center gap-2 text-xs text-text-muted">
                            ${Icons.checkCircle()}
                            <span>${t('common.noNewNotifications')}</span>
                        </div>
                    </div>
                ` : `
                    <!-- Unread Notifications -->
                    ${unread > 0 ? `
                        <div class="mb-6">
                            <div class="mb-3 flex items-center gap-2">
                                <span class="h-2 w-2 rounded-full bg-brand animate-pulse"></span>
                                <p class="text-xs font-bold uppercase tracking-wider text-brand">${t('common.new')}</p>
                                <span class="ml-auto rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">${unread}</span>
                            </div>
                            <div class="space-y-2">
                                ${notifications.filter(n => !n.read).map(n => renderNotif(n, true)).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Read Notifications -->
                    ${read.length > 0 ? `
                        <div>
                            <p class="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted pl-1 flex items-center gap-2">
                                ${Icons.archive()}
                                ${t('common.earlier')}
                                <span class="ml-auto rounded-full bg-surface-soft px-2 py-0.5 text-[11px] font-medium text-text-muted">${read.length}</span>
                            </p>
                            <div class="space-y-2">
                                ${read.map(n => renderNotif(n, false)).join('')}
                            </div>
                        </div>
                    ` : ''}
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
    const btn = form.querySelector('button[type="submit"]');
    const memberId = form.querySelector('select')?.value;
    const fund = document.getElementById('fund-pool1')?.classList.contains('bg-brand') ? 'pool1' : 'pool2';
    const type = document.getElementById('type-credit')?.classList.contains('bg-success') ? 'credit' : 'debit';
    const amount = form.querySelector('input[type="number"]')?.value;
    const reason = form.querySelector('input[type="text"]')?.value;
    
    if (!memberId || !amount || !reason) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    btn.disabled = true;
    
    try {
        // Note: receipt_url required by backend - using empty for now
        // In production, upload receipt first via admin.uploadReceipt(file)
        await store.createTransaction({
            member_id: memberId,
            pool: fund,
            type,
            amount: parseInt(amount),
            reason,
            receipt_url: ''
        });
        showToast(t('common.success'), 'success');
        router.navigate('/admin/transactions');
    } catch (err) {
        showToast(err.message || t('common.error'), 'error');
    } finally {
        btn.disabled = false;
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

function showAddMemberModal() {
    document.getElementById('add-member-modal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();
}

function closeAddMemberModal() {
    document.getElementById('add-member-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}
