// Pages with Lucide Icons

const pages = {
    // Auth Pages
    login: () => `
        <div class="flex min-h-screen flex-col">
            <div class="bg-brand p-6 sm:p-8 lg:hidden">
                <h1 class="text-2xl font-bold text-white flex items-center gap-2">
                    <span>${Icons.building()}</span>
                    ${t('app.name')}
                </h1>
                <p class="mt-1 text-brand-200 text-sm">${t('app.tagline')}</p>
            </div>
            
            <div class="flex flex-1 flex-col justify-center p-6 pb-24 sm:pb-6">
                <div class="mx-auto w-full max-w-md">
                    <div class="mb-6 flex justify-end">
                        <button onclick="openLangModal()" class="flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-soft active:bg-surface-raised">
                            ${Icons.globe()}
                            <span>${getCurrentLangName()}</span>
                        </button>
                    </div>
                    
                    <div class="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                        <h2 class="mb-6 text-xl font-semibold flex items-center gap-2">
                            ${Icons.user()}
                            ${t('auth.signIn')}
                        </h2>
                        
                        <div id="login-error" class="mb-4 hidden rounded-xl border border-error/20 bg-error/10 p-4 text-sm text-error flex items-center gap-2">
                            ${Icons.alertCircle()}
                            <span></span>
                        </div>
                        
                        <form onsubmit="handleLogin(event)" class="space-y-4">
                            <div class="space-y-1.5">
                                <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                                    ${Icons.user()}
                                    ${t('auth.yourName')}
                                </label>
                                <input type="text" id="login-name" placeholder="${t('auth.yourNamePlaceholder')}"
                                    class="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            </div>
                            
                            <div class="space-y-1.5">
                                <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                                    ${Icons.lock()}
                                    ${t('auth.password')}
                                </label>
                                <div class="relative">
                                    <input type="password" id="login-password" 
                                        class="h-12 w-full rounded-xl border border-border bg-surface px-4 pr-12 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                    <button type="button" onclick="togglePassword('login-password')" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <button type="submit" id="login-btn"
                                class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-medium text-white transition-colors hover:bg-brand-hover active:bg-brand-hover">
                                ${Icons.logIn()}
                                ${t('auth.signIn')}
                            </button>
                        </form>
                        
                        <p class="mt-6 text-center text-sm text-text-muted">
                            ${t('auth.noAccount')}
                            <a href="/register" class="font-semibold text-brand hover:underline"> ${t('auth.createAccount')}</a>
                        </p>
                        
                        <div class="mt-4 border-t border-border pt-4 text-center">
                            <a href="/admin/login" class="flex items-center justify-center gap-2 text-xs text-text-muted hover:text-brand">
                                ${Icons.shield()}
                                ${t('auth.signInAsManager')}?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    register: () => `
        <div class="flex min-h-screen flex-col">
            <div class="bg-brand p-6 sm:p-8 lg:hidden">
                <h1 class="text-2xl font-bold text-white flex items-center gap-2">
                    <span>${Icons.building()}</span>
                    ${t('app.name')}
                </h1>
            </div>
            
            <div class="flex flex-1 flex-col justify-center overflow-y-auto p-6 pb-24 sm:pb-6">
                <div class="mx-auto w-full max-w-md">
                    <div class="mb-6 flex justify-end">
                        <button onclick="openLangModal()" class="flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-soft active:bg-surface-raised">
                            ${Icons.globe()}
                        </button>
                    </div>
                    
                    <div class="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                        <h2 class="mb-6 text-xl font-semibold flex items-center gap-2">
                            ${Icons.userPlus()}
                            ${t('auth.createAccount')}
                        </h2>
                        
                        <form onsubmit="handleRegister(event)" class="space-y-5">
                            <div class="space-y-1.5">
                                <label class="block text-sm font-medium text-text-primary">${t('auth.fullName')} <span class="text-error">*</span></label>
                                <input type="text" id="reg-name" placeholder="e.g. Taiwo Odelade"
                                    class="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                <p class="text-xs text-text-muted">${t('auth.fullNameHelper')}</p>
                            </div>
                            
                            <div class="space-y-1.5">
                                <label class="block text-sm font-medium text-text-primary">${t('auth.createPassword')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <input type="password" id="reg-password"
                                        class="h-12 w-full rounded-xl border border-border bg-surface px-4 pr-12 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                    <button type="button" onclick="togglePassword('reg-password')" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-1.5">
                                <label class="block text-sm font-medium text-text-primary">${t('auth.confirmPassword')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <input type="password" id="reg-confirm"
                                        class="h-12 w-full rounded-xl border border-border bg-surface px-4 pr-12 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                    <button type="button" onclick="togglePassword('reg-confirm')" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-text-primary">${t('register.howOften')} <span class="text-error">*</span></label>
                                <div class="flex rounded-xl border border-border p-1">
                                    <button type="button" onclick="setSchedule('weekly')" id="btn-weekly"
                                        class="flex-1 rounded-lg py-3 text-sm font-medium transition-colors text-text-secondary">
                                        ${t('register.everyWeek')}
                                    </button>
                                    <button type="button" onclick="setSchedule('monthly')" id="btn-monthly"
                                        class="flex-1 rounded-lg py-3 text-sm font-medium bg-brand text-white">
                                        ${t('register.everyMonth')}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="space-y-1.5">
                                <label class="block text-sm font-medium text-text-primary">${t('register.howMuch')} <span class="text-error">*</span></label>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">₦</span>
                                    <input type="number" id="reg-amount" placeholder="0"
                                        class="h-12 w-full rounded-xl border border-border bg-surface py-3 pl-8 pr-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                </div>
                                <p class="text-xs text-text-muted">${t('register.howMuchHelper')}</p>
                            </div>
                            
                            <button type="submit" id="reg-btn"
                                class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-medium text-white transition-colors hover:bg-brand-hover active:bg-brand-hover">
                                ${Icons.userPlus()}
                                ${t('auth.createAccount')}
                            </button>
                        </form>
                        
                        <p class="mt-6 text-center text-sm text-text-muted">
                            ${t('auth.alreadyHave')}
                            <a href="/login" class="font-semibold text-brand hover:underline"> ${t('auth.signIn')}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    adminLogin: () => `
        <div class="flex min-h-screen flex-col">
            <div class="bg-brand p-6 sm:p-8 lg:hidden">
                <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white mb-4">
                    ${Icons.shield()}
                    Family Manager Access
                </div>
                <h1 class="text-2xl font-bold text-white flex items-center gap-2">
                    <span>${Icons.building()}</span>
                    ${t('app.name')}
                </h1>
            </div>
            
            <div class="flex flex-1 flex-col justify-center p-6 pb-24 sm:pb-6">
                <div class="mx-auto w-full max-w-md">
                    <div class="mb-6 flex justify-end">
                        <button onclick="openLangModal()" class="flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-text-secondary hover:bg-surface-soft active:bg-surface-raised">
                            ${Icons.globe()}
                        </button>
                    </div>
                    
                    <div class="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                        <h2 class="mb-6 text-xl font-semibold flex items-center gap-2">
                            ${Icons.shield()}
                            ${t('auth.signInAsManager')}
                        </h2>
                        
                        <div id="admin-error" class="mb-4 hidden rounded-xl border border-error/20 bg-error/10 p-4 text-sm text-error flex items-center gap-2">
                            ${Icons.alertCircle()}
                            <span></span>
                        </div>
                        
                        <form onsubmit="handleAdminLogin(event)" class="space-y-4">
                            <div class="space-y-1.5">
                                <label class="block text-sm font-medium text-text-primary">${t('auth.managerPassword')}</label>
                                <div class="relative">
                                    <input type="password" id="admin-password"
                                        class="h-12 w-full rounded-xl border border-border bg-surface px-4 pr-12 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                                    <button type="button" onclick="togglePassword('admin-password')" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                                        ${Icons.eye()}
                                    </button>
                                </div>
                            </div>
                            
                            <button type="submit"
                                class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-medium text-white transition-colors hover:bg-brand-hover active:bg-brand-hover">
                                ${Icons.shield()}
                                ${t('auth.signInAsManager')}
                            </button>
                        </form>
                        
                        <p class="mt-6 text-center">
                            <a href="/login" class="flex items-center justify-center gap-2 font-medium text-brand hover:underline">
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
        return `
            <div class="mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.zap()}
                    ${getGreeting()}, ${store.user?.name?.split(' ')[0] || 'Friend'}
                </h1>
                <p class="text-sm text-text-muted">Here's your family savings overview</p>
            </div>
            
            <div class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                ${KpiCard({ label: t('member.familySavings'), amount: d.pool1Balance, subtext: t('member.upToDate'), highlight: true })}
                ${KpiCard({ label: t('member.careFund'), amount: d.pool2Balance, subtext: '5 members contributing' })}
                ${KpiCard({ label: t('member.lastPayment'), amount: 15000, subtext: 'Folake - 2 days ago' })}
                ${KpiCard({ label: t('member.alerts'), amount: d.pendingRequests, subtext: 'Help requests waiting' })}
            </div>
            
            <div class="mb-2 h-2 overflow-hidden rounded-full bg-surface-raised">
                <div class="h-full w-3/4 rounded-full bg-brand"></div>
            </div>
            <p class="mb-6 text-xs sm:text-sm text-text-muted">Your savings progress this month</p>
            
            ${Card({
                title: t('member.recentPayments'),
                subtitle: 'Latest contributions from family members',
                children: `
                    <div class="space-y-3">
                        ${d.recentPayments.map(p => `
                            <div class="flex items-center justify-between rounded-xl border border-border p-3 sm:p-4 hover:bg-surface-soft transition-colors">
                                <div class="flex items-center gap-3">
                                    <div class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full ${p.type === 'credit' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}">
                                        ${p.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                    </div>
                                    <div>
                                        <p class="text-sm sm:text-base font-medium text-text-primary">${p.memberName}</p>
                                        <div class="flex items-center gap-2 mt-0.5">
                                            <span class="text-xs text-text-muted">${formatDate(p.date)}</span>
                                            <span class="text-text-muted">•</span>
                                            ${PoolTag({ pool: p.pool })}
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm sm:text-base font-semibold ${p.type === 'credit' ? 'text-success' : 'text-error'}">
                                        ${p.type === 'credit' ? '+' : '-'}${formatCurrency(p.amount)}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-4 pt-4 border-t border-border">
                        <a href="/member/history" class="flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                            View all payments ${Icons.chevronRight()}
                        </a>
                    </div>
                `
            })}
            
            <div class="mt-6">
                <a href="/member/care-fund"
                    class="flex items-center justify-center gap-2 rounded-xl bg-brand p-4 font-medium text-white shadow-sm transition-colors hover:bg-brand-hover active:bg-brand-hover">
                    ${Icons.heartHandshake()}
                    <span>${t('member.requestHelp')}</span>
                </a>
            </div>
        `;
    },
    
    memberSavings: () => {
        const myTx = mockData.transactions.filter(t => t.memberId === '1' && t.pool === 'pool1');
        return `
            <div class="mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.wallet()}
                    ${t('nav.mySavings')}
                </h1>
                <p class="text-sm text-text-muted">Your Family Savings history</p>
            </div>
            
            ${Card({
                children: myTx.length ? `
                    <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                        <table class="w-full min-w-[520px] sm:min-w-0">
                            <thead>
                                <tr class="border-b border-border bg-table-header text-left">
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.date')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.type')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.amount')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.reason')}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                ${myTx.map((tx, i) => `
                                    <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors">
                                        <td class="whitespace-nowrap px-3 py-3 text-sm text-text-secondary">${formatDate(tx.date)}</td>
                                        <td class="whitespace-nowrap px-3 py-3 text-sm font-medium ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                            ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()} ${tx.type === 'credit' ? t('table.moneyIn') : t('table.moneyOut')}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-3 text-right text-sm font-semibold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                            ${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-3 text-sm">${tx.reason}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : EmptyState({ icon: Icons.wallet(), message: t('member.noPayments') })
            })}
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
            <div class="mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.heartHandshake()}
                    ${t('nav.careFund')}
                </h1>
                <p class="text-sm text-text-muted">Request help from your family</p>
            </div>
            
            <div class="mb-6 rounded-2xl border border-border bg-brand-light p-5 sm:p-6">
                <div class="mb-1 text-sm font-medium text-brand flex items-center gap-1">
                    ${Icons.heartHandshake()}
                    ${t('careFund.balance')}
                </div>
                <div class="text-2xl sm:text-3xl font-bold text-brand">${formatCurrency(385000)}</div>
            </div>
            
            ${Card({
                title: t('careFund.requestHelp'),
                children: `
                    <form onsubmit="handleCareFundRequest(event)" class="space-y-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                                ${Icons.helpCircle()}
                                ${t('careFund.whatFor')}
                            </label>
                            <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
                                ${['birthday', 'wedding', 'newBaby', 'graduation', 'medical', 'other'].map(o => `
                                    <button type="button" class="flex flex-col items-center gap-1 rounded-xl border border-border p-3 text-xs font-medium transition-colors hover:border-brand hover:bg-brand-light active:bg-brand-light">
                                        <span class="text-2xl sm:text-3xl text-brand">${occasionIcons[o]()}</span>
                                        <span class="text-center">${t('occasions.' + o)}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="space-y-1.5">
                            <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                                ${Icons.dollarSign()}
                                ${t('careFund.howMuchNeed')}
                            </label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">₦</span>
                                <input type="number" placeholder="0" class="h-12 w-full rounded-xl border border-border bg-surface py-3 pl-8 pr-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            </div>
                        </div>
                        
                        <div class="space-y-1.5">
                            <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                                ${Icons.calendar()}
                                ${t('careFund.whenOccasion')}
                            </label>
                            <input type="date" class="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                        
                        <button type="submit" class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-medium text-white transition-colors hover:bg-brand-hover active:bg-brand-hover">
                            ${Icons.heartHandshake()}
                            ${t('careFund.sendRequest')}
                        </button>
                    </form>
                `
            })}
            
            <div class="mt-6">
                ${Card({
                    title: t('careFund.pastRequests'),
                    children: myRequests.length ? `
                        <div class="space-y-3">
                            ${myRequests.map(r => `
                                <div class="flex items-center justify-between rounded-xl border border-border p-4">
                                    <div class="flex items-center gap-3">
                                        <div class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                                            ${occasionIcons[r.occasion]()}
                                        </div>
                                        <div>
                                            <p class="text-sm font-medium">${t('occasions.' + r.occasion)}</p>
                                            <p class="text-xs text-text-muted">${formatDate(r.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm sm:text-base font-semibold">${formatCurrency(r.amount)}</p>
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
            <div class="mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.history()}
                    ${t('nav.myHistory')}
                </h1>
                <p class="text-sm text-text-muted">All your transactions across both funds</p>
            </div>
            
            ${Card({
                children: myTx.length ? `
                    <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                        <table class="w-full min-w-[520px] sm:min-w-0">
                            <thead>
                                <tr class="border-b border-border bg-table-header text-left">
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.date')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.type')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.fund')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.amount')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.reason')}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                ${myTx.map((tx, i) => `
                                    <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors">
                                        <td class="whitespace-nowrap px-3 py-3 text-sm text-text-secondary">${formatDate(tx.date)}</td>
                                        <td class="whitespace-nowrap px-3 py-3 text-sm font-medium ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                            ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()} ${tx.type === 'credit' ? t('table.moneyIn') : t('table.moneyOut')}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-3">${PoolTag({ pool: tx.pool })}</td>
                                        <td class="whitespace-nowrap px-3 py-3 text-right text-sm font-semibold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                            ${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-3 text-sm">${tx.reason}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : EmptyState({ icon: Icons.history(), message: t('common.noData') })
            })}
        `;
    },
    
    memberSettings: () => `
        <div class="mb-6">
            <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                ${Icons.settings()}
                ${t('nav.settings')}
            </h1>
        </div>
        
        <div class="space-y-4">
            ${Card({
                title: t('settings.myDetails'),
                children: `
                    <div class="space-y-3">
                        <div class="flex justify-between items-center py-3 border-b border-border">
                            <span class="text-sm text-text-muted flex items-center gap-2">${Icons.user()} Name</span>
                            <span class="text-sm font-medium">${store.user?.name || 'Guest'}</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b border-border">
                            <span class="text-sm text-text-muted flex items-center gap-2">${Icons.calendar()} Savings Schedule</span>
                            <span class="text-sm font-medium">Monthly - ₦50,000</span>
                        </div>
                        <p class="text-xs text-text-muted pt-2">${t('settings.contactManager')}</p>
                    </div>
                `
            })}
            
            ${Card({
                title: t('settings.language'),
                children: `
                    <button onclick="openLangModal()" class="flex items-center gap-3 text-brand hover:underline">
                        ${Icons.globe()}
                        <span class="font-medium">Change language</span>
                    </button>
                `
            })}
        </div>
    `,
    
    // Admin Pages
    adminDashboard: () => {
        const d = mockData.dashboard;
        return `
            <div class="mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.layoutDashboard()}
                    ${t('admin.familyOverview')}
                </h1>
                <p class="text-sm text-text-muted">Welcome back, Family Manager</p>
            </div>
            
            <div class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                ${KpiCard({ label: t('member.familySavings'), amount: d.pool1Balance, subtext: 'Total Pool 1', highlight: true })}
                ${KpiCard({ label: t('member.careFund'), amount: d.pool2Balance, subtext: 'Total Pool 2' })}
                ${KpiCard({ label: t('admin.totalMembers'), amount: d.totalMembers, subtext: 'Family members' })}
                ${KpiCard({ label: t('admin.pendingRequests'), amount: d.pendingRequests, subtext: 'Awaiting review' })}
            </div>
            
            ${Card({
                title: t('admin.behindOnSavings'),
                children: `
                    <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                        <table class="w-full min-w-[400px] sm:min-w-0">
                            <thead>
                                <tr class="border-b border-border bg-table-header text-left">
                                    <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">Name</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">${t('admin.shouldSave')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">${t('admin.hasSaved')}</th>
                                    <th class="whitespace-nowrap px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">${t('admin.gap')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${d.behindMembers.map(m => `
                                    <tr class="bg-error/5">
                                        <td class="whitespace-nowrap px-3 py-3 text-sm font-medium flex items-center gap-2">
                                            ${Icons.alertTriangle()}
                                            ${m.name}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-3 text-right text-sm">${formatCurrency(m.committed)}</td>
                                        <td class="whitespace-nowrap px-3 py-3 text-right text-sm">${formatCurrency(m.saved)}</td>
                                        <td class="whitespace-nowrap px-3 py-3 text-right text-sm font-semibold text-error">${formatCurrency(m.gap)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `
            })}
            
            <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a href="/admin/transactions/new" class="flex items-center justify-center gap-2 rounded-xl bg-brand p-4 font-medium text-white transition-colors hover:bg-brand-hover active:bg-brand-hover">
                    ${Icons.plusCircle()}
                    <span>${t('admin.recordPayment')}</span>
                </a>
                <a href="/admin/members" class="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface p-4 font-medium transition-colors hover:bg-surface-soft active:bg-surface-raised">
                    ${Icons.users()}
                    <span>${t('admin.addMember')}</span>
                </a>
                <a href="/admin/care-fund" class="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface p-4 font-medium transition-colors hover:bg-surface-soft active:bg-surface-raised">
                    ${Icons.heartHandshake()}
                    <span>${t('admin.reviewRequests')}</span>
                </a>
            </div>
        `;
    },
    
    adminTransactionsNew: () => `
        <div class="mb-6">
            <a href="/admin/transactions" class="mb-2 inline-flex items-center gap-1 text-sm text-brand hover:underline flex items-center gap-1">
                ${Icons.arrowLeft()}
                ${t('common.back')}
            </a>
            <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                ${Icons.plusCircle()}
                ${t('transaction.recordPayment')}
            </h1>
        </div>
        
        ${Card({
            children: `
                <form onsubmit="handleRecordPayment(event)" class="space-y-5">
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                            ${Icons.user()}
                            ${t('transaction.whichMember')} <span class="text-error">*</span>
                        </label>
                        <select class="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                            <option value="">Select a family member</option>
                            ${mockData.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-text-primary">${t('transaction.whichFund')}</label>
                        <div class="flex rounded-xl border border-border p-1">
                            <button type="button" onclick="setFund('pool1')" id="fund-pool1" class="flex-1 rounded-lg py-3 text-sm font-medium bg-brand text-white">
                                ${Icons.piggyBank()} ${t('member.familySavings')}
                            </button>
                            <button type="button" onclick="setFund('pool2')" id="fund-pool2" class="flex-1 rounded-lg py-3 text-sm font-medium text-text-secondary">
                                ${Icons.heartHandshake()} ${t('member.careFund')}
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-text-primary">${t('transaction.whatType')}</label>
                        <div class="flex rounded-xl border border-border p-1">
                            <button type="button" onclick="setTxType('credit')" id="type-credit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium bg-success text-white">
                                ${Icons.arrowUpRight()} ${t('table.moneyIn')}
                            </button>
                            <button type="button" onclick="setTxType('debit')" id="type-debit" class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-text-secondary">
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
                            <input type="number" placeholder="0" class="h-12 w-full rounded-xl border border-border bg-surface py-3 pl-8 pr-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                    </div>
                    
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary flex items-center gap-1">
                            ${Icons.filePlus()}
                            ${t('transaction.whatFor')} <span class="text-error">*</span>
                        </label>
                        <input type="text" placeholder="${t('transaction.whatForHelper')}" class="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    
                    <button type="submit" class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-medium text-white transition-colors hover:bg-brand-hover active:bg-brand-hover">
                        ${Icons.check()}
                        ${t('transaction.recordBtn')}
                    </button>
                </form>
            `
        })}
    `,
    
    adminTransactions: () => `
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.clipboardList()}
                    ${t('transaction.familyMoneyHistory')}
                </h1>
                <p class="text-sm text-text-muted">All family transactions</p>
            </div>
            <button class="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium transition-colors hover:bg-surface-soft active:bg-surface-raised sm:w-auto">
                ${Icons.download()}
                Export CSV
            </button>
        </div>
        
        ${Card({
            children: `
                <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table class="w-full min-w-[600px] sm:min-w-0">
                        <thead>
                            <tr class="border-b border-border bg-table-header text-left">
                                <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.member')}</th>
                                <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.fund')}</th>
                                <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.type')}</th>
                                <th class="whitespace-nowrap px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.amount')}</th>
                                <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.reason')}</th>
                                <th class="whitespace-nowrap px-3 py-3 text-xs font-medium uppercase tracking-wider text-text-muted">${t('table.date')}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            ${mockData.transactions.map((tx, i) => `
                                <tr class="${i % 2 ? 'bg-surface-soft' : 'bg-surface'} hover:bg-surface-raised transition-colors">
                                    <td class="whitespace-nowrap px-3 py-3 text-sm font-medium">${tx.memberName}</td>
                                    <td class="whitespace-nowrap px-3 py-3">${PoolTag({ pool: tx.pool })}</td>
                                    <td class="whitespace-nowrap px-3 py-3 text-sm font-medium ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                        ${tx.type === 'credit' ? Icons.arrowUpRight() : Icons.arrowDownRight()}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-3 text-right text-sm font-semibold ${tx.type === 'credit' ? 'text-success' : 'text-error'}">
                                        ${tx.type === 'credit' ? '+' : '-'}${formatCurrency(tx.amount)}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-3 text-sm">${tx.reason}</td>
                                    <td class="whitespace-nowrap px-3 py-3 text-sm text-text-secondary">${formatDate(tx.date)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `
        })}
    `,
    
    adminCareFund: () => {
        const pending = mockData.careFundRequests.filter(r => r.status === 'pending');
        const occasionIcons = {
            birthday: Icons.cake,
            wedding: Icons.ring,
            newBaby: Icons.baby,
            graduation: Icons.graduationCap,
            medical: Icons.stethoscope,
            other: Icons.helpCircle
        };
        return `
            <div class="mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.heartHandshake()}
                    ${t('nav.helpRequests')}
                </h1>
                <p class="text-sm text-text-muted">Review and respond to family help requests</p>
            </div>
            
            <div class="mb-4 flex gap-1 rounded-xl border border-border bg-surface p-1">
                <button class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium bg-brand text-white">
                    ${t('careFund.pending')} <span class="rounded-full bg-white/20 px-2 py-0.5 text-xs">${pending.length}</span>
                </button>
                <button class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-text-secondary">
                    ${t('careFund.accepted')}
                </button>
                <button class="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-text-secondary">
                    ${t('careFund.notApproved')}
                </button>
            </div>
            
            <div class="space-y-4">
                ${pending.map(r => `
                    <div class="rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-sm">
                        <div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div class="flex items-center gap-3">
                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                                    ${occasionIcons[r.occasion]()}
                                </div>
                                <div>
                                    <h3 class="font-semibold">${r.memberName}</h3>
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
                        <div class="flex gap-3">
                            <button onclick="acceptRequest('${r.id}')" class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-success py-3 font-medium text-white transition-colors hover:bg-success/90 active:bg-success/90">
                                ${Icons.check()} Accept
                            </button>
                            <button onclick="showDeclineForm('${r.id}')" class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-error py-3 font-medium text-error transition-colors hover:bg-error/5 active:bg-error/5">
                                ${Icons.x()} Decline
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    adminMembers: () => `
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                    ${Icons.users()}
                    ${t('nav.familyMembers')}
                </h1>
                <p class="text-sm text-text-muted">${mockData.members.length} family members</p>
            </div>
            <button onclick="showAddMemberModal()" class="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 font-medium text-white transition-colors hover:bg-brand-hover active:bg-brand-hover sm:w-auto">
                ${Icons.plus()}
                <span>${t('members.addMember')}</span>
            </button>
        </div>
        
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            ${mockData.members.map(m => `
                <div class="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                    <div class="mb-3 flex items-center gap-3">
                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-lg font-bold text-brand">
                            ${m.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h3 class="font-semibold">${m.name}</h3>
                            <p class="text-xs text-text-muted flex items-center gap-1">
                                ${Icons.clock()} ${m.schedule === 'weekly' ? 'Weekly' : 'Monthly'} saver
                            </p>
                        </div>
                    </div>
                    <div class="mb-3 space-y-2 rounded-xl bg-surface-soft p-3">
                        <div class="flex justify-between text-sm">
                            <span class="text-text-muted flex items-center gap-1">${Icons.target()} Committed</span>
                            <span class="font-medium">${formatCurrency(m.committedAmount)}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-text-muted flex items-center gap-1">${Icons.calendar()} Last Payment</span>
                            <span class="font-medium">${formatDate(m.lastPaymentDate, { month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        ${StatusBadge({ status: m.status })}
                        <button class="text-sm text-brand hover:underline flex items-center gap-1">
                            ${Icons.refreshCw()} ${t('members.resetPassword')}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Add Member Modal -->
        <div id="add-member-modal" class="fixed inset-0 z-50 hidden">
            <div class="absolute inset-0 bg-black/50" onclick="closeAddMemberModal()"></div>
            <div class="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-6 pb-8">
                <div class="mb-6">
                    <h2 class="text-lg font-semibold flex items-center gap-2">
                        ${Icons.userPlus()}
                        ${t('members.addMember')}
                    </h2>
                </div>
                <form onsubmit="handleAddMember(event)" class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.fullName')} <span class="text-error">*</span></label>
                        <input type="text" class="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.password')} <span class="text-error">*</span></label>
                        <input type="password" class="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                    </div>
                    <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-text-primary">${t('members.howMuchEach')}</label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">₦</span>
                            <input type="number" placeholder="0" class="h-12 w-full rounded-xl border border-border bg-surface py-3 pl-8 pr-4 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                        </div>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="button" onclick="closeAddMemberModal()" class="flex h-12 flex-1 items-center justify-center rounded-xl border border-border font-medium">${t('common.cancel')}</button>
                        <button type="submit" class="flex h-12 flex-1 items-center justify-center rounded-xl bg-brand font-medium text-white">${t('members.addMember')}</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    
    notifications: () => {
        const notifications = store.notifications;
        const unread = notifications.filter(n => !n.read).length;
        const typeIcons = {
            success: Icons.checkCircle,
            warning: Icons.alertTriangle,
            info: Icons.info,
            error: Icons.alertCircle
        };
        return `
            <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                        ${Icons.bell()}
                        ${t('nav.notifications')}
                    </h1>
                    <p class="text-sm text-text-muted">${unread} unread</p>
                </div>
                ${unread > 0 ? `
                    <button onclick="store.markAllRead()" class="flex h-11 items-center justify-center gap-2 text-sm font-medium text-brand hover:underline">
                        ${Icons.check()} ${t('common.markAllRead')}
                    </button>
                ` : ''}
            </div>
            
            ${notifications.length === 0 ? EmptyState({ icon: Icons.bell(), message: t('common.allCaughtUp') }) : `
                <div class="space-y-3">
                    ${notifications.map(n => `
                        <div class="flex items-start gap-3 rounded-xl border p-4 ${n.read ? 'border-border bg-surface' : 'border-l-4 border-l-brand bg-brand-light/30'}">
                            <div class="mt-0.5 ${n.type === 'success' ? 'text-success' : n.type === 'warning' ? 'text-warning' : 'text-info'}">
                                ${typeIcons[n.type]()}
                            </div>
                            <div class="flex-1">
                                <p class="text-sm">${n.message}</p>
                                <p class="mt-1 text-xs text-text-muted flex items-center gap-1">
                                    ${Icons.clock()} ${n.time}
                                </p>
                            </div>
                            ${!n.read ? '<span class="h-2 w-2 rounded-full bg-brand"></span>' : ''}
                        </div>
                    `).join('')}
                </div>
            `}
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
    
    if (!name || !password) {
        errorEl.querySelector('span:last-child').textContent = t('validation.required');
        errorEl.classList.remove('hidden');
        return;
    }
    
    errorEl.classList.add('hidden');
    store.setUser({ id: '1', name, role: 'member' });
    store.addNotification('Welcome back, ' + name + '!', 'success');
    router.navigate('/member/dashboard');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    
    if (!name || !password || !confirm) {
        showToast(t('validation.required'), 'error');
        return;
    }
    
    if (password !== confirm) {
        showToast(t('validation.passwordMismatch'), 'error');
        return;
    }
    
    store.setUser({ id: Date.now().toString(), name, role: 'member' });
    store.addNotification('Account created successfully!', 'success');
    router.navigate('/member/dashboard');
}

function handleAdminLogin(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('admin-error');
    
    if (password === 'admin123') {
        store.setUser({ id: 'admin', name: 'Family Manager', role: 'admin' });
        store.addNotification('Welcome, Manager!', 'success');
        router.navigate('/admin/dashboard');
    } else {
        errorEl.querySelector('span:last-child').textContent = t('auth.wrongCredentials');
        errorEl.classList.remove('hidden');
    }
}

function togglePassword(id) {
    const input = document.getElementById(id);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

function setSchedule(schedule) {
    document.getElementById('btn-weekly').className = 'flex-1 rounded-lg py-3 text-sm font-medium transition-colors ' + (schedule === 'weekly' ? 'bg-brand text-white' : 'text-text-secondary');
    document.getElementById('btn-monthly').className = 'flex-1 rounded-lg py-3 text-sm font-medium transition-colors ' + (schedule === 'monthly' ? 'bg-brand text-white' : 'text-text-secondary');
}

function setFund(fund) {
    document.getElementById('fund-pool1').className = 'flex-1 rounded-lg py-3 text-sm font-medium ' + (fund === 'pool1' ? 'bg-brand text-white' : 'text-text-secondary');
    document.getElementById('fund-pool2').className = 'flex-1 rounded-lg py-3 text-sm font-medium ' + (fund === 'pool2' ? 'bg-brand text-white' : 'text-text-secondary');
}

function setTxType(type) {
    document.getElementById('type-credit').className = 'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium ' + (type === 'credit' ? 'bg-success text-white' : 'text-text-secondary');
    document.getElementById('type-debit').className = 'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium ' + (type === 'debit' ? 'bg-error text-white' : 'text-text-secondary');
}

function handleRecordPayment(e) {
    e.preventDefault();
    showToast('Payment recorded successfully!', 'success');
    router.navigate('/admin/transactions');
}

function handleCareFundRequest(e) {
    e.preventDefault();
    showToast('Request sent successfully!', 'success');
}

function acceptRequest(id) {
    showToast('Request accepted!', 'success');
}

function showDeclineForm(id) {
    showToast('Please provide a reason', 'info');
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

function handleAddMember(e) {
    e.preventDefault();
    showToast('Family member added successfully!', 'success');
    closeAddMemberModal();
}
