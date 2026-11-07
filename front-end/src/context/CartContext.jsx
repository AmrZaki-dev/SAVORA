import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const CART_PREFIX = "SAVORA_cart_";

function getCartKey(user) {
  return user?.id ? `${CART_PREFIX}${user.id}` : null;
}

function loadCart(key) {
  if (!key) return [];

  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const cartKey = useMemo(() => getCartKey(user), [user?.id]);

  const [items, setItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  // Keeps track of which user's cart is currently loaded
  const loadedKeyRef = useRef(null);

  // Load the correct cart whenever the user changes
  useEffect(() => {
    if (authLoading) return;

    setCartLoading(true);

    // No logged-in user
    if (!cartKey) {
      loadedKeyRef.current = null;
      setItems([]);
      setCartLoading(false);
      return;
    }

    const savedItems = loadCart(cartKey);

    loadedKeyRef.current = cartKey;
    setItems(savedItems);
    setCartLoading(false);
  }, [cartKey, authLoading]);

  // Save the cart only after the correct user's cart has been loaded
  useEffect(() => {
    if (authLoading) return;
    if (!cartKey) return;

    // Prevent saving an old user's cart under the new user's key
    if (loadedKeyRef.current !== cartKey) return;

    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey, authLoading]);

  const addItem = useCallback((menuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.menuItemId === menuItem.id);

      if (existing) {
        return prev.map((item) =>
          item.menuItemId === menuItem.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image,
          category: menuItem.category,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((menuItemId) => {
    setItems((prev) => prev.filter((item) => item.menuItemId !== menuItemId));
  }, []);

  const updateQuantity = useCallback((menuItemId, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((item) => item.menuItemId !== menuItemId));
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
    cartLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
