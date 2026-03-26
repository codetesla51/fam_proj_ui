// Shared Components with Lucide Icons

// Icon helper - creates SVG string from Lucide icon name
function icon(name, className = 'icon icon-md') {
    return `<i data-lucide="${name}" class="${className}"></i>`;
}

const Icons = {
    home: () => icon('home'),
    wallet: () => icon('wallet'),
    heart: () => icon('heart-handshake'),
    history: () => icon('file-text'),
    settings: () => icon('settings'),
    layoutDashboard: () => icon('layout-dashboard'),
    plusCircle: () => icon('plus-circle'),
    clipboardList: () => icon('clipboard-list'),
    users: () => icon('users'),
    bell: () => icon('bell'),
    logOut: () => icon('log-out'),
    globe: () => icon('globe'),
    menu: () => icon('menu'),
    x: () => icon('x'),
    check: () => icon('check'),
    arrowUpRight: () => icon('arrow-up-right'),
    arrowDownRight: () => icon('arrow-down-right'),
    download: () => icon('download'),
    externalLink: () => icon('external-link'),
    alertCircle: () => icon('alert-circle'),
    info: () => icon('info'),
    checkCircle: () => icon('check-circle'),
    xCircle: () => icon('x-circle'),
    alertTriangle: () => icon('alert-triangle'),
    plus: () => icon('plus'),
    refreshCw: () => icon('refresh-cw'),
    shield: () => icon('shield'),
    user: () => icon('user'),
    lock: () => icon('lock'),
    mail: () => icon('mail'),
    calendar: () => icon('calendar'),
    clock: () => icon('clock'),
    piggyBank: () => icon('piggy-bank'),
    dollarSign: () => icon('dollar-sign'),
    trendingUp: () => icon('trending-up'),
    trendingDown: () => icon('trending-down'),
    filePlus: () => icon('file-plus'),
    trash2: () => icon('trash-2'),
    edit: () => icon('edit'),
    search: () => icon('search'),
    filter: () => icon('filter'),
    moreVertical: () => icon('more-vertical'),
    chevronRight: () => icon('chevron-right'),
    chevronLeft: () => icon('chevron-left'),
    chevronDown: () => icon('chevron-down'),
    arrowLeft: () => icon('arrow-left'),
    eye: () => icon('eye'),
    eyeOff: () => icon('eye-off'),
    upload: () => icon('upload'),
    camera: () => icon('camera'),
    gift: () => icon('gift'),
    cake: () => icon('cake'),
    ring: () => icon('ring'),
    baby: () => icon('baby'),
    graduationCap: () => icon('graduation-cap'),
    stethoscope: () => icon('stethoscope'),
    helpCircle: () => icon('help-circle'),
    wrench: () => icon('wrench'),
    power: () => icon('power'),
    wifi: () => icon('wifi'),
    wifiOff: () => icon('wifi-off'),
    loader: () => icon('loader-2'),
    spinner: () => icon('loader'),
    zap: () => icon('zap'),
    creditCard: () => icon('credit-card'),
    building: () => icon('building'),
    handshake: () => icon('handshake'),
    umbrella: () => icon('umbrella'),
    heartHandshake: () => icon('heart-handshake'),
    target: () => icon('target'),
    trophy: () => icon('trophy'),
    star: () => icon('star'),
    flag: () => icon('flag'),
    messageSquare: () => icon('message-square'),
    phone: () => icon('phone'),
    mailOpen: () => icon('mail-open'),
    send: () => icon('send'),
    copy: () => icon('copy'),
    clipboard: () => icon('clipboard'),
    archive: () => icon('archive'),
    barChart: () => icon('bar-chart-2'),
    pieChart: () => icon('pie-chart'),
    activity: () => icon('activity'),
    trendingUp2: () => icon('trending-up'),
    trendingDown2: () => icon('trending-down'),
    moveRight: () => icon('move-right'),
    moveLeft: () => icon('move-left'),
    repeat: () => icon('repeat'),
    rotateCcw: () => icon('rotate-ccw'),
    rotateCw: () => icon('rotate-cw'),
    checkSquare: () => icon('check-square'),
    square: () => icon('square'),
    circle: () => icon('circle'),
    alertOctagon: () => icon('alert-octagon'),
    alertTriangle2: () => icon('alert-triangle'),
    bulb: () => icon('lightbulb'),
    bookmark: () => icon('bookmark'),
    bookmarkOpen: () => icon('bookmark-open'),
    tag: () => icon('tag'),
    tags: () => icon('tags'),
    shoppingBag: () => icon('shopping-bag'),
    package: () => icon('package'),
    box: () => icon('box'),
    inbox: () => icon('inbox'),
    sendHorizonal: () => icon('send-horizontal'),
    paperclip: () => icon('paperclip'),
    link: () => icon('link'),
    link2: () => icon('link-2'),
    unlink: () => icon('unlink'),
    maximize: () => icon('maximize'),
    minimize: () => icon('minimize'),
    zoomIn: () => icon('zoom-in'),
    zoomOut: () => icon('zoom-out'),
    move: () => icon('move'),
    expand: () => icon('expand'),
    compress: () => icon('compress'),
    externalLink2: () => icon('external-link'),
    checkCircle2: () => icon('check-circle-2'),
    xCircle2: () => icon('x-circle-2'),
    info2: () => icon('info'),
    helpCircle2: () => icon('help-circle'),
    alertCircle2: () => icon('alert-circle'),
    alertTriangle3: () => icon('alert-triangle'),
    minus: () => icon('minus'),
    plus2: () => icon('plus'),
    divide: () => icon('divide'),
    multiply: () => icon('multiply'),
    minus2: () => icon('minus'),
    plus3: () => icon('plus'),
    equals: () => icon('equals'),
    percent: () => icon('percent'),
    hash: () => icon('hash'),
    atSign: () => icon('at-sign'),
    percent2: () => icon('percent'),
    circleDot: () => icon('circle-dot'),
    circleDash: () => icon('circle-dashed'),
    circleEllipsis: () => icon('circle-ellipsis'),
    crosshair: () => icon('crosshair'),
    target2: () => icon('target'),
    
    // Occasion icons
    birthday: () => icon('cake'),
    wedding: () => icon('ring'),
    newBaby: () => icon('baby'),
    graduation: () => icon('graduation-cap'),
    medical: () => icon('stethoscope'),
    other: () => icon('help-circle'),
    
    // Status icons
    checkCircle3: () => icon('check-circle'),
    xCircle3: () => icon('x-circle'),
    clock3: () => icon('clock')
};

