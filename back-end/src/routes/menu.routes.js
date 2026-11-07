const express = require("express");
const {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  reorderMenu,
} = require("../controllers/menu.controller");
const validateMenuItem = require("../middleware/validateMenuItem");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

// Public — the landing page shows the menu without anyone logging in
router.get("/", getMenu);
router.get("/:id", getMenuItem);

// Admin only — creating/editing/removing dishes
router.post("/", authenticate, requireRole("admin"), validateMenuItem, createMenuItem);
router.put("/reorder", authenticate, requireRole("admin"), reorderMenu);
router.put("/:id", authenticate, requireRole("admin"), validateMenuItem, updateMenuItem);
router.delete("/:id", authenticate, requireRole("admin"), deleteMenuItem);

module.exports = router;
