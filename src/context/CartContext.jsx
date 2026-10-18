import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("ejaztech_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem("ejaztech_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    setCartItems((prev) => {
      // Prevent duplicates
      if (prev.find((item) => item.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== courseId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((total, item) => {
    // If price is a number, add it. If "Free", add 0.
    return total + (typeof item.price === "number" ? item.price : 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}