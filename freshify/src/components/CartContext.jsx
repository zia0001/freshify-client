import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize state with cart data from localStorage if it exists
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('freshifyCart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('freshifyCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === itemName);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems.filter((i) => i.name !== itemName);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('freshifyCart');
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}