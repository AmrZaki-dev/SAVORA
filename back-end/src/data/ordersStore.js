const fs = require("fs");
const path = require("path");
const menuItemsStore = require("./menuItemsStore");
const ApiError = require("../utils/ApiError");

const DATA_FILE = path.join(__dirname, "orders.json");
const VALID_STATUSES = ["pending", "preparing", "completed", "cancelled"];

function readAll() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeAll(orders) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

function getAll() {
  return readAll();
}

function getByUser(userId) {
  return readAll().filter((o) => o.userId === String(userId));
}

function getById(id) {
  return readAll().find((o) => o.id === String(id));
}

// requestedItems: [{ menuItemId, quantity }]
// Prices are NEVER trusted from the client — every price is looked up
// on the server from the current menu, at order time.
function create(userId, requestedItems) {
  if (!Array.isArray(requestedItems) || requestedItems.length === 0) {
    throw new ApiError(400, "'items' must be a non-empty array of { menuItemId, quantity }.");
  }

  const orderItems = requestedItems.map(({ menuItemId, quantity }) => {
    const qty = Number(quantity);
    if (!menuItemId || !Number.isInteger(qty) || qty < 1) {
      throw new ApiError(400, "Each item needs a valid 'menuItemId' and a positive integer 'quantity'.");
    }

    const menuItem = menuItemsStore.getById(menuItemId);
    if (!menuItem) {
      throw new ApiError(404, `Menu item '${menuItemId}' was not found.`);
    }
    if (menuItem.available === false) {
      throw new ApiError(400, `'${menuItem.name}' is currently unavailable.`);
    }

    return {
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price, // snapshot — future price changes won't affect old orders
      quantity: qty,
      lineTotal: menuItem.price * qty,
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const orders = readAll();
  const newOrder = {
    id: Date.now().toString(),
    userId: String(userId),
    items: orderItems,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeAll(orders);
  return newOrder;
}

function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new ApiError(400, `'status' must be one of: ${VALID_STATUSES.join(", ")}.`);
  }

  const orders = readAll();
  const index = orders.findIndex((o) => o.id === String(id));
  if (index === -1) return null;

  orders[index].status = status;
  writeAll(orders);
  return orders[index];
}

module.exports = { getAll, getByUser, getById, create, updateStatus, VALID_STATUSES };
