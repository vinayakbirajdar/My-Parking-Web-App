# Shared

Code used by **more than one feature**.

| Folder | Contents |
|--------|----------|
| `components/` | UI: button, input, title, confirm popup |
| `constants/` | Demo OTP, login, prices, payment methods |
| `models/` | TypeScript interfaces (`BookingFlowState`, etc.) |
| `utils/` | Formatting + pricing helpers (no Angular UI) |
| `styles/` | Design tokens (colors) + utility CSS classes |
| `index.ts` | Public exports |

Keep this layer simple: no feature-specific screens here.
