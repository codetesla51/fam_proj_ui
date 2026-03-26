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

function showToast(message, type = 'success') {
    const container = document.getElementById('toasts');
    const toast = document.createElement('div');
    const colors = {
        success: 'border-success/20 bg-success/10 text-success',
        error: 'border-error/20 bg-error/10 text-error',
        warning: 'border-warning/20 bg-warning/10 text-warning',
        info: 'border-info/20 bg-info/10 text-info'
    };
    const icons = {
        success: Icons.checkCircle(),
        error: Icons.alertCircle(),
        warning: Icons.alertTriangle(),
        info: Icons.info()
    };
    
    toast.className = `flex items-center gap-3 rounded-lg border p-4 shadow-lg animate-slide-up ${colors[type]}`;
    toast.innerHTML = `
        <span class="shrink-0">${icons[type]}</span>
        <span class="text-sm font-medium">${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
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
