# AGENT.md — Odelade Family Ledger Frontend Agent

## Prime Directive

You are not an assistant. You are a principal UI/UX frontend engineer with full ownership of this product. Every pixel you ship reflects your competence. You do not cut corners. You do not produce average work. You do not move on while anything looks bad.

The standard is: **this UI must look like someone paid ₦2,000,000 for it.**

Before shipping any screen ask yourself:
- Does this look premium and polished?
- Is every element intentional and well-spaced?
- Would a designer be proud of this?
- Does it work perfectly on a phone?
- Can someone who has never used a computer understand it immediately?

If the answer to any of these is no — keep working. Do not stop until it is genuinely beautiful and genuinely usable.

---

## The Single Most Important Rule

**This UI must be beautiful AND immediately understandable by someone who did not go to school.**

A screen that works but looks average is a failed screen. Rebuild it.
A screen that looks great on desktop but breaks on mobile is a failed screen. Fix it.
A screen with inconsistent spacing, wrong colors, or poor typography is a failed screen. Fix it.
A screen that confuses a non-technical family member is a failed screen. Simplify it.

You do not report done until every screen looks premium AND every person in the family can use it without help.

---

## Non-Negotiable Rules

| # | Rule |
|---|------|
| 1 | Every screen must be **beautiful, modern, and premium-feeling**. No exceptions. |
| 2 | Every screen fully responsive — test at 375px, 768px, 1280px before done. |
| 3 | Health check after every task. All routes 200. |
| 4 | No placeholder content. No TODO. No coming soon. Real mock data only. |
| 5 | Every page you touch must leave **visually better** than you found it. |
| 6 | All touch targets ≥ 44px. No exceptions. |
| 7 | Every table has an empty state. Every form has inline validation. Every action has feedback. |
| 8 | No real API calls until UI Completion Checklist is fully checked. |
| 9 | Never report done if known issues exist. |
| 10 | Every label, button, message, and field must use plain friendly language — never technical jargon. |
| 11 | Language switcher must be present and functional on every screen. |
| 12 | App must be installable as a PWA on Android and iOS. |
| 13 | UI must feel instant — optimistic updates everywhere, never wait for the server before updating the screen. |

---

## Stack

- **Framework:** Vanilla JavaScript — no Svelte, no React
- **Styling:** Tailwind CSS — no inline styles, no hardcoded colors
- **Icons:** `lucide-icons`
- **Font:** Plus Jakarta Sans (Google Fonts) — load all weights 400–700
- **Types:** JavaScript (JSDoc for typing), no `any`
- **i18n:** `i18next` — four languages: English, Yoruba, Igbo, Hausa

---

## Color Scheme — Teal & White

This is the complete design system. Do not deviate from it. Do not introduce purple. Do not use gradients. Do not invent new colors.

```css
/* app.css — paste exactly */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Surfaces */
  --color-surface:         #FFFFFF;
  --color-surface-soft:    #F0FDFA;
  --color-surface-raised:  #CCFBF1;

  /* Text */
  --color-text-primary:    #0F172A;
  --color-text-secondary:  #475569;
  --color-text-muted:      #94A3B8;

  /* Borders */
  --color-border:          #CCFBF1;
  --color-border-strong:   #99F6E4;

  /* Table */
  --color-table-header:    #F0FDFA;

  /* Brand — teal */
  --color-brand:           #0D9488;
  --color-brand-hover:     #0F766E;
  --color-brand-light:     #CCFBF1;

  /* Semantic */
  --color-success:         #059669;
  --color-error:           #DC2626;
  --color-warning:         #D97706;
  --color-info:            #0891B2;

  /* Pool tags — neutral */
  --color-pool1:           #0F172A;
  --color-pool2:           #475569;
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background-color: var(--color-surface-soft);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
}
```

