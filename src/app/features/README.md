# Features

Each folder is one **business module**:

| Folder | Screens |
|--------|---------|
| `auth/` | Login, Register, OTP |
| `home/` | Dashboard / vehicle type |
| `booking/` | Book form, location, slots |
| `payment/` | Payment methods + success |
| `ticket/` | Parking ticket + QR |
| `account/` | Profile, wallet, help, about, privacy |

Each folder has a `*.routes.ts` file. Do not put shared buttons/inputs here — use `../shared/`.
