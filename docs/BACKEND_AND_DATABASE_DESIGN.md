# My Parking Web App – Backend & Database Design

This document describes the **tables**, **columns**, and **backend APIs** needed to support the current application flow (login, profile, wallet, book parking, locations, slots, payment, ticket).

---

## 1. Overview

| Area | Purpose |
|------|--------|
| **Auth** | Login, user identity, profile |
| **Users & vehicles** | Profile, saved vehicles (car, bike, heavy) |
| **Locations & slots** | Parking locations, blocks, slots, availability |
| **Bookings** | Booking request + vehicle/location/slot/duration details |
| **Payments** | Payment method, amount, status, link to booking |
| **Tickets** | QR/ticket for a booking, scan status |
| **Wallet** | User balance, top-up, parking deductions, transaction history |

---

## 2. Database Tables

### 2.1 `users`

Stores user account and profile (login + profile screen).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | User ID |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| `password_hash` | VARCHAR(255) | NOT NULL | Hashed password (e.g. bcrypt) |
| `full_name` | VARCHAR(150) | NOT NULL | Display name (e.g. Vinayak Birajdar) |
| `mobile` | VARCHAR(20) | | Phone (e.g. +91 98765 43210) |
| `last_login_at` | TIMESTAMP | | Last login time |
| `created_at` | TIMESTAMP | NOT NULL | Account creation |
| `updated_at` | TIMESTAMP | NOT NULL | Last profile update |

---

### 2.2 `vehicles`

User’s registered vehicles (profile “Vehicle Information”, pre-fill or link to booking).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | Vehicle ID |
| `user_id` | (same as users.id) | FK → users, NOT NULL | Owner |
| `vehicle_type` | VARCHAR(20) | NOT NULL | `car`, `bike`, `heavy` |
| `registration_number` | VARCHAR(30) | NOT NULL | e.g. MH12 AB 1234 |
| `company` | VARCHAR(100) | | Make (e.g. Maruti, Honda) |
| `model` | VARCHAR(100) | | Model name |
| `color` | VARCHAR(50) | | Vehicle color |
| `is_default` | BOOLEAN | DEFAULT false | Default for that type |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Index:** `(user_id, vehicle_type)`, `(user_id, is_default)`.

---

### 2.3 `locations`

Parking locations (select-location screen: recent + nearby).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | Location ID |
| `name` | VARCHAR(200) | NOT NULL | e.g. Mumbai Central Parking |
| `address` | TEXT | NOT NULL | Full address |
| `latitude` | DECIMAL(10,7) | | For “nearby” and maps |
| `longitude` | DECIMAL(10,7) | | For “nearby” and maps |
| `is_active` | BOOLEAN | DEFAULT true | Soft enable/disable |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Note:** “Distance” (e.g. 2 km) can be computed in API from user’s lat/lng or a fixed point.

---

### 2.4 `slot_blocks`

Blocks within a location (e.g. Block A, Block B).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | Block ID |
| `location_id` | (same as locations.id) | FK → locations, NOT NULL | Parent location |
| `name` | VARCHAR(100) | NOT NULL | e.g. Block A, Block B |
| `display_order` | INT | DEFAULT 0 | Order on UI |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Index:** `(location_id)`.

---

### 2.5 `slots`

Individual parking slots per block (slot-selection UI).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | Slot ID (used in booking) |
| `block_id` | (same as slot_blocks.id) | FK → slot_blocks, NOT NULL | Parent block |
| `slot_number` | VARCHAR(20) | NOT NULL | Display number (01, 02, …) |
| `side` | VARCHAR(10) | | `left` / `right` (for layout) |
| `display_order` | INT | DEFAULT 0 | Order within block |
| `is_active` | BOOLEAN | DEFAULT true | Soft disable |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Unique:** `(block_id, slot_number)`. **Index:** `(block_id)`.

**Slot status (occupied/available):**  
- Either derived at query time from `bookings` (e.g. active booking for that slot in the time window),  
- Or stored in a separate `slot_availability` / `slot_status` table if you track by time windows.

---

### 2.6 `bookings`

