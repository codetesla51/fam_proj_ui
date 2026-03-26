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
    if (hour >= 5 && hour < 12) return t('member.greeting.morning');
    if (hour >= 12 && hour < 17) return t('member.greeting.afternoon');
    if (hour >= 17 && hour < 21) return t('member.greeting.evening');
    return t('member.greeting.night');
}

function getCurrentSeason() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
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

// Form Validation
function validateField(input, rules = {}) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    if (rules.required && !value) {
        isValid = false;
        message = t('validation.required');
    } else if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        message = `Minimum ${rules.minLength} characters required`;
    } else if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        message = 'Please enter a valid email';
    } else if (rules.match) {
        const matchInput = document.getElementById(rules.match);
        if (matchInput && value !== matchInput.value) {
            isValid = false;
            message = t('validation.passwordMismatch');
        }
    }
    
    // Update input styling
    const wrapper = input.closest('.space-y-2') || input.parentElement;
    const existingError = wrapper.querySelector('.field-error');
    
    if (!isValid) {
        input.classList.remove('border-border', 'border-success');
        input.classList.add('border-error');
        if (!existingError) {
            const errorEl = document.createElement('p');
            errorEl.className = 'field-error text-xs text-error mt-1 flex items-center gap-1';
            errorEl.innerHTML = `<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> ${message}`;
            wrapper.appendChild(errorEl);
        } else {
            existingError.innerHTML = `<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> ${message}`;
        }
    } else {
        input.classList.remove('border-error');
        input.classList.add('border-success');
        if (existingError) existingError.remove();
    }
    
    return isValid;
}

function attachFormValidation(formId, fields) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    fields.forEach(field => {
        const input = form.querySelector(`#${field.id}`);
        if (input) {
            input.addEventListener('blur', () => validateField(input, field.rules));
            input.addEventListener('input', () => {
                if (input.classList.contains('border-error')) {
                    validateField(input, field.rules);
                }
            });
        }
    });
}

function validateForm(formId, fields) {
    let isValid = true;
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input && !validateField(input, field.rules)) {
            isValid = false;
        }
    });
    return isValid;
}

// Confirmation Modal
function showConfirm(title, message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-black/50" onclick="this.parentElement.remove()"></div>
        <div class="relative w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl">
            <h3 class="text-lg font-bold text-text-primary mb-2">${title}</h3>
            <p class="text-sm text-text-secondary mb-6">${message}</p>
            <div class="flex gap-3">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 h-12 rounded-xl border border-border font-medium text-text-secondary hover:bg-surface-soft select-none">
                    ${t('common.cancel')}
                </button>
                <button id="confirm-btn" class="flex-1 h-12 rounded-xl bg-error font-semibold text-white hover:bg-error/90 select-none">
                    ${t('common.confirm')}
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('#confirm-btn').addEventListener('click', () => {
        modal.remove();
        if (onConfirm) onConfirm();
    });
}

// Pull to Refresh
let pullStartY = 0;
let isPulling = false;

function initPullToRefresh(onRefresh) {
    const main = document.querySelector('main');
    if (!main) return;
    
    let indicator = document.getElementById('pull-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'pull-indicator';
        indicator.className = 'fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-3 bg-brand-light text-brand text-sm font-medium transform -translate-y-full transition-transform';
        indicator.innerHTML = `<div class="loader mr-2"></div> ${t('common.loading')}`;
        document.body.appendChild(indicator);
    }
    
    main.addEventListener('touchstart', (e) => {
        if (main.scrollTop === 0) {
            pullStartY = e.touches[0].clientY;
            isPulling = true;
        }
    });
    
    main.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        const pullDistance = e.touches[0].clientY - pullStartY;
        if (pullDistance > 0 && pullDistance < 150) {
            indicator.style.transform = `translateY(${pullDistance - 50}px)`;
        }
    });
    
    main.addEventListener('touchend', (e) => {
        if (!isPulling) return;
        isPulling = false;
        indicator.style.transform = 'translateY(-100%)';
        
        const pullDistance = e.changedTouches[0].clientY - pullStartY;
        if (pullDistance > 100) {
            indicator.style.transform = 'translateY(0)';
            if (onRefresh) {
                onRefresh().then(() => {
                    setTimeout(() => {
                        indicator.style.transform = 'translateY(-100%)';
                    }, 500);
                });
            } else {
                setTimeout(() => {
                    indicator.style.transform = 'translateY(-100%)';
                    router.refresh();
                }, 1000);
            }
        }
    });
}