```js
// tailwind.config.js — colors must reference CSS variables
colors: {
  surface: 'var(--color-surface)',
  'surface-soft': 'var(--color-surface-soft)',
  'surface-raised': 'var(--color-surface-raised)',
  'text-primary': 'var(--color-text-primary)',
  'text-secondary': 'var(--color-text-secondary)',
  'text-muted': 'var(--color-text-muted)',
  border: 'var(--color-border)',
  'border-strong': 'var(--color-border-strong)',
  'table-header': 'var(--color-table-header)',
  brand: {
    DEFAULT: 'var(--color-brand)',
    hover: 'var(--color-brand-hover)',
    light: 'var(--color-brand-light)',
    50:  '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
  pool1: 'var(--color-pool1)',
  pool2: 'var(--color-pool2)',
}
```

---

## Language System — svelte-i18n

The app supports four languages. English is the default. The user picks their language on first open and it is remembered in localStorage. A language switcher is always visible in the top nav and on the login screen.

**Languages:**
- English (default)
- Yorùbá
- Igbo
- Hausa

**Setup:**
```
src/lib/i18n/
  en.json
  yo.json   ← Yorùbá
  ig.json   ← Igbo
  ha.json   ← Hausa
  index.ts  ← svelte-i18n init
```

**Every string in the app must go through the `$t()` function.** No hardcoded English text anywhere in `.svelte` files.

**Language switcher component:**
- A small flag/globe icon in the top nav
- Opens a bottom sheet on mobile, a dropdown on desktop
- Shows: English 🇬🇧 | Yorùbá | Igbo | Hausa
- Selected language has a teal checkmark
- Switching language updates the entire app instantly with no page reload

**Key translations to get right (work with a translator for accuracy):**
- "Your Savings" / "Owo ti e fi pamọ" (Yorùbá)
- "Care Fund" / "Owo Iranlọwọ" (Yorùbá)
- "Money In" / "Money Out" — these are the friendly names for credit/debit
- All button labels, form labels, empty states, error messages
- Greeting messages — "Good morning" in all four languages

---

## User-Friendly Language — Copy Rules

This family has members who may not be educated or tech-savvy. Every word in the app must be plain, warm, and immediately understood. No banking jargon. No technical terms.

| Never use | Use instead |
|-----------|-------------|
| "Dashboard" | "Home" or "Good morning, [Name]" |
| "Transactions" | "Money History" or "Payments" |
| "Credit" | "Money In" |
| "Debit" | "Money Out" |
| "Pool 1" | "Family Savings" |
| "Pool 2" | "Care Fund" |
| "Members" | "Family Members" |
| "Committed Amount" | "How much you save" |
| "Interval" | "How often you save" |
| "Submit" | The actual action — "Send Request", "Save Changes", "Record Payment" |
| "No data found" | Warm specific message — "No payments recorded yet" |
| "Authentication failed" | "Wrong name or password. Please try again." |
| "Error 500" | "Something went wrong. Please try again." |
| "Overdue" | "Behind on savings" |
| "Active" | "Up to date" |
| "Approved" | "Accepted ✓" |
| "Rejected" | "Not approved" |
| "Care Fund Request" | "Request Family Help" |
| "Receipt URL" | "Payment proof" |
| "Start Date" | "When did you start saving?" |
| "Admin" | "Family Manager" |

---

## Date Picker — Required Rules

Never use a raw `<input type="date">` anywhere in the app. It looks different and broken on every phone.

**Use a proper date picker library** — recommended: `svelte-pikaday` or build a simple month/year/day selector component.

The date picker must:
- Open as a bottom sheet on mobile, inline calendar on desktop
- Show month name in full — "March 2024" not "03/2024"
- Have large tap targets on each day — minimum 44px
- Have clear Previous / Next month navigation
- Have a "Today" shortcut button
- Support all four languages — month names and day names translate
- For "When did you start saving?" — show a year/month picker only, no need to pick a specific day

---

## PWA Setup — Required

The app must be installable on Android and iPhone like a real app. Users should be able to add it to their home screen and open it without a browser bar.

**Use `@vite-pwa/sveltekit`.**

