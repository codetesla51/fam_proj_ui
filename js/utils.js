// Utilities

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateStr, options = {}) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        ...options
    });
}

function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('en-NG', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return t('common.justNow');
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return t('common.yesterday');
    if (days < 7) return `${days}d ago`;
    return formatDate(dateStr);
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return t('member.greeting.morning');
    if (hour < 18) return t('member.greeting.afternoon');
    return t('member.greeting.evening');
}

function getCurrentSeason() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
}

function showToast(message, type = 'success', duration = 4000) {
    const container = document.getElementById('toasts');
    const toast = document.createElement('div');
    
    const config = {
        success: { bg: 'bg-white', border: 'border-emerald-200', icon: Icons.checkCircle, iconColor: 'text-emerald-600', title: 'Done' },
        error: { bg: 'bg-white', border: 'border-red-200', icon: Icons.alertCircle, iconColor: 'text-red-600', title: 'Something went wrong' },
        warning: { bg: 'bg-white', border: 'border-amber-200', icon: Icons.alertTriangle, iconColor: 'text-amber-600', title: 'Heads up' },
        info: { bg: 'bg-white', border: 'border-sky-200', icon: Icons.info, iconColor: 'text-sky-600', title: 'FYI' }
    };
    
    const cfg = config[type] || config.info;
    
    toast.className = `flex items-start gap-3 rounded-2xl border ${cfg.border} ${cfg.bg} p-4 shadow-lg animate-slide-up pointer-events-auto`;
    toast.innerHTML = `
        <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${cfg.iconColor}">
            ${cfg.icon()}
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">${cfg.title}</p>
            <p class="text-sm font-medium text-text-primary mt-0.5 leading-snug">${message}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="flex-shrink-0 text-text-muted hover:text-text-secondary">
            ${Icons.x()}
        </button>
    `;
    
    container.appendChild(toast);
    
    // Initialize icons in toast
    if (window.lucide) window.lucide.createIcons();
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'flex items-center justify-center p-4';
    loader.innerHTML = `<div class="loader"></div>`;
    element.innerHTML = '';
    element.appendChild(loader);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function isMobile() {
    return window.innerWidth < 640;
}

function isTablet() {
    return window.innerWidth >= 640 && window.innerWidth < 1024;
}

function isDesktop() {
    return window.innerWidth >= 1024;
}

function getBreakpoint() {
    if (window.innerWidth < 640) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function el(className, children = []) {
    const elem = document.createElement('div');
    elem.className = className;
    children.forEach(child => {
        if (typeof child === 'string') {
            elem.appendChild(document.createTextNode(child));
        } else if (child) {
            elem.appendChild(child);
        }
    });
    return elem;
}

function btn(text, className, onclick) {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    if (onclick) button.addEventListener('click', onclick);
    return button;
}
