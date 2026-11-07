const usersStore = require("../data/usersStore");

async function ensureDefaultAdmin() {
  const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@techmaster.com";
  const password = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@12345";
  const name = process.env.DEFAULT_ADMIN_NAME || "Admin";

  const existing = usersStore.getByEmailWithPassword(email);
  if (existing) {
    if (existing.role !== "admin") {
      usersStore.setRole(existing.id, "admin");
      console.log(`ℹ️  Promoted existing account (${email}) to admin.`);
    }
    return;
  }

  await usersStore.createAdmin({ name, email, password });
  console.log(`✅ Default admin account created: ${email}`);
}

module.exports = ensureDefaultAdmin;
