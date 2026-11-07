import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRouter from "./routes/AppRouter";
import ErrorBoundary from "./components/common/organisms/ErrorBoundary";

/**
 * App bootstrap: keep the root providers centralized so
 * auth/cart state and route protection are easy to follow.
 */
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <AppRouter />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#333",
                color: "#fff",
                borderRadius: "10px",
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