function Nav({ currentPath }) {
    const isAdmin = store.isAdmin();
    const user = store.user;
    const unread = store.unreadCount();
    
    const memberNav = [
        { href: '/member/dashboard', label: t('nav.home'), icon: Icons.home },
        { href: '/member/savings', label: t('nav.mySavings'), icon: Icons.wallet },
        { href: '/member/care-fund', label: t('nav.careFund'), icon: Icons.heartHandshake },
        { href: '/member/history', label: t('nav.myHistory'), icon: Icons.history }
    ];
    
    const adminNav = [
        { href: '/admin/dashboard', label: t('nav.home'), icon: Icons.layoutDashboard },
        { href: '/admin/transactions/new', label: t('nav.recordPayment'), icon: Icons.plusCircle },
        { href: '/admin/transactions', label: t('nav.familySavings'), icon: Icons.clipboardList },
        { href: '/admin/care-fund', label: t('nav.helpRequests'), icon: Icons.heartHandshake },
        { href: '/admin/members', label: t('nav.familyMembers'), icon: Icons.users }
    ];
    
    const nav = isAdmin ? adminNav : memberNav;
    
    return `
        <nav class="sticky top-0 z-40 border-b border-border bg-surface">
            <div class="flex h-14 items-center justify-between px-4">
                <div class="flex items-center gap-4">
                    <button onclick="toggleMobileMenu()" class="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-surface-soft active:bg-surface-raised md:hidden">
                        ${Icons.menu()}
                    </button>
                    <span class="text-lg font-bold text-brand flex items-center gap-2">
                        <span class="text-brand">${Icons.building()}</span>
                        ${t('app.name')}
                    </span>
                </div>
                <div class="flex items-center gap-1 sm:gap-2">
                    <a href="/notifications" class="relative flex h-11 w-11 items-center justify-center rounded-xl hover:bg-surface-soft active:bg-surface-raised">
                        ${Icons.bell()}
                        ${unread > 0 ? `<span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">${unread > 9 ? '9+' : unread}</span>` : ''}
                    </a>
                    <button onclick="openLangModal()" class="flex h-11 items-center gap-2 rounded-xl px-3 text-text-secondary hover:bg-surface-soft active:bg-surface-raised sm:px-4">
                        ${Icons.globe()}
                        <span class="hidden sm:inline text-sm font-medium">${getCurrentLangName()}</span>
                    </button>
                    ${user ? `
                        <button onclick="store.logout()" class="flex h-11 w-11 items-center justify-center rounded-xl text-text-secondary hover:bg-surface-soft active:bg-surface-raised hover:text-error">
                            ${Icons.logOut()}
                        </button>
                    ` : ''}
                </div>
            </div>
        </nav>
        
        <!-- Desktop Sidebar -->
        <aside class="hidden w-64 flex-shrink-0 border-r border-border bg-surface md:block lg:w-64">
            <nav class="sticky top-14 flex flex-col gap-1 p-4">
                ${nav.map(item => `
                    <a href="${item.href}" 
                       class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${currentPath === item.href || currentPath.startsWith(item.href + '/') ? 'bg-brand-light text-brand' : 'text-text-secondary hover:bg-surface-soft active:bg-surface-raised'}">
                        <span class="text-lg">${item.icon()}</span>
                        <span>${item.label}</span>
                    </a>
                `).join('')}
                <div class="my-4 border-t border-border"></div>
                <a href="${isAdmin ? '/admin/dashboard' : '/member/settings'}" 
                   class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${currentPath === '/member/settings' ? 'bg-brand-light text-brand' : 'text-text-secondary hover:bg-surface-soft active:bg-surface-raised'}">
                    <span class="text-lg">${Icons.settings()}</span>
                    <span>${t('nav.settings')}</span>
                </a>
            </nav>
        </aside>
        
        <!-- Mobile Menu Overlay -->
        <div id="mobile-menu" class="fixed inset-0 z-50 hidden md:hidden">
            <div class="absolute inset-0 bg-black/50" onclick="toggleMobileMenu()"></div>
            <aside class="absolute bottom-0 left-0 right-0 top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto rounded-t-3xl bg-surface">
                <nav class="flex flex-col gap-1 p-4 pb-8">
                    ${nav.map(item => `
                        <a href="${item.href}" onclick="toggleMobileMenu()"
                           class="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium ${currentPath === item.href ? 'bg-brand-light text-brand' : 'text-text-primary'}">
                            <span class="text-2xl text-brand">${item.icon()}</span>
                            <span>${item.label}</span>
                        </a>
                    `).join('')}
                    <div class="my-4 border-t border-border"></div>
                    <a href="${isAdmin ? '/admin/dashboard' : '/member/settings'}" onclick="toggleMobileMenu()"
                       class="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium text-text-primary">
                        <span class="text-2xl text-brand">${Icons.settings()}</span>
                        <span>${t('nav.settings')}</span>
                    </a>
                </nav>
            </aside>
        </div>
        
        <!-- Mobile Bottom Nav -->
        <nav class="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-surface md:hidden">
            <div class="flex h-16 items-center justify-around px-1">
                ${nav.slice(0, 4).map(item => `
                    <a href="${item.href}" 
                       class="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium ${currentPath === item.href ? 'text-brand' : 'text-text-muted'}">
                        <span class="text-xl sm:text-2xl">${item.icon()}</span>
                        <span class="hidden sm:inline">${item.label}</span>
                    </a>
                `).join('')}
            </div>
        </nav>
    `;
}

function getCurrentLangName() {
    const langs = { en: 'English', yo: 'Yorùbá', ig: 'Igbo', ha: 'Hausa' };
    return langs[currentLang] || 'English';
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

function Card({ title, subtitle, children }) {
    return `
        <div class="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
            ${title ? `
                <div class="mb-4">
                    <h2 class="text-lg font-semibold text-text-primary flex items-center gap-2">
                        ${title === t('member.recentPayments') ? Icons.history() : ''}
                        ${title === t('admin.behindOnSavings') ? Icons.alertCircle() : ''}
                        ${title === t('transaction.familyMoneyHistory') ? Icons.clipboardList() : ''}
                        ${title}
                    </h2>
                    ${subtitle ? `<p class="mt-1 text-sm text-text-muted">${subtitle}</p>` : ''}
                </div>
            ` : ''}
            ${children}
        </div>
    `;
}

function KpiCard({ label, amount, subtext, highlight }) {
    return `
        <div class="rounded-2xl border p-4 shadow-sm sm:p-5 ${highlight ? 'border-brand bg-brand-light' : 'border-border bg-surface'}">
            <div class="mb-1 text-xs font-medium uppercase tracking-wider text-text-muted flex items-center gap-1">
                ${highlight ? `<span class="text-brand">${Icons.piggyBank()}</span>` : ''}
                ${label === 'Family Savings' ? Icons.piggyBank() : ''}
                ${label === 'Care Fund' ? Icons.heartHandshake() : ''}
                ${label === 'Last Payment' ? Icons.clock() : ''}
                ${label === 'Alerts' ? Icons.bell() : ''}
                ${label === 'Pending Help Requests' ? Icons.alertCircle() : ''}
                ${label === 'Family Members' ? Icons.users() : ''}
                ${label}
            </div>
            <div class="text-xl sm:text-2xl font-bold text-text-primary">${formatCurrency(amount)}</div>
            ${subtext ? `<div class="mt-1 text-xs text-text-secondary flex items-center gap-1">${subtext.includes('up to date') ? Icons.checkCircle() : ''}${subtext.includes('behind') ? Icons.alertTriangle() : ''}${subtext}</div>` : ''}
        </div>
    `;
}

function StatusBadge({ status }) {
    const configs = {
        pending: { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning', icon: Icons.clock, label: t('careFund.pending') },
        accepted: { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success', icon: Icons.checkCircle, label: t('careFund.accepted') },
        rejected: { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error', icon: Icons.xCircle, label: t('careFund.notApproved') },
        active: { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success', icon: Icons.checkCircle, label: 'Up to date' },
        behind: { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error', icon: Icons.alertTriangle, label: 'Behind' }
    };
    const cfg = configs[status] || configs.pending;
    return `<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}"><span class="h-1.5 w-1.5 rounded-full ${cfg.dot}"></span>${cfg.label}</span>`;
}