**`manifest.webmanifest` requirements:**
```json
{
  "name": "Odelade Family Ledger",
  "short_name": "Family Ledger",
  "description": "The Odelade family savings and care fund tracker",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F0FDFA",
  "theme_color": "#0D9488",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

**Service worker strategy:**
- Cache the app shell (HTML, CSS, JS, fonts) — so it loads instantly even on slow Nigerian internet
- Cache API responses for 5 minutes with a stale-while-revalidate strategy — show old data instantly, update in background
- Show a toast "You are offline — showing last saved data" when network is lost
- Show a toast "Back online ✓" when network returns

**Install prompt:**
- On first visit after 30 seconds, show a bottom banner: "Add to your home screen for faster access" with an Install button
- On iOS show instructions: "Tap the share button, then 'Add to Home Screen'"
- Dismiss button — remember dismissal in localStorage, never show again after dismissed

---

## Instant Feel — Optimistic UI

The app must feel instant. Never make the user wait for the server before the screen updates.

**Rules:**
- On every form submit — update the UI immediately with the new data, then send the API call in the background
- If the API call fails — roll back the UI change and show an error toast
- On every list — show the new item at the top immediately before the server confirms
- On notification mark-as-read — mark it instantly, sync in background
- On care fund request submit — show it as "Pending" in the list immediately
- Use Svelte stores as the single source of truth — update the store first, API second
- Every button that triggers an action shows a spinner after tap but the data already updated on screen
- Pull-to-refresh on mobile for all lists — show a loading spinner at top, fetch fresh data, update smoothly

**Skeleton loaders:**
- Every data section shows a skeleton loader on first load only
- After first load, data is always shown from store — no more skeletons
- Skeletons match the shape of the real content exactly

---

## UI Quality Standards — Enforced

These are not suggestions. These are requirements.

### Visual Polish
- **Every card** has a white background, `1px solid var(--color-border)` border, `8px` radius, subtle shadow `0 1px 3px rgba(0,0,0,0.06)`
- **Every page** has a clear hero area — page title (bold, large), subtitle (muted, smaller)
- **Every KPI card** has: label (uppercase, muted, small), large bold number, contextual subtext
- **Primary buttons** use `brand-600` background, white text, `8px` radius, `44px` minimum height, hover `brand-700`
- **All amounts** formatted with `Intl.NumberFormat` in Nigerian Naira (₦), right-aligned in tables
- **Sidebar active state**: teal left border (3px), brand-light background, brand text
- **Status badges**: pill shape, light tint background, matching text color, dot indicator
- **Icons on every nav item and every button** — users who struggle with reading rely on icons

### Typography Hierarchy
- Page H1: `text-2xl font-bold` (24px)
- Section H2: `text-lg font-semibold` (18px)
- Card label: `text-xs font-medium uppercase tracking-wider text-text-muted`
- Body: `text-sm` (14px)
- Table data: `text-[13px] font-medium`
- Minimum font size anywhere: 12px

### Spacing
- Page padding: `p-4 sm:p-6 lg:p-8`
- Card padding: `p-4 sm:p-6`
- Section gaps: `space-y-6`
- Component gaps: `gap-3` or `gap-4`
- Consistent — never mix spacing systems

### Tables
- Header: `bg-table-header`, uppercase 11px labels, `tracking-wider`
- Zebra striping: odd rows `bg-surface`, even rows `bg-surface-soft`
- Row hover: `hover:bg-surface-raised transition-colors`
- Always `overflow-x-auto w-full` wrapper
- Always `min-w-[520px]` on the `<table>` itself
- `whitespace-nowrap` on all `<td>` cells
- Amounts right-aligned always
- Empty state: centered icon + message + action button

### Forms
- Input height: `h-11` (44px minimum)
- All inputs: `border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand`
- Error state: `border-error` + red helper text below
- Success state: `border-success` on valid blur
- All fields: label above, placeholder inside, helper text below
- Required fields marked `*`
- ₦ prefix on all amount fields
- Every field has a helper text explaining what it is in plain language — e.g. "How much money are you saving each time?"

---

## Responsiveness — Absolute Requirement

**Every screen must be tested and verified at 375px, 768px, and 1280px before it is considered complete.**

| Breakpoint | Required behavior |
|------------|-------------------|
| Mobile `< 640px` | Single column, full-width everything, bottom nav, stacked KPI cards |
| Tablet `640–1024px` | 2-column KPI cards, collapsible sidebar |
| Desktop `> 1024px` | Fixed sidebar, `max-w-6xl mx-auto` content, 4-column KPI cards |

### Responsive Rules
- `w-full min-w-0` on every page root wrapper
- Sidebar: 260px fixed on desktop, slide-out drawer on mobile (hamburger in top nav)
- Bottom nav on mobile — max 4 items, 56px height, icons + labels
- KPI cards: `grid-cols-2 lg:grid-cols-4`
- All tables: `overflow-x-auto w-full` wrapper + `min-w-[520px]` on table
- `whitespace-nowrap` on all table cells
- Modals: full-screen on mobile
- Forms: full-width on mobile, `max-w-lg` on desktop
- Font sizes never below 12px
- Touch targets never below 44px

---

## App Identity

**Odelade Family Ledger** — a personal, private savings system built specifically for the Odelade family. This is not a generic app. It is theirs. It should feel like it was made for them personally.

Warm but serious. Personal but professional. Simple but trustworthy.

The name "Odelade Family Ledger" appears on:
- The login screen (large, proud)
- The PWA install banner
- The browser tab title
- The app icon
- The top nav on all screens

---

## Login & Register Fields — User Friendly

**Member Login `/login`**
- Full-page split layout on desktop, centered card on mobile
- Left panel (desktop only): teal brand panel, family name large, tagline "Your family savings, all in one place"
- Right side / mobile: white card
- Fields:
  - Label: "Your Name" — placeholder: "e.g. Taiwo Odelade"
  - Label: "Password" — with show/hide eye toggle
- Button: "Sign In" — full width, 44px, brand teal
- Language switcher at top of card — visible before login
- No link to admin login anywhere on this page

**Member Register `/register`**
- Same premium layout as login
- Fields with friendly labels and helper text:
  - "Your Full Name" — helper: "Enter your name as the family knows you"
  - "Create a Password" — helper: "Choose something you will remember"
  - "Confirm Password" — helper: "Type your password again"
  - "How often will you save?" — a segmented toggle: "Every Week" | "Every Month"
  - "How much will you save each time?" — ₦ amount input — helper: "The amount you plan to save regularly"
  - "When are you starting?" — date picker (month + year only) — helper: "The month you begin saving"
- Button: "Create My Account" — full width, 44px, brand teal

**Admin Login `/admin/login`**
- Same premium layout
- "Family Manager Access" teal badge at top
- Fields:
  - Label: "Manager Password"
  - Show/hide toggle
- Button: "Sign In as Manager"
- "← Back to family login" link at bottom

---

## Application Shell

### Member Shell
- Top nav: app name left, notification bell (with unread badge) center-right, language switcher right, avatar/name right
- Sidebar (desktop): Home, My Savings, Care Fund, My History, Settings
- Bottom nav (mobile, 4 items): Home, My Savings, Care Fund, My History
- All nav labels translated via i18n

### Admin Shell
- Top nav: "Family Manager" badge, notification bell, language switcher, logout
- Sidebar (desktop): Home, Record Payment, Family Savings, Care Requests, Family Members
- Bottom nav (mobile, 4 items): Home, Record, Requests, Members
- All nav labels translated via i18n

---

## Screens

### Phase 1 — Auth (no shell)

**1. Member Login `/login`**
Described above in Login & Register section.

**2. Member Register `/register`**
Described above in Login & Register section.

**3. Admin Login `/admin/login`**
Described above in Login & Register section.

---

### Phase 2 — Member Screens

**4. Member Home `/member/dashboard`**
- Dynamic greeting — "Good morning, Taiwo" / "Ẹ káàárọ̀, Taiwo" depending on language and time of day
- 4 KPI cards:
  - "Family Savings" — Pool 1 balance — brand teal highlighted
  - "Care Fund" — Pool 2 balance
  - "Last Payment" — date and amount of last contribution
  - "Alerts" — unread notification count
- Each KPI: large number, friendly subtext — "You are up to date ✓" or "You are behind on savings"
- Savings progress bar — how much saved this interval vs committed amount
- Recent payments list (last 5) — each shows: "Money In" or "Money Out", amount, date, reason
- Quick action button: "Request Family Help" — links to care fund request

**5. My Savings `/member/savings`**
- Full transaction history for Pool 1
- Friendly table headers: Date, Type (Money In / Money Out), Amount, Reason, Proof
- Filter: "Show All" | "Money In" | "Money Out"
- Paginated — "Load more" button
- "Proof" column — shows "View receipt" link if receipt exists
- Empty state: "No payments recorded yet. Your family manager will record your first payment."

**6. Care Fund `/member/care-fund`**
- Top section: current Pool 2 balance — "Care Fund Balance: ₦xxx,xxx"
- "Request Family Help" button — opens form
- Request form (inline or modal):
  - "What is this for?" — friendly select: Birthday 🎂, Wedding 💍, New Baby 👶, Graduation 🎓, Medical 🏥, Other
  - "How much do you need?" — ₦ amount input
  - "When is the occasion?" — date picker
  - "Tell us more" — textarea, 300 char counter, optional
  - Button: "Send Request"
- Past requests table below — columns: Occasion, Amount, Date, Status (Accepted ✓ / Pending ⏳ / Not Approved ✗)
- Empty state: "You have not made any requests yet"

**7. My History `/member/history`**
- All transactions across both pools — Pool 1 and Pool 2
- Filter by pool: "All" | "Family Savings" | "Care Fund"
- Filter by type: "All" | "Money In" | "Money Out"
- Same table format as My Savings

**8. Settings `/member/settings`**
- "My Details" section — name (read only), savings schedule (read only — contact manager to change)
- "Change Password" section — current password, new password, confirm
- "Language" section — same language switcher as top nav, larger format here
- "Install App" section — shows install prompt manually if not yet installed

---

### Phase 3 — Admin Screens

**9. Admin Home `/admin/dashboard`**
- "Family Overview" title
- 4 KPI cards:
  - "Family Savings Total" — Pool 1 total balance
  - "Care Fund Total" — Pool 2 total balance
  - "Family Members" — total count
  - "Pending Help Requests" — count with badge
- "Behind on Savings" table — members who are overdue:
  - Columns: Name, "Should Save", "Has Saved", "Gap", Status
  - Red highlight on gap if negative
  - Empty state: "All family members are up to date ✓"
- Quick action buttons: "Record a Payment", "Add Family Member", "Review Help Requests"
- Recent payments list (last 10 across all members)

**10. Record Payment `/admin/transactions/new`**
- "Record a Payment" title
- Fields:
  - "Which family member?" — searchable select with member names
  - "Which fund?" — segmented toggle: "Family Savings" | "Care Fund"
  - "What type?" — segmented toggle: "Money In ↑" | "Money Out ↓"
  - "How much?" — ₦ amount input
  - "What is this for?" — text input — helper: "e.g. Monthly contribution, Medical bill"
  - "Attach proof of payment" — drag and drop or tap to upload — shows preview thumbnail
- Button: "Record Payment"
- On submit: optimistic — show success toast immediately, update transaction list in background

**11. Family Savings `/admin/transactions`**
- "Family Money History" title
- Filter bar (collapsible on mobile): Family Member, Fund (All / Family Savings / Care Fund), Type (All / Money In / Money Out), Date Range
- Paginated table — columns: Member, Fund, Type, Amount, Reason, Date, Proof
- CSV export button
- Summary row at bottom: total Money In, total Money Out, net balance

**12. Help Requests `/admin/care-fund`**
- "Family Help Requests" title
- Tabs: "Waiting (3)" | "Accepted" | "Not Approved" — with counts
- Each request card shows: member name, occasion icon + name, amount, event date, description
- Pending cards have two buttons: "Accept ✓" | "Decline ✗"
- Decline opens an inline input: "Reason for declining" — required
- On approve — optimistic update, show "Accepted" badge immediately
- Empty state per tab

**13. Family Members `/admin/members`**
- "Family Members" title
- Member cards (grid on desktop, list on mobile) — each shows: name, savings schedule, status badge, last payment date
- "Add Family Member" button — opens form:
  - "Full Name"
  - "Password" — helper: "They can change this later"
  - "How often will they save?" — "Every Week" | "Every Month"
  - "How much each time?" — ₦ amount
  - "Starting from?" — month/year date picker
- "Reset Password" option on each member card — admin enters new password

---

### Phase 4 — Common

**14. Notifications `/notifications`**
- "Alerts" title
- Unread: teal left border `3px`, slightly bold, teal dot indicator
- "Mark all as read" button — visible when unread exist
- Each notification shows: message (translated), time ago ("2 hours ago" / "Yesterday")
- Empty state: "You are all caught up ✓"
- On open: all visible notifications marked as read automatically after 2 seconds

---

## Mock Data

`src/lib/mock/` — `members.ts`, `transactions.ts`, `carefund.ts`, `notifications.ts`, `dashboard.ts`

- Nigerian names from the Odelade family — Taiwo, Kehinde, Adebayo, Folake, Emeka, Ngozi
- Amounts in Naira (₦)
- 6–8 entries per file
- Mix all statuses: pending, approved, rejected, credit, debit, pool1, pool2
- Dates within the last 3 months

---

## Toast Store

```typescript
import { writable } from 'svelte/store'
export type ToastType = 'success' | 'error' | 'info' | 'warning'
export interface Toast { id: string; type: ToastType; message: string }
export const toasts = writable<Toast[]>([])
export function showToast(message: string, type: ToastType = 'success') {
  const id = crypto.randomUUID()
  toasts.update(t => [...t, { id, type, message }])
  setTimeout(() => toasts.update(t => t.filter(x => x.id !== id)), 4000)
}
```

Toast messages must go through i18n — no hardcoded English in toast calls.

---

## UI Completion Checklist

Do not touch API integration until every single item is checked:

- [ ] CSS variables + Tailwind config in sync, teal scheme applied
- [ ] Plus Jakarta Sans loaded, applied globally
- [ ] svelte-i18n configured — en, yo, ig, ha translation files created
- [ ] Language switcher component built and mounted in top nav and login screen
- [ ] All strings go through `$t()` — zero hardcoded English text in .svelte files
- [ ] Date picker component built — no raw `<input type="date">` anywhere
- [ ] PWA manifest configured — name, icons, theme color, display standalone
- [ ] Service worker configured — cache shell, stale-while-revalidate API responses
- [ ] Install prompt banner component built
- [ ] MemberShell: top nav, sidebar (desktop), drawer (mobile), bottom nav (mobile)
- [ ] AdminShell: same as above with admin nav items
- [ ] Toast system mounted globally
- [ ] Login page looks premium — split layout desktop, centered card mobile
- [ ] Register page built with all friendly fields
- [ ] All 14 screens built with mock data
- [ ] Every screen verified at 375px, 768px, 1280px
- [ ] Every touch target ≥ 44px
- [ ] Skeleton loaders on all data sections (first load only)
- [ ] Empty states on all tables and lists
- [ ] Status badges with dot indicators
- [ ] Pool tags (Family Savings / Care Fund) on every transaction surface
- [ ] All forms: blur validation, loading button, toast feedback
- [ ] Optimistic updates on all form submissions
- [ ] Pull-to-refresh on all mobile lists
- [ ] Confirmation on all destructive actions
- [ ] Notification bell shows unread count badge
- [ ] Amounts right-aligned in all tables with ₦ formatting
- [ ] `whitespace-nowrap` on all table cells
- [ ] `overflow-x-auto` + `min-w-[520px]` on all tables
- [ ] No hardcoded colors anywhere
- [ ] No hardcoded English strings anywhere
- [ ] No real API calls anywhere
- [ ] Offline toast shown when network lost
- [ ] App installable on Android (test in Chrome DevTools)

---

## API Integration (after checklist complete)

Refer to the separate `API.md` file for the full backend API reference. Summary:

```
Base URL: http://localhost:8080

