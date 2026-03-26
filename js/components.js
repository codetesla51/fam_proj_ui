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
    buildingBank: () => icon('building-bank'),
    handshake: () => icon('handshake'),
    megaphone: () => icon('megaphone'),
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
    logIn: () => icon('log-in'),
    logOut: () => icon('log-out'),
    userPlus: () => icon('user-plus'),
    ring: () => icon('gem'),
    baby: () => icon('baby'),
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
    
    function isActive(href) {
        const isExactMatch = href === '/admin/transactions';
        return isExactMatch 
            ? currentPath === href 
            : currentPath === href || currentPath.startsWith(href + '/');
    }
    
    function navItems() {
        return nav.map(item => {
            const active = isActive(item.href);
            return `
                <a href="${item.href}" class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium select-none active:opacity-70 ${active ? 'bg-brand-light text-brand' : 'text-text-secondary active:bg-surface-raised'}">
                    <span class="text-lg">${item.icon()}</span>
                    <span>${item.label}</span>
                </a>
            `;
        }).join('');
    }
    
    function mobileNavItems() {
        return nav.map(item => `
            <a href="${item.href}" onclick="toggleMobileMenu()" class="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium select-none active:opacity-70 ${currentPath === item.href ? 'bg-brand-light text-brand' : 'text-text-primary'}">
                <span class="text-2xl text-brand">${item.icon()}</span>
                <span>${item.label}</span>
            </a>
        `).join('');
    }
    
    function bottomNavItems() {
        return nav.slice(0, 4).map(item => {
            const active = currentPath === item.href;
            return `
                <a href="${item.href}" class="flex flex-1 flex-col items-center justify-center gap-1 py-2 select-none active:opacity-70 ${active ? 'text-brand' : 'text-text-muted'}">
                    <span class="w-6 h-6">${item.icon()}</span>
                    <span class="text-[10px] font-medium tracking-wide">${item.label}</span>
                    ${active ? '<span class="w-8 h-1 rounded-full bg-brand mx-auto mt-1"></span>' : ''}
                </a>
            `;
        }).join('');
    }
    
    const settingsHref = isAdmin ? '/admin/dashboard' : '/member/settings';
    const settingsActive = currentPath === '/member/settings';
    
    return {
        topNav: `
            <div class="bg-surface border-b border-border">
                <div class="flex h-14 items-center justify-between px-4">
                    <div class="flex items-center gap-3">
                        <button onclick="toggleMobileMenu()" class="flex h-10 w-10 items-center justify-center rounded-xl select-none active:bg-surface-soft md:hidden">
                            ${Icons.menu()}
                        </button>
                        <a href="${isAdmin ? '/admin/dashboard' : '/member/dashboard'}" class="hidden sm:flex items-center gap-2.5 text-brand select-none">
                            ${Icons.building()}
                            <span class="text-base font-bold">${t('app.name')}</span>
                        </a>
                    </div>
                    <div class="flex items-center gap-1">
                        <a href="/notifications" class="relative flex h-10 w-10 items-center justify-center rounded-xl active:bg-surface-soft select-none">
                            ${Icons.bell()}
                            ${unread > 0 ? `<span class="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">${unread > 9 ? '9+' : unread}</span>` : ''}
                        </a>
                        <button onclick="openLangModal()" class="flex h-10 items-center gap-1.5 rounded-xl px-2.5 text-text-secondary active:bg-surface-soft sm:px-3 select-none">
                            ${Icons.globe()}
                            <span class="hidden sm:inline text-xs font-medium">${getCurrentLangName()}</span>
                        </button>
                        ${user ? `
                            <button onclick="store.logout()" class="flex h-10 w-10 items-center justify-center rounded-xl text-text-muted active:bg-surface-soft active:text-error select-none">
                                ${Icons.logOut()}
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `,
        sidebar: `
            <nav class="flex flex-col gap-1 p-4 overflow-y-auto">
                ${navItems()}
                <div class="my-4 border-t border-border"></div>
                <a href="${settingsHref}" class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium select-none active:opacity-70 ${settingsActive ? 'bg-brand-light text-brand' : 'text-text-secondary active:bg-surface-raised'}">
                    <span class="text-lg">${Icons.settings()}</span>
                    <span>${t('nav.settings')}</span>
                </a>
            </nav>
        `,
        mobileMenu: `
            <div id="mobile-menu" class="fixed inset-0 z-50 hidden md:hidden">
                <div class="absolute inset-0 bg-black/50" onclick="toggleMobileMenu()"></div>
                <aside class="absolute bottom-0 left-0 right-0 top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto rounded-t-3xl bg-surface">
                    <nav class="flex flex-col gap-1 p-4 pb-8">
                        ${mobileNavItems()}
                        <div class="my-4 border-t border-border"></div>
                        <a href="${settingsHref}" onclick="toggleMobileMenu()" class="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium text-text-primary select-none active:opacity-70">
                            <span class="text-2xl text-brand">${Icons.settings()}</span>
                            <span>${t('nav.settings')}</span>
                        </a>
                    </nav>
                </aside>
            </div>
        `,
        bottomNav: `
            <div class="bg-surface border-t border-border shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
                <div class="flex h-16 items-center justify-around">
                    ${bottomNavItems()}
                </div>
            </div>
        `
    };
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
        <div class="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 hover:shadow-md transition-shadow">
            ${title ? `
                <div class="mb-5">
                    <h2 class="text-lg font-bold text-text-primary flex items-center gap-2">
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

function KpiCard({ label, amount, subtext, highlight, isCurrency = true }) {
    return `
        <div class="rounded-2xl border p-5 shadow-sm sm:p-6 transition-all hover:shadow-lg hover:shadow-brand/5 group ${highlight ? 'border-brand/30 bg-gradient-to-br from-brand-light to-white shadow-lg shadow-brand/10' : 'border-border bg-surface'}">
            <div class="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                ${highlight ? `<span class="text-brand">${Icons.piggyBank()}</span>` : ''}
                ${label === 'Family Savings' ? Icons.piggyBank() : ''}
                ${label === 'Care Fund' ? Icons.heartHandshake() : ''}
                ${label === 'Last Payment' ? Icons.clock() : ''}
                ${label === 'Alerts' ? Icons.bell() : ''}
                ${label === 'Pending Help Requests' ? Icons.alertCircle() : ''}
                ${label === 'Family Members' ? Icons.users() : ''}
                ${label}
            </div>
            <div class="text-2xl sm:text-3xl font-extrabold text-text-primary group-hover:scale-105 transition-transform origin-left">${isCurrency ? formatCurrency(amount) : amount}</div>
            ${subtext ? `<div class="mt-2 text-xs text-text-secondary flex items-center gap-1.5 font-medium">${subtext.includes('up to date') ? Icons.checkCircle() : ''}${subtext.includes('behind') ? Icons.alertTriangle() : ''}${subtext}</div>` : ''}
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
    return `<span class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${cfg.bg} ${cfg.text}"><span class="h-2 w-2 rounded-full ${cfg.dot} animate-pulse"></span>${cfg.label}</span>`;
}

function PoolTag({ pool }) {
    return pool === 'pool1' 
        ? `<span class="inline-flex items-center gap-1.5 rounded-full bg-pool1/10 px-3 py-1.5 text-xs font-bold text-pool1">${Icons.piggyBank()} ${t('member.familySavings')}</span>`
        : `<span class="inline-flex items-center gap-1.5 rounded-full bg-pool2/10 px-3 py-1.5 text-xs font-bold text-pool2">${Icons.heartHandshake()} ${t('member.careFund')}</span>`;
}

function EmptyState({ icon, message }) {
    return `
        <div class="flex flex-col items-center justify-center py-16 px-6">
            <div class="relative mb-5">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-surface-soft">
                    <span class="text-4xl text-text-muted">${icon}</span>
                </div>
                <div class="absolute inset-0 rounded-full bg-brand/5 animate-pulse"></div>
            </div>
            <p class="text-center text-sm text-text-secondary font-medium">${message}</p>
            <p class="mt-2 text-xs text-text-muted">Check back later for updates</p>
        </div>
    `;
}

function Button({ text, onclick, variant = 'primary', className = '', icon }) {
    const variants = {
        primary: 'bg-brand text-white hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/25',
        secondary: 'bg-surface border-2 border-border text-text-primary hover:border-brand hover:text-brand hover:bg-brand-light/30',
        danger: 'bg-error text-white hover:bg-error/90 hover:shadow-lg hover:shadow-error/25',
        success: 'bg-success text-white hover:bg-success/90 hover:shadow-lg hover:shadow-success/25',
        ghost: 'text-text-secondary hover:bg-surface-soft hover:text-text-primary'
    };
    
    return `
        <button onclick="${onclick}" class="flex h-12 items-center justify-center gap-2 rounded-xl px-6 font-semibold transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 select-none ${variants[variant]} ${className}">
            ${icon ? `<span class="text-lg">${icon}</span>` : ''}
            ${text}
        </button>
    `;
}

function LoadingSpinner({ size = 'md' }) {
    const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
    return `<div class="animate-spin rounded-full border-2 border-brand border-t-transparent ${sizes[size]}"></div>`;
}

// Date Picker Component
let selectedDate = null;

function DatePicker({ id = 'date-picker', label = '', placeholder = 'Select a date' }) {
    const today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `
        <div class="relative" id="${id}-wrapper">
            <input type="hidden" id="${id}-value" value="">
            <button type="button" onclick="toggleDatePicker('${id}')" id="${id}-button"
                class="flex h-12 w-full min-w-0 items-center justify-between rounded-xl border-2 border-border bg-surface px-4 text-left text-sm transition-all hover:border-brand/50 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                <span class="flex items-center gap-2 text-text-muted" id="${id}-display">
                    ${Icons.calendar()} ${placeholder}
                </span>
                ${Icons.chevronDown()}
            </button>
            <div id="${id}-dropdown" class="hidden absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-border bg-surface shadow-xl shadow-brand/10">
                <div class="p-4">
                    <!-- Month/Year Selector -->
                    <div class="mb-4 flex items-center justify-between">
                        <button type="button" onclick="prevMonth('${id}')" class="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary hover:bg-surface-soft active:bg-surface-raised select-none">
                            ${Icons.chevronLeft()}
                        </button>
                        <div class="flex items-center gap-2">
                            <select id="${id}-month" onchange="updateCalendar('${id}')" class="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold focus:border-brand focus:outline-none">
                                ${monthNames.map((m, i) => `<option value="${i}">${m}</option>`).join('')}
                            </select>
                            <select id="${id}-year" onchange="updateCalendar('${id}')" class="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold focus:border-brand focus:outline-none">
                                ${Array.from({length: 10}, (_, i) => today.getFullYear() - 5 + i).map(y => `<option value="${y}">${y}</option>`).join('')}
                            </select>
                        </div>
                        <button type="button" onclick="nextMonth('${id}')" class="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary hover:bg-surface-soft active:bg-surface-raised select-none">
                            ${Icons.chevronRight()}
                        </button>
                    </div>
                    
                    <!-- Calendar Grid -->
                    <div class="mb-3 grid grid-cols-7 gap-1 text-center">
                        ${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => `<div class="py-2 text-[11px] font-bold uppercase text-text-muted">${d}</div>`).join('')}
                    </div>
                    <div id="${id}-days" class="grid grid-cols-7 gap-1">
                    </div>
                    
                    <!-- Today Button -->
                    <div class="mt-4 border-t border-border pt-4">
                        <button type="button" onclick="selectToday('${id}')" class="w-full rounded-xl bg-brand-light py-2.5 text-sm font-semibold text-brand hover:bg-brand/20 active:bg-brand/30 transition-colors select-none">
                            Today
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initDatePicker(id) {
    const monthSelect = document.getElementById(`${id}-month`);
    const yearSelect = document.getElementById(`${id}-year`);
    if (monthSelect && yearSelect) {
        const now = new Date();
        monthSelect.value = now.getMonth();
        yearSelect.value = now.getFullYear();
        updateCalendar(id);
    }
}

function updateCalendar(id) {
    const monthSelect = document.getElementById(`${id}-month`);
    const yearSelect = document.getElementById(`${id}-year`);
    const daysContainer = document.getElementById(`${id}-days`);
    
    if (!monthSelect || !yearSelect || !daysContainer) return;
    
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let html = '';
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        html += '<div></div>';
    }
    
    // Day buttons
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const isSelected = selectedDate && selectedDate.day === day && selectedDate.month === month && selectedDate.year === year;
        
        html += `
            <button type="button" onclick="selectDay('${id}', ${day})" 
                class="flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium transition-all select-none
                    ${isSelected ? 'bg-brand text-white' : isToday ? 'bg-brand-light text-brand font-bold' : 'hover:bg-surface-soft text-text-primary'}">
                ${day}
            </button>
        `;
    }
    
    daysContainer.innerHTML = html;
}

function toggleDatePicker(id) {
    const dropdown = document.getElementById(`${id}-dropdown`);
    if (dropdown) {
        dropdown.classList.toggle('hidden');
        if (!dropdown.classList.contains('hidden')) {
            initDatePicker(id);
        }
    }
}

function selectDay(id, day) {
    const monthSelect = document.getElementById(`${id}-month`);
    const yearSelect = document.getElementById(`${id}-year`);
    const display = document.getElementById(`${id}-display`);
    const hiddenInput = document.getElementById(`${id}-value`);
    
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    selectedDate = { day, month, year };
    
    const formatted = `${monthNames[month]} ${day}, ${year}`;
    display.innerHTML = `${Icons.calendar()} ${formatted}`;
    hiddenInput.value = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    document.getElementById(`${id}-dropdown`).classList.add('hidden');
    updateCalendar(id);
}

function selectToday(id) {
    const today = new Date();
    selectDay(id, today.getDate());
}

function prevMonth(id) {
    const monthSelect = document.getElementById(`${id}-month`);
    const yearSelect = document.getElementById(`${id}-year`);
    
    let month = parseInt(monthSelect.value) - 1;
    let year = parseInt(yearSelect.value);
    
    if (month < 0) { month = 11; year--; }
    
    monthSelect.value = month;
    yearSelect.value = year;
    updateCalendar(id);
}

function nextMonth(id) {
    const monthSelect = document.getElementById(`${id}-month`);
    const yearSelect = document.getElementById(`${id}-year`);
    
    let month = parseInt(monthSelect.value) + 1;
    let year = parseInt(yearSelect.value);
    
    if (month > 11) { month = 0; year++; }
    
    monthSelect.value = month;
    yearSelect.value = year;
    updateCalendar(id);
}

// Close date picker when clicking outside
document.addEventListener('click', (e) => {
    document.querySelectorAll('[id$="-dropdown"]:not(.hidden)').forEach(dropdown => {
        const wrapper = dropdown.parentElement;
        if (!wrapper.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
});

// Skeleton Loader Component
function Skeleton({ type = 'card', count = 1 }) {
    const pulse = 'animate-pulse bg-surface-raised';
    
    if (type === 'kpi') {
        return Array.from({ length: count }, () => `
            <div class="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                <div class="${pulse} mb-2 h-3 w-24 rounded-lg"></div>
                <div class="${pulse} h-8 w-32 rounded-lg"></div>
                <div class="${pulse} mt-2 h-3 w-20 rounded-lg"></div>
            </div>
        `).join('');
    }
    
    if (type === 'table') {
        return Array.from({ length: count }, (_, i) => `
            <div class="flex items-center gap-4 p-4 border-b border-border">
                <div class="${pulse} h-10 w-10 rounded-full flex-shrink-0"></div>
                <div class="flex-1">
                    <div class="${pulse} h-4 w-32 rounded-lg mb-2"></div>
                    <div class="${pulse} h-3 w-20 rounded-lg"></div>
                </div>
                <div class="${pulse} h-5 w-20 rounded-lg"></div>
            </div>
        `).join('');
    }
    
    if (type === 'card-list') {
        return Array.from({ length: count }, () => `
            <div class="rounded-2xl border border-border bg-surface p-4">
                <div class="flex items-center gap-3 mb-3">
                    <div class="${pulse} h-12 w-12 rounded-full flex-shrink-0"></div>
                    <div class="flex-1">
                        <div class="${pulse} h-4 w-28 rounded-lg mb-2"></div>
                        <div class="${pulse} h-3 w-16 rounded-lg"></div>
                    </div>
                </div>
                <div class="${pulse} h-3 w-full rounded-lg mb-2"></div>
                <div class="${pulse} h-3 w-3/4 rounded-lg"></div>
            </div>
        `).join('');
    }
    
    if (type === 'member-card') {
        return Array.from({ length: count }, () => `
            <div class="rounded-2xl border border-border bg-surface p-5">
                <div class="flex items-center gap-3 mb-4">
                    <div class="${pulse} h-14 w-14 rounded-2xl flex-shrink-0"></div>
                    <div class="flex-1">
                        <div class="${pulse} h-5 w-32 rounded-lg mb-2"></div>
                        <div class="${pulse} h-3 w-24 rounded-lg"></div>
                    </div>
                </div>
                <div class="rounded-xl bg-surface-soft p-4 space-y-3">
                    <div class="${pulse} h-4 w-full rounded-lg"></div>
                    <div class="${pulse} h-4 w-3/4 rounded-lg"></div>
                </div>
            </div>
        `).join('');
    }
    
    // Default card skeleton
    return Array.from({ length: count }, () => `
        <div class="rounded-2xl border border-border bg-surface p-4">
            <div class="${pulse} h-4 w-32 rounded-lg mb-3"></div>
            <div class="${pulse} h-3 w-full rounded-lg mb-2"></div>
            <div class="${pulse} h-3 w-3/4 rounded-lg"></div>
        </div>
    `).join('');
}
