import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // LOAD CART FROM STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("obsidian-cart");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  // SAVE CART TO STORAGE
  useEffect(() => {
    localStorage.setItem("obsidian-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) =>
          item.slug === product.slug && item.variant === product.variant
      );

      if (exists) {
        return prev.map((item) =>
          item.slug === product.slug && item.variant === product.variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (slug, variant) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.slug !== slug || item.variant !== variant
      )
    );
  };

  const updateQuantity = (slug, variant, quantity) => {
    if (quantity <= 0) {
      removeFromCart(slug, variant);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
