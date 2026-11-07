const menuItemsStore = require("../data/menuItemsStore");
const ApiError = require("../utils/ApiError");

// GET /api/menu?search=&category=  (public — no login needed)
function getMenu(req, res) {
  const { search, category } = req.query;
  const items = menuItemsStore.getAll({ search, category, availableOnly: true });
  res.status(200).json({ success: true, count: items.length, data: items });
}

// GET /api/menu/:id  (public)
function getMenuItem(req, res, next) {
  const item = menuItemsStore.getById(req.params.id);
  if (!item) {
    return next(new ApiError(404, `Menu item with id '${req.params.id}' was not found.`));
  }
  res.status(200).json({ success: true, data: item });
}

// POST /api/menu  (admin only)
function createMenuItem(req, res) {
  const item = menuItemsStore.create(req.body);
  res.status(201).json({ success: true, data: item });
}

// PUT /api/menu/:id  (admin only)
function updateMenuItem(req, res, next) {
  const updated = menuItemsStore.update(req.params.id, req.body);
  if (!updated) {
    return next(new ApiError(404, `Menu item with id '${req.params.id}' was not found.`));
  }
  res.status(200).json({ success: true, data: updated });
}

// DELETE /api/menu/:id  (admin only)
function deleteMenuItem(req, res, next) {
  const deleted = menuItemsStore.remove(req.params.id);
  if (!deleted) {
    return next(new ApiError(404, `Menu item with id '${req.params.id}' was not found.`));
  }
  res.status(200).json({ success: true, message: "Menu item deleted successfully." });
}

// PUT /api/menu/reorder  (admin only)
function reorderMenu(req, res, next) {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return next(new ApiError(400, "Invalid payload. 'ids' must be an array of item IDs."));
  }
  const updatedItems = menuItemsStore.reorder(ids);
  res.status(200).json({ success: true, message: "Menu items reordered successfully.", data: updatedItems });
}

module.exports = { getMenu, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem, reorderMenu };
