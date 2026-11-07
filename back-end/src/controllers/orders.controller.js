const ordersStore = require("../data/ordersStore");
const ApiError = require("../utils/ApiError");

// POST /api/orders  (any logged-in user)
// Body: { items: [{ menuItemId, quantity }] }
function createOrder(req, res, next) {
  try {
    const order = ordersStore.create(req.user.id, req.body.items);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/my  (any logged-in user — their own order history)
function getMyOrders(req, res) {
  const orders = ordersStore.getByUser(req.user.id);
  res.status(200).json({ success: true, count: orders.length, data: orders });
}

// GET /api/orders  (admin only — every order, from every customer)
function getAllOrders(req, res) {
  const orders = ordersStore.getAll();
  res.status(200).json({ success: true, count: orders.length, data: orders });
}

// GET /api/orders/:id  (admin, or the customer who placed it)
function getOrder(req, res, next) {
  const order = ordersStore.getById(req.params.id);
  if (!order) {
    return next(new ApiError(404, `Order with id '${req.params.id}' was not found.`));
  }
  if (req.user.role !== "admin" && order.userId !== req.user.id) {
    return next(new ApiError(403, "You can only view your own orders."));
  }
  res.status(200).json({ success: true, data: order });
}

// PATCH /api/orders/:id/status  (admin only)
// Body: { status: "pending" | "preparing" | "completed" | "cancelled" }
function updateOrderStatus(req, res, next) {
  try {
    const updated = ordersStore.updateStatus(req.params.id, req.body.status);
    if (!updated) {
      return next(new ApiError(404, `Order with id '${req.params.id}' was not found.`));
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, getMyOrders, getAllOrders, getOrder, updateOrderStatus };