function PoolTag({ pool }) {
    return pool === 'pool1' 
        ? `<span class="inline-flex items-center gap-1 rounded-full bg-pool1/10 px-2.5 py-1 text-xs font-medium text-pool1">${Icons.piggyBank()} ${t('member.familySavings')}</span>`
        : `<span class="inline-flex items-center gap-1 rounded-full bg-pool2/10 px-2.5 py-1 text-xs font-medium text-pool2">${Icons.heartHandshake()} ${t('member.careFund')}</span>`;
}

function EmptyState({ icon, message }) {
    return `
        <div class="flex flex-col items-center justify-center py-12 px-4">
            <span class="text-5xl text-text-muted mb-4">${icon}</span>
            <p class="text-center text-sm text-text-muted">${message}</p>
        </div>
    `;
}

function Button({ text, onclick, variant = 'primary', className = '', icon }) {
    const variants = {
        primary: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-hover',
        secondary: 'bg-surface border border-border text-text-primary hover:bg-surface-soft active:bg-surface-raised',
        danger: 'bg-error text-white hover:bg-error/90 active:bg-error/90',
        success: 'bg-success text-white hover:bg-success/90 active:bg-success/90',
        ghost: 'text-text-secondary hover:bg-surface-soft active:bg-surface-raised'
    };
    
    return `
        <button onclick="${onclick}" class="flex h-12 items-center justify-center gap-2 rounded-xl px-6 font-medium transition-colors active:scale-98 disabled:opacity-50 ${variants[variant]} ${className}">
            ${icon ? `<span class="text-lg">${icon}</span>` : ''}
            ${text}
        </button>
    `;
}

function LoadingSpinner({ size = 'md' }) {
    const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
    return `<div class="animate-spin rounded-full border-2 border-brand border-t-transparent ${sizes[size]}"></div>`;
}
