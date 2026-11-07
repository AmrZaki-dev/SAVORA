# Restaurant Ordering API — Endpoints Guide

**Phase 4 · Project 4: Restaurant Ordering App**

This is the backend behind your restaurant's menu, login, and ordering system.
Call these endpoints from React using **Axios** — you never write backend code.

## Base URL

```
https://savorarestaurant-production.up.railway.app/api
```

> Your instructor will give you the real base URL. Every endpoint below is
> relative to it — e.g. `/menu` really means `<base URL>/menu`.

## A default admin account already exists

Use this to test the admin dashboard before you build registration:

```
Email:    admin@techmaster.com
Password: Admin@12345
```

## Before you start

- Put the base URL in a `.env` file in your React project:
  ```
  VITE_API_URL=https://savorarestaurant-production.up.railway.app/api
  ```
- All request and response bodies are **JSON**.
- Every response follows the same shape:
  ```json
  { "success": true, "data": ... }
  ```
  or, on failure:
  ```json
  { "success": false, "message": "explanation of what went wrong" }
  ```
- After login/register, save the `token` and send it on every request that
  needs it as a header: `Authorization: Bearer <token>`.
- Registering never gives you an admin account — it's always a customer (`user`).

---

## 1. Health Check

`GET /health` — no auth. Returns `{ success: true, message: "API is up and running." }`.

---

## 2. Menu (Public — for the Landing Page)

| Action | Method | Endpoint | Auth? |
|---|---|---|---|
| List dishes | GET | `/menu` | No — public |
| Get one dish | GET | `/menu/:id` | No — public |
| Add a dish | POST | `/menu` | **Admin only** |
| Edit a dish | PUT | `/menu/:id` | **Admin only** |
| Remove a dish | DELETE | `/menu/:id` | **Admin only** |

Optional query params on the list: `?search=kofta` and `?category=Dessert`.
Only items with `available: true` show up in the public list.

**Create/Edit body**
```json
{ "name": "Grilled Seabass", "category": "Main Course", "price": 260, "description": "...", "image": "...", "available": true }
```
`name` and `price` are required to create.

---

## 3. Register

`POST /auth/register` — no auth.
```json
{ "name": "Sara Ali", "email": "sara@example.com", "password": "MyPassw0rd" }
```
Returns `201` with `{ user, token }`. `409` if the email is already registered.

---

## 4. Login

`POST /auth/login` — no auth.
```json
{ "email": "sara@example.com", "password": "MyPassw0rd" }
```
Returns `200` with `{ user, token }` — same shape as register. `401` on wrong
credentials.

---

## 5. My Profile

`GET /auth/me` — **requires login**. Returns the logged-in user's own info.
Use this on app load to check whether a saved token is still valid.

---

## 6. Orders (Requires Login)

| Action | Method | Endpoint | Who can call it |
|---|---|---|---|
| Place an order | POST | `/orders` | Any logged-in user |
| My order history | GET | `/orders/my` | Any logged-in user |
| Every order | GET | `/orders` | **Admin only** |
| One order | GET | `/orders/:id` | Admin, or the customer who placed it |
| Update order status | PATCH | `/orders/:id/status` | **Admin only** |

**Place an order — request body**
```json
{
  "items": [
    { "menuItemId": "1", "quantity": 2 },
    { "menuItemId": "9", "quantity": 1 }
  ]
}
```
Send only the `menuItemId` and `quantity` — **never send a price**. The server
always looks up the current price from the menu itself, so nothing you send for
price is trusted or used. This is deliberate: never let the client decide the
price of anything.

**Response `201`**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "userId": "...",
    "items": [
      { "menuItemId": "1", "name": "Chicken Shawarma Wrap", "price": 120, "quantity": 2, "lineTotal": 240 }
    ],
    "total": 280,
    "status": "pending",
    "createdAt": "..."
  }
}
```

**Update status — request body** (admin only)
```json
{ "status": "preparing" }
```
Valid values: `pending`, `preparing`, `completed`, `cancelled`.

---

## Reminders from the Technical Requirements

- Store the token in `localStorage` and attach it automatically with an **Axios
  request interceptor** — don't add the header manually in every call.
- The landing page and menu browsing work with **no token at all** — only wrap
  the order/checkout flow and the admin dashboard in a `ProtectedRoute`.
- Read `role` from the logged-in user to decide whether to show the admin
  dashboard link — but remember the backend enforces it either way.
- On a `401` response, clear the stored token and send the user back to `/login`.