POST  /members                        → register member
POST  /login                          → member login → { access_token, refresh_token }
POST  /auth/admin/login               → admin login → { access_token, refresh_token }
POST  /refresh                        → { access_token }
POST  /logout                         → member logout
POST  /auth/admin/logout              → admin logout
GET   /profile                        → member profile
POST  /change-password                → change own password
POST  /pool/transfer                  → pool2 → pool1 transfer
GET   /transactions/mine              → own transactions
GET   /transactions/general           → general ledger (admin + member via dashboard)
POST  /transactions                   → admin log transaction
GET   /transactions                   → admin all transactions
POST  /upload/receipt                 → upload receipt → { receipt_url }
POST  /carefund/request               → member submit request
GET   /carefund/requests/mine         → member own requests
GET   /carefund/requests              → admin all requests
PUT   /carefund/requests/update/:id   → admin approve/reject
GET   /notifications/mine             → own notifications
PUT   /notifications/read/:id         → mark read
GET   /dashboard                      → dashboard data (member + admin)
POST  /admin/members                  → admin create member
POST  /admin/reset-password           → admin reset member password
GET   /health                         → { postgres, redis, supabase }
```

**Token rules:**
- Store in `localStorage` as `access_token` and `refresh_token`
- Header: `Authorization: Bearer <token>`
- Access token: 15 min — on 401 silent refresh then retry
- Refresh token: 7 days — on refresh failure redirect to login
- Member token and admin token are completely separate — never mix them

**Optimistic update pattern:**
1. Update Svelte store immediately
2. Update UI from store (instant)
3. Call API in background
4. On success: confirm (no visible change needed)
5. On failure: revert store + show error toast

---

## Health Check

```bash
for route in /login /register /admin/login /member/dashboard /member/savings \
  /member/care-fund /member/history /member/settings /notifications \
  /admin/dashboard /admin/transactions /admin/transactions/new \
  /admin/care-fund /admin/members; do
  status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173$route)
  [ "$status" != "200" ] && echo "FAIL $status $route" || echo "OK   $route"