One row per parking booking (book-parking form + slot + payment + ticket).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | Booking ID |
| `user_id` | (same as users.id) | FK → users, NOT NULL | Who booked |
| `location_id` | (same as locations.id) | FK → locations, NOT NULL | Parking location |
| `slot_id` | (same as slots.id) | FK → slots, NOT NULL | Chosen slot |
| `vehicle_type` | VARCHAR(20) | NOT NULL | `car`, `bike`, `heavy` (snapshot) |
| `registration_number` | VARCHAR(30) | NOT NULL | Snapshot at booking |
| `company` | VARCHAR(100) | | Make (snapshot) |
| `model` | VARCHAR(100) | | Model (snapshot) |
| `vehicle_color` | VARCHAR(50) | | Color (snapshot) |
| `expected_duration` | VARCHAR(20) | NOT NULL | `1`, `2`, `4`, `8`, `full` (hours) |
| `driver_name` | VARCHAR(150) | NOT NULL | Driver name |
| `contact_number` | VARCHAR(20) | NOT NULL | Contact phone |
| `entry_date` | DATE | NOT NULL | Planned entry date |
| `entry_time` | TIME | NOT NULL | Planned entry time |
| `special_requirements` | TEXT | | Notes |
| `status` | VARCHAR(30) | NOT NULL | See status list below |
| `ticket_code` | VARCHAR(50) | UNIQUE | For QR / scan (e.g. UUID) |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Suggested `status` values:**  
`draft`, `pending_payment`, `paid`, `active` (vehicle in lot), `completed`, `cancelled`, `expired`.

**Indexes:** `(user_id)`, `(location_id, entry_date)`, `(slot_id, entry_date)`, `(ticket_code)`, `(status)`.

---

### 2.7 `payments`

One or more payment rows per booking (payment screen + success).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | Payment ID |
| `booking_id` | (same as bookings.id) | FK → bookings, NOT NULL | Related booking |
| `amount` | DECIMAL(10,2) | NOT NULL | Amount (e.g. 50.60) |
| `currency` | VARCHAR(3) | DEFAULT 'INR' | |
| `method` | VARCHAR(30) | NOT NULL | `upi`, `card`, `netbanking`, `wallet` |
| `status` | VARCHAR(30) | NOT NULL | `pending`, `success`, `failed`, `refunded` |
| `gateway_transaction_id` | VARCHAR(255) | | From payment gateway |
| `gateway_response` | JSON/TEXT | | Raw response (optional) |
| `paid_at` | TIMESTAMP | | When payment succeeded |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Indexes:** `(booking_id)`, `(status)`, `(gateway_transaction_id)`.

---

### 2.8 `ticket_scans` (optional)

If you track “scan at gate” in the backend (parking ticket “Scan ticket success!”).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | |
| `booking_id` | (same as bookings.id) | FK → bookings, NOT NULL | |
| `scanned_at` | TIMESTAMP | NOT NULL | When QR was scanned at gate |
| `scanned_by` | VARCHAR(100) | | Operator / device ID (optional) |
| `created_at` | TIMESTAMP | NOT NULL | |

**Index:** `(booking_id)`.

---

### 2.9 `wallets`

User wallet balance (wallet screen).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | |
| `user_id` | (same as users.id) | FK → users, UNIQUE, NOT NULL | One wallet per user |
| `balance` | DECIMAL(12,2) | NOT NULL, DEFAULT 0 | Current balance (e.g. 128750.00) |
| `currency` | VARCHAR(3) | DEFAULT 'INR' | |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Index:** `(user_id)`.

---

### 2.10 `wallet_transactions`

Wallet top-ups and parking deductions (wallet “Recent Transactions”).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | |
| `wallet_id` | (same as wallets.id) | FK → wallets, NOT NULL | |
| `type` | VARCHAR(30) | NOT NULL | `topup`, `parking_fee`, `refund`, `adjustment` |
| `amount` | DECIMAL(10,2) | NOT NULL | Positive = credit, negative = debit |
| `balance_after` | DECIMAL(12,2) | | Balance after this tx (optional) |
| `reference_type` | VARCHAR(50) | | e.g. `booking`, `payment` |
| `reference_id` | VARCHAR(100) | | e.g. booking_id or payment_id |
| `description` | VARCHAR(255) | | e.g. "Car • MH12 AB 1234", "Added via UPI" |
| `created_at` | TIMESTAMP | NOT NULL | |

**Indexes:** `(wallet_id)`, `(wallet_id, created_at)` for “Recent Transactions”.

---

### 2.11 `pricing_rules` (optional)

To compute amount from duration (and optionally vehicle type / location).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | |
| `location_id` | (same as locations.id) | FK, nullable | NULL = global rule |
| `vehicle_type` | VARCHAR(20) | | NULL = all types |
| `duration_key` | VARCHAR(20) | NOT NULL | `1`, `2`, `4`, `8`, `full` |
| `amount` | DECIMAL(10,2) | NOT NULL | e.g. 25.00, 50.60, 100.00 |
| `currency` | VARCHAR(3) | DEFAULT 'INR' | |
| `is_active` | BOOLEAN | DEFAULT true | |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Index:** `(location_id, vehicle_type, duration_key)`.

---

### 2.12 `saved_cards` (optional)

