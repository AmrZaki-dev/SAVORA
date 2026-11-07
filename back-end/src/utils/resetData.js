// Resets src/data/menuItems.json back to the original seed data, and
// clears src/data/users.json + src/data/orders.json (the default admin
// is recreated the next time the server starts). Run with: npm run seed
const fs = require("fs");
const path = require("path");

const menuSeed = path.join(__dirname, "..", "data", "menuItems.seed.json");
const menuFile = path.join(__dirname, "..", "data", "menuItems.json");
const usersFile = path.join(__dirname, "..", "data", "users.json");
const ordersFile = path.join(__dirname, "..", "data", "orders.json");

fs.writeFileSync(menuFile, fs.readFileSync(menuSeed, "utf-8"), "utf-8");
fs.writeFileSync(usersFile, "[]", "utf-8");
fs.writeFileSync(ordersFile, "[]", "utf-8");

console.log("✅ menuItems.json reset to seed data.");
console.log("✅ users.json and orders.json cleared — restart the server to recreate the default admin.");
