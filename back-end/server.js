require("dotenv").config();
const app = require("./src/app");
const ensureDefaultAdmin = require("./src/utils/seedAdmin");

const PORT = process.env.PORT || 5000;

ensureDefaultAdmin()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Restaurant Ordering API running on http://localhost:${PORT}`);
      console.log(`   Health check: http://localhost:${PORT}/api/health`);
      console.log(`   Default admin: ${process.env.DEFAULT_ADMIN_EMAIL || "admin@techmaster.com"}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
