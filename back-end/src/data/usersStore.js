const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const DATA_FILE = path.join(__dirname, "users.json");
const SALT_ROUNDS = 10;

function readAll() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeAll(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
}

// Never return the password hash to a controller/response by accident.
function toPublicUser(user) {
  if (!user) return user;
  // eslint-disable-next-line no-unused-vars
  const { password, ...publicUser } = user;
  return publicUser;
}

function getAll() {
  return readAll().map(toPublicUser);
}

function getById(id) {
  return toPublicUser(readAll().find((u) => u.id === String(id)));
}

// Internal-only — includes the password hash. Used by the auth
// controller to check credentials, never sent back in a response.
function getByEmailWithPassword(email) {
  return readAll().find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

function emailExists(email) {
  return !!getByEmailWithPassword(email);
}

async function create({ name, email, password, role }) {
  const users = readAll();
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password: passwordHash,
    // Registration can only ever create a "user" — role is never
    // trusted from client input. Admin accounts are seeded separately.
    role: role === "admin" ? "user" : role || "user",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeAll(users);
  return toPublicUser(newUser);
}

async function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

function update(id, data) {
  const users = readAll();
  const index = users.findIndex((u) => u.id === String(id));
  if (index === -1) return null;

  const existing = users[index];
  const updated = {
    ...existing,
    name: data.name ?? existing.name,
    email: data.email ? data.email.toLowerCase() : existing.email,
    // role is deliberately NOT updatable through this generic update —
    // promoting/demoting users is a separate, admin-only action.
  };

  users[index] = updated;
  writeAll(users);
  return toPublicUser(updated);
}

function setRole(id, role) {
  const users = readAll();
  const index = users.findIndex((u) => u.id === String(id));
  if (index === -1) return null;

  users[index].role = role;
  writeAll(users);
  return toPublicUser(users[index]);
}

function remove(id) {
  const users = readAll();
  const index = users.findIndex((u) => u.id === String(id));
  if (index === -1) return false;

  users.splice(index, 1);
  writeAll(users);
  return true;
}

// Used only by the startup seeding script — bypasses the
// "register can't create admins" rule on purpose.
async function createAdmin({ name, email, password }) {
  const users = readAll();
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const admin = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password: passwordHash,
    role: "admin",
    createdAt: new Date().toISOString(),
  };

  users.push(admin);
  writeAll(users);
  return toPublicUser(admin);
}

module.exports = {
  getAll,
  getById,
  getByEmailWithPassword,
  emailExists,
  create,
  verifyPassword,
  update,
  setRole,
  remove,
  createAdmin,
  toPublicUser,
};
