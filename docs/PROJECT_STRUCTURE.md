# My Parking Web App – Project Structure

Enterprise-style Angular layout: **features**, **shared**, **core**, **layouts**.

For SOLID and design-system rules, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Folder tree

```
src/
├── main.ts
├── index.html
├── styles.scss                 # Global styles (tokens + utilities)
└── app/
    ├── app.component.*
    ├── app.config.ts
    ├── app.routes.ts           # Composes feature routes only
    │
    ├── core/                   # App shell
    │   └── sidebar/
    │
    ├── layouts/
    │   ├── auth-layout/        # Login / register / OTP (no sidebar)
    │   └── main-layout/        # App pages (with sidebar)
    │
    ├── shared/                 # Reusable across features
    │   ├── components/         # Button, input, title, confirm popup
    │   ├── constants/          # OTP, prices, payment methods
    │   ├── models/             # TypeScript interfaces
    │   ├── utils/              # format + pricing helpers
    │   ├── styles/             # Design tokens & utilities
    │   └── index.ts
    │
    ├── features/
    │   ├── auth/               # login, register-user, otp-verification
    │   ├── home/
    │   ├── booking/            # book-parking, select-location, slot-selection
    │   ├── payment/            # payment, payment-success
    │   ├── ticket/             # parking-ticket
    │   └── account/            # profile, wallet, help, about, privacy-security
    │
    └── assets/
        ├── app-fonts/
        ├── app-icon/
        └── app-styles/         # typography fonts (+ legacy color file)
```

---

## Feature ownership

| Feature | Responsibility |
|---------|----------------|
| **auth** | Login, register, OTP |
| **home** | Choose vehicle type / dashboard |
| **booking** | Vehicle form → location → slot map |
| **payment** | Method selection, pay form, success |
| **ticket** | QR ticket + scan success |
| **account** | Profile, wallet, help, about, privacy |

Each feature has a `*.routes.ts` file. Root `app.routes.ts` imports those arrays.

---

## Shared vs Core

- **shared** = reusable UI + types + helpers (used by many features).  
- **core** = app shell that appears once (sidebar). Future: auth guard, HTTP interceptor, API services.

---

## Design tokens

Defined in `shared/styles/_tokens.scss` and loaded from `src/styles.scss`.

Use:

- `var(--app-color-primary)` for brand color  
- `.app-page-center` / `.app-card` for auth-style layouts  

---

## Adding a new screen (checklist)

1. Create component under the correct `features/<area>/`.  
2. Add the route in that feature’s `*.routes.ts`.  
3. Reuse `shared/components` for buttons/inputs.  
4. Put new shared types in `shared/models`.  
5. Avoid copying colors — use tokens.