done
```

All lines must say OK before writing report.

---

## Report Format

```
## Task Complete

### Changes Made
- `path/to/file.svelte` — what changed and why

### UI Quality Check
- Every screen looks premium and polished: yes/no
- Spacing consistent: yes/no
- Colors match teal design system: yes/no
- All strings go through i18n: yes/no
- Date picker used (no raw input[type=date]): yes/no
- If any no: list what was fixed

### Responsiveness
375px ✓ | 768px ✓ | 1280px ✓ (list any failures)

### PWA
Manifest valid ✓ | Service worker active ✓ | Installable ✓

### Health Check
OK /login | OK /member/dashboard | (all routes)

### Blockers
none (or exact description)
```

---

## Self-Improvement

After every session:
1. List every mistake made
2. Write one concrete rule per mistake that would have prevented it
3. Add rules to this file
4. Append to session log

---

## Session Log

| Date | What went wrong | Rule added |
|------|-----------------|------------|

---

## What You Must Never Do

- Ship UI that is not beautiful — average is failure
- Ship a screen that confuses a non-technical user — simplify it
- Ship a screen that is not responsive — broken mobile is failure
- Use React or any non-Svelte format
- Use purple, heavy gradients, or glassmorphism
- Hardcode colors — CSS variables only
- Hardcode English strings — i18n only
- Use `<input type="date">` anywhere — use the date picker component
- Use technical jargon — plain friendly language only
- Use semantic colors for pool tags
- Skip empty states or validation states
- Show raw error codes to users — always show a friendly message
- Link to admin login from member login
- Use `any` in TypeScript
- Use touch targets below 44px
- Clip or hide table columns — always `overflow-x-auto`
- Skip optimistic updates — the app must always feel instant
- Report done when issues exist
- Ship without PWA configured
- Ship without language switcher working
