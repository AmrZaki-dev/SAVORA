# Restaurant Ordering API — TechMaster Academy (Phase 4)

A Node.js + Express REST API for the Phase 4 "Restaurant" project: a public menu,
JWT auth, customer ordering, and an admin dashboard to manage dishes. Data is
stored in local JSON files — no database to install.

## The flow this backend supports

1. **Landing page** — anyone can browse the menu, no login required.
2. **Register / Login** — customers create an account to order.
3. **Place an order** — requires login. Prices are always taken from the current
   menu on the server, never trusted from the client.
4. **Profile** — a logged-in user can fetch their own account info.
5. **Admin dashboard** — the seeded admin account can create, edit, and delete
   menu items, see every order, and update an order's status.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev        # starts on http://localhost:5000 with auto-reload
# or: npm start
```

On first start, the server automatically creates **one default admin account**
from `.env`:

```
DEFAULT_ADMIN_EMAIL=admin@techmaster.com
DEFAULT_ADMIN_PASSWORD=Admin@12345
```

This check is idempotent — restarting the server never creates a duplicate.

## Reset the data

```bash
npm run seed
```

Resets `menuItems.json` to the seed list, clears `users.json` and `orders.json`.
**Restart the server afterwards** so the default admin gets recreated.

## How roles work

- `POST /api/auth/register` always creates a `user` (customer) account — the
  `role` field in the request body is ignored on purpose.
- The only admin account is the seeded default one. There's no self-promotion
  endpoint in this build — add one deliberately if you want students to see
  that flow too.
- Menu items can be **read by anyone** (including guests, for the landing page),
  but only **created, edited, or deleted by an admin**.
- Orders can only be **placed by a logged-in user**, and a customer can only see
  their own orders — an admin can see everyone's.

## Deploying for students

Deploy this folder as-is to any Node host (Render, Railway, Cyclic, etc.):

- Build command: `npm install`
- Start command: `npm start`
- Environment variables: set `JWT_SECRET` to something private, and set
  `DEFAULT_ADMIN_EMAIL` / `DEFAULT_ADMIN_PASSWORD` for the shared classroom admin
  login. `PORT` is usually provided by the host.

Once deployed, share the base URL and `API_ENDPOINTS.md` with students.

## Project structure

```
src/
 ├─ controllers/     auth, menu, orders — route handlers
 ├─ data/            JSON "database" + access layer (users, menuItems, orders)
 ├─ middleware/      authenticate (JWT), requireRole (RBAC), validation, errors
 ├─ routes/          Express routers
 ├─ utils/           ApiError, JWT sign/verify, admin seeding, data reset
 └─ app.js           Express app (middleware + routes wiring)
server.js             Entry point — seeds the default admin, then starts listening
```

## Notes for grading

- Order totals are computed server-side from the live menu at order time and then
  snapshotted onto the order — later menu price changes never retroactively change
  old orders. This is a deliberate example worth pointing out to students: never
  trust a price sent from the client.
- If all students share one deployed instance, they'll see each other's orders
  and accounts — for individual grading, give each student their own deployment,
  or have them run the API locally.
