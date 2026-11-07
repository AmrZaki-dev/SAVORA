const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orders.controller");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.use(authenticate); // every order route requires a logged-in user

router.post("/", createOrder); // place an order
router.get("/my", getMyOrders); // "my orders" — must come before "/:id"
router.get("/", requireRole("admin"), getAllOrders); // every order (admin dashboard)
router.get("/:id", getOrder); // admin, or the customer who placed it
router.patch("/:id/status", requireRole("admin"), updateOrderStatus);

module.exports = router;
