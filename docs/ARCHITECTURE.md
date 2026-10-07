# My Parking Web App — Architecture Guide

This document explains how the app is structured like a small **enterprise Angular application**: features, shared UI, design tokens, and **SOLID** principles — kept simple on purpose.

---

## 1. High-level folder map

```
src/app/
├── app.routes.ts          # Root routes only (composes feature routes)
├── app.config.ts          # App providers
├── core/                  # App shell (sidebar, future guards/services)
├── layouts/               # Auth layout vs Main layout
├── shared/                # Reusable UI, models, utils, constants, styles
│   ├── components/        # core-button, core-input, core-title, confirm-popup
│   ├── constants/         # Demo OTP, prices, payment methods, durations
│   ├── models/            # Booking / payment TypeScript interfaces
│   ├── utils/             # format + pricing helpers (no UI)
│   ├── styles/            # Design tokens + shared CSS utilities
│   └── index.ts           # Public API (barrel)
└── features/              # One folder per business area
    ├── auth/              # login, register, OTP
    ├── home/              # dashboard
    ├── booking/           # book form, location, slots
    ├── payment/           # pay + success
    ├── ticket/            # parking ticket / QR
    └── account/           # profile, wallet, help, about, privacy
```

**Rule of thumb**

| Put it in… | When… |
|------------|--------|
| `features/<name>/` | It is a screen or route for that business area |
| `shared/` | Two or more features need it (UI, types, helpers) |
| `core/` | App-wide shell (sidebar) or future singleton services/guards |
| `layouts/` | Wrappers around `<router-outlet>` |

---

## 2. Feature modules (routes)

Each feature owns a `*.routes.ts` file:

| Feature | File | Routes |
|---------|------|--------|
| Auth | `features/auth/auth.routes.ts` | `/login`, `/registerUser`, `/otp` |
| Home | `features/home/home.routes.ts` | `/home` |
| Booking | `features/booking/booking.routes.ts` | `/book/...` |
| Payment | `features/payment/payment.routes.ts` | `/payment`, `/payment/success` |
| Ticket | `features/ticket/ticket.routes.ts` | `/ticket` |
| Account | `features/account/account.routes.ts` | `/profile`, `/wallet`, … |

`app.routes.ts` only wires layouts + spreads these route arrays.  
That keeps the root file short and each feature easy to find.

---

## 3. Design system (colors & styles)

**Source of truth:** `shared/styles/_tokens.scss`

| Token | Purpose |
|-------|---------|
| `--app-color-primary` | Brand blue (buttons, accents) |
| `--app-color-bg` | Page background |
| `--app-color-surface` | Cards / panels |
| `--app-color-text` / `--app-color-text-muted` | Typography |
| `--app-space-*` | Spacing scale |
| `--app-radius-*` | Corner radius |
| `--app-shadow-*` | Elevation |

**Shared layout classes:** `shared/styles/_utilities.scss`

- `.app-page-center` — full-height centered auth pages  
- `.app-card` — standard card width/radius/shadow  
- `.app-page-header` — screen title row  
- `.app-btn-primary` — primary button look  

Loaded globally from `src/styles.scss`.

Prefer CSS variables / utility classes over hardcoding `#214B69` in every SCSS file.

---

## 4. Shared components

| Component | Selector | Role |
|-----------|----------|------|
| Core button | `app-core-button` | Primary actions (`[onClick]` callback) |
| Core input | `app-core-input` | Text inputs bound to `FormControl` |
| Core title | `app-core-title` | Screen headings |
| Confirm popup | `app-confirm-popup` | Confirm booking dialog |

Import from `shared/components/...` (or from `shared/index.ts`).

---

## 5. SOLID principles (how we apply them)

### S — Single Responsibility
- **Components** = UI + navigation only.  
- **utils** = formatting / pricing only.  
- **constants** = static config (OTP, prices, methods).  
- **models** = data shapes only.

Example: `ParkingTicketComponent` does not calculate date suffixes; it calls `formatDisplayDate()`.

### O — Open/Closed
- Add a new payment method in `PAYMENT_METHODS` (constants) instead of rewriting the whole payment class.  
- Add a new duration price in `PRICE_BY_DURATION`.

### L — Liskov Substitution
- Shared components accept simple `@Input`s; any feature can use them the same way.

### I — Interface Segregation
- Small models (`BookingFormData`, `ParkingLocation`, `BookingFlowState`) instead of one giant “god” object.

### D — Dependency Inversion
- Screens depend on **shared abstractions** (models, utils, constants), not on each other’s internals.  
- Root routes depend on **feature route modules**, not on listing every component by hand forever.

---

## 6. Booking flow (data)

Router **state** carries:

```ts
BookingFlowState {
  booking?, location?, slotId?, vehicleType?, amount?
}
```

Flow:

`Home → Book → Location → Slots → Payment → Success → Ticket`

Keep this state typed via `shared/models/booking.model.ts`.

---

## 7. What stays simple (by design)

- No over-engineered services yet (demo app; easy to add later).  
- No NgRx / complex state libraries.  
- Hardcoded demo login / OTP until a real backend exists.  
- Feature folders + shared layer = clear boundaries without heavy frameworks.

---

## 8. Where to add new code

| You want to… | Do this |
|--------------|---------|
| Add a new page | Create component under the right `features/...` folder + add route in that feature’s `*.routes.ts` |
| Add a reusable button/input | Put it in `shared/components/` and export from `shared/index.ts` |
| Change brand color | Edit `shared/styles/_tokens.scss` |
| Change parking prices | Edit `PRICE_BY_DURATION` in `shared/constants/app.constants.ts` |
| Add API calls later | Create `core/services/` or `features/<name>/services/` and inject into components |

---

## 9. Related docs

- [Project structure (overview)](./PROJECT_STRUCTURE.md)  
- [Backend & database design](./BACKEND_AND_DATABASE_DESIGN.md)  
- [LinkedIn description](./LINKEDIN_PROJECT_DESCRIPTION.md)  
- [Learn Angular 15 days](./LEARN_ANGULAR_15_DAYS.md)
