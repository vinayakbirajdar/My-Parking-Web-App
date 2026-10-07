# My Parking Web App

A **parking reservation web application** built with **Angular 19**, TypeScript, and Bootstrap.

Users can register, log in, verify OTP, book parking (vehicle → location → slot), pay via UPI / Card / Net Banking / Wallet, and receive a digital parking ticket with QR code.

**Tech:** Angular 19 · Reactive Forms · Angular Router · Bootstrap 5 · SCSS

---

## Architecture (enterprise style)

```
src/app/
  features/   → auth, home, booking, payment, ticket, account
  shared/     → reusable components, models, utils, design tokens
  core/       → sidebar (app shell)
  layouts/    → auth layout vs main layout
```

- **Features** = one business area per folder (+ its own `*.routes.ts`)
- **Shared** = buttons, inputs, colors, helpers used by many features
- **SOLID** explained in docs (simple, not over-engineered)

See: [Architecture & SOLID](docs/ARCHITECTURE.md) · [Project structure](docs/PROJECT_STRUCTURE.md)

---

## Documentation

- [Architecture & SOLID](docs/ARCHITECTURE.md) — modules, colors, shared components, where to add code
- [Project structure](docs/PROJECT_STRUCTURE.md) — folder layout
- [Backend & database design](docs/BACKEND_AND_DATABASE_DESIGN.md) — tables & APIs
- [Learn Angular in 15 days](docs/LEARN_ANGULAR_15_DAYS.md) — learning guide
- [LinkedIn project description](docs/LINKEDIN_PROJECT_DESCRIPTION.md) — profile text

---

## Development server

```bash
ng serve
```

Open `http://localhost:4200/`.

**Demo login:** `vsb@gmail.com` / `123456`  
**Demo OTP:** `1234`

---

## Build

```bash
ng build
```

Output is written to `dist/my-parking`.

---

Generated with [Angular CLI](https://github.com/angular/angular-cli) 19.2.15.