If you persist “Save card for future” (PCI considerations: store only token/last4).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | |
| `user_id` | (same as users.id) | FK → users, NOT NULL | |
| `last_four` | VARCHAR(4) | NOT NULL | Last 4 digits |
| `brand` | VARCHAR(20) | | visa, mastercard, rupay |
| `expiry_month` | SMALLINT | | 1–12 |
| `expiry_year` | SMALLINT | | e.g. 2028 |
| `name_on_card` | VARCHAR(150) | | |
| `gateway_token` | VARCHAR(255) | | Token from payment gateway |
| `is_default` | BOOLEAN | DEFAULT false | |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

---

### 2.13 `user_recent_locations` (optional)

To show “Recent locations” per user.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID / BIGINT | PK, auto | |
| `user_id` | (same as users.id) | FK → users, NOT NULL | |
| `location_id` | (same as locations.id) | FK → locations, NOT NULL | |
| `last_used_at` | TIMESTAMP | NOT NULL | |
| `created_at` | TIMESTAMP | NOT NULL | |

**Unique:** `(user_id, location_id)`. **Index:** `(user_id, last_used_at)`.

---

## 3. Entity Relationship Summary

```
users
  ├── vehicles (1 : N)
  ├── bookings (1 : N)
  ├── wallets (1 : 1)
  ├── wallet_transactions (via wallet_id)
  ├── saved_cards (1 : N) [optional]
  └── user_recent_locations (1 : N) [optional]

locations
  ├── slot_blocks (1 : N)
  ├── bookings (1 : N)
  ├── pricing_rules (1 : N) [optional]
  └── user_recent_locations (1 : N) [optional]

slot_blocks
  └── slots (1 : N)

slots
  └── bookings (1 : N)

bookings
  ├── payments (1 : N)
  └── ticket_scans (1 : N) [optional]

wallets
  └── wallet_transactions (1 : N)
```

---

## 4. Backend API Outline

| Purpose | Method | Endpoint (example) | Main tables |
|--------|--------|---------------------|-------------|
| Login | POST | `/auth/login` | users |
| Get profile | GET | `/users/me` or `/profile` | users |
| Update profile | PATCH | `/users/me` | users |
| List vehicles | GET | `/users/me/vehicles` | vehicles |
| Create/update vehicle | POST/PATCH | `/users/me/vehicles` | vehicles |
| List locations | GET | `/locations?search=&lat=&lng=` | locations |
| Recent locations | GET | `/users/me/recent-locations` | user_recent_locations, locations |
| Get slot blocks & slots | GET | `/locations/:id/blocks` or `/locations/:id/slots` | slot_blocks, slots, (bookings for status) |
| Get slot availability | GET | `/locations/:id/slots/availability?date=` | slots, bookings |
| Create booking | POST | `/bookings` | bookings (status: pending_payment) |
| Get booking | GET | `/bookings/:id` | bookings, locations, slots |
| Create payment | POST | `/bookings/:id/payments` | payments, bookings, wallets (if wallet) |
| Confirm payment (webhook/callback) | POST | `/payments/:id/confirm` or webhook | payments, bookings, wallet_transactions |
| Get ticket / validate QR | GET | `/bookings/by-ticket/:ticketCode` | bookings |
| Record scan | POST | `/bookings/:id/scan` | ticket_scans, bookings |
| Wallet balance | GET | `/users/me/wallet` | wallets |
| Wallet transactions | GET | `/users/me/wallet/transactions` | wallet_transactions |
| Add money (initiate) | POST | `/users/me/wallet/topup` | wallets, wallet_transactions |
| Get price for duration | GET | `/pricing?location_id=&vehicle_type=&duration=` | pricing_rules |

---

## 5. Suggested Tech Stack (backend)

- **API:** REST (or GraphQL) – e.g. Node.js (Express/Nest), Java (Spring Boot), .NET, or Python (FastAPI/Django).
- **Database:** PostgreSQL or MySQL/MariaDB.
- **Auth:** JWT (access + optional refresh) after login; hash passwords with bcrypt/argon2.
- **Payment:** Integrate a gateway (Razorpay, Paytm, CCAvenue, etc.); store `method`, `amount`, `status`, `gateway_transaction_id` in `payments`.
- **Wallet:** Update `wallets.balance` and insert `wallet_transactions` in a transaction when payment succeeds or user tops up.

---

## 6. Table Creation Order (for migrations)

1. `users`
2. `vehicles`, `wallets`, `saved_cards` (optional), `user_recent_locations` (optional)
3. `locations`
4. `slot_blocks` → `slots`
5. `pricing_rules` (optional)
6. `bookings`
7. `payments`
8. `ticket_scans` (optional)
9. `wallet_transactions` (after `wallets` and `bookings`/`payments`)

This design supports the current app flow and gives you table names, columns, and a clear backend scope to implement.
