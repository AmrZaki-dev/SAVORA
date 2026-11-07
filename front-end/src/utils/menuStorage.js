/**
 * menuStorage.js
 *
 * Centralised localStorage helpers for:
 *   - Menu item availability  (key: savora_menu_availability)
 *   - Menu item display order (key: savora_menu_order)
 *
 * Availability map shape:  { "<id>": true | false, ... }
 *   - true  = available (shown to customers)
 *   - false = unavailable (hidden from customers, visible to admin)
 *   - Missing entry => treated as true (available by default)
 *
 * Order array shape:  ["<id>", "<id>", ...]
 *   - Ordered list of menu item IDs
 *   - Missing entry => item appended at the end
 */

const AVAILABILITY_KEY = 'savora_menu_availability';
const ORDER_KEY = 'savora_menu_order';

// ---------------------------------------------------------------------------
// Availability helpers
// ---------------------------------------------------------------------------

/**
 * Read the full availability map from localStorage.
 * @returns {{ [id: string]: boolean }}
 */
export function getAvailabilityMap() {
  try {
    const raw = localStorage.getItem(AVAILABILITY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Persist the full availability map to localStorage.
 * @param {{ [id: string]: boolean }} map
 */
function saveAvailabilityMap(map) {
  localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(map));
}

/**
 * Check whether a single item is available.
 * Defaults to true if no entry exists.
 * @param {string|number} id
 * @returns {boolean}
 */
export function isItemAvailable(id) {
  const map = getAvailabilityMap();
  const key = String(id);
  return key in map ? map[key] : true;
}

/**
 * Set the availability of a single item and persist.
 * @param {string|number} id
 * @param {boolean} available
 */
export function setItemAvailability(id, available) {
  const map = getAvailabilityMap();
  map[String(id)] = Boolean(available);
  saveAvailabilityMap(map);
}

/**
 * Filter an array of menu items to only those that are available
 * according to the localStorage state.
 * @param {Array<{id: string|number}>} items
 * @returns {Array}
 */
export function filterAvailableItems(items) {
  const map = getAvailabilityMap();
  return items.filter((item) => {
    const key = String(item.id);
    return key in map ? map[key] : true;
  });
}

// ---------------------------------------------------------------------------
// Order helpers
// ---------------------------------------------------------------------------

/**
 * Read the saved menu order (array of ID strings) from localStorage.
 * Returns null if no order has been saved yet.
 * @returns {string[] | null}
 */
export function getMenuOrder() {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Persist the menu order to localStorage.
 * @param {Array<string|number>} ids
 */
export function setMenuOrder(ids) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(ids.map(String)));
}

/**
 * Sort an array of menu items according to the saved order.
 * Items not present in the saved order are appended at the end
 * in their original relative order.
 * @param {Array<{id: string|number}>} items
 * @returns {Array}
 */
export function applyMenuOrder(items) {
  const order = getMenuOrder();
  if (!order || order.length === 0) return items;

  const orderMap = {};
  order.forEach((id, idx) => {
    orderMap[String(id)] = idx;
  });

  return [...items].sort((a, b) => {
    const idxA = orderMap[String(a.id)] ?? Infinity;
    const idxB = orderMap[String(b.id)] ?? Infinity;
    return idxA - idxB;
  });
}

// ---------------------------------------------------------------------------
// Sync helpers (call after API fetch / add / delete)
// ---------------------------------------------------------------------------

/**
 * Synchronise localStorage order with the current backend item list:
 *   - Append new item IDs (not in saved order) to the end.
 *   - Prune IDs that no longer exist in the backend list.
 *   - Prune stale availability entries for deleted items.
 *   - Prune stale popular IDs for deleted items.
 *
 * Call this every time you receive a fresh list from the API so the
 * two sources of truth stay consistent.
 *
 * @param {Array<{id: string|number}>} items  Full list from the backend.
 */
export function syncNewItems(items) {
  const backendIds = items.map((i) => String(i.id));
  const backendSet = new Set(backendIds);

  // --- Order ---
  const savedOrder = getMenuOrder() ?? [];
  // Keep only IDs still in the backend
  const prunedOrder = savedOrder.filter((id) => backendSet.has(id));
  // Append any new IDs not yet tracked
  const savedSet = new Set(prunedOrder);
  for (const id of backendIds) {
    if (!savedSet.has(id)) prunedOrder.push(id);
  }
  setMenuOrder(prunedOrder);

  // --- Availability ---
  const map = getAvailabilityMap();
  let changed = false;
  for (const key of Object.keys(map)) {
    if (!backendSet.has(key)) {
      delete map[key];
      changed = true;
    }
  }
  if (changed) saveAvailabilityMap(map);
  // --- Popular IDs ---
  // Remove IDs for items that no longer exist in the backend so they
  // don't silently consume slots in the MAX_POPULAR cap.
  const currentPopular = getPopularIds();
  const prunedPopular = currentPopular.filter((id) => backendSet.has(id));
  if (prunedPopular.length !== currentPopular.length) {
    setPopularIds(prunedPopular);
  }
}

/**
 * Remove a single item's data from both localStorage stores.
 * Call this immediately after a successful delete API call.
 * @param {string|number} id
 */
export function removeItemFromStorage(id) {
  const key = String(id);

  // Remove from order
  const order = getMenuOrder();
  if (order) {
    setMenuOrder(order.filter((i) => i !== key));
  }

  // Remove from availability map
  const map = getAvailabilityMap();
  if (key in map) {
    delete map[key];
    saveAvailabilityMap(map);
  }
  // Remove from popular set
  const popular = getPopularIds();
  if (popular.includes(key)) {
    setPopularIds(popular.filter((i) => i !== key));
  }
}

// ---------------------------------------------------------------------------
// Popular-dish helpers  (key: savora_popular_ids)
// ---------------------------------------------------------------------------

const POPULAR_KEY = 'savora_popular_ids';
export const MAX_POPULAR = 8;

/**
 * Read the array of popular item IDs from localStorage.
 * @returns {string[]}
 */
export function getPopularIds() {
  try {
    const raw = localStorage.getItem(POPULAR_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Persist the popular IDs array (at most MAX_POPULAR entries).
 * @param {string[]} ids
 */
export function setPopularIds(ids) {
  localStorage.setItem(POPULAR_KEY, JSON.stringify(ids.slice(0, MAX_POPULAR).map(String)));
}

/**
 * Check whether a single item is marked as popular.
 * @param {string|number} id
 * @returns {boolean}
 */
export function isItemPopular(id) {
  return getPopularIds().includes(String(id));
}

/**
 * Toggle an item's popular status.
 * Adding is blocked when MAX_POPULAR items are already selected.
 * @param {string|number} id
 * @returns {{ ok: boolean, limitReached: boolean }}
 */
export function toggleItemPopular(id) {
  const key = String(id);
  const current = getPopularIds();
  if (current.includes(key)) {
    setPopularIds(current.filter((i) => i !== key));
    return { ok: true, limitReached: false };
  }
  if (current.length >= MAX_POPULAR) {
    return { ok: false, limitReached: true };
  }
  setPopularIds([...current, key]);
  return { ok: true, limitReached: false };
}


