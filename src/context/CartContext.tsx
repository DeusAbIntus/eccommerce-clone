import { createContext, useState, useContext, type ReactNode } from "react";
import type { CartItemType, CheckoutItemType } from "../data/Interface";
import { getProductById } from "../data/Product";

type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (productId: number) => void;
  getTotalQuantity: () => number;
  getCartItemsWithProducts: () => CheckoutItemType[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotalAmount: () => number;
  placeOrder: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("No context for Cart found.");
  }
  return context;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  function addToCart(productId: number): void {
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem) {
      const updatedCartItems: CartItemType[] = cartItems.map((item) =>
        item.id === existingItem.id
          ? { id: item.id, quantity: existingItem.quantity + 1 }
          : item,
      );
      setCartItems(updatedCartItems);
      console.log(`Quantity updated of Item with id ${productId}`);
    } else {
      const newItem: CartItemType = { id: productId, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      console.log(`New item added to cart with id ${productId}`);
    }
  }

  function getTotalQuantity(): number {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    return totalQuantity;
  }

  function getCartItemsWithProducts(): CheckoutItemType[] {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(String(item.id)),
      }))
      .filter((item): item is CheckoutItemType => item.product !== undefined);
  }

  function removeFromCart(productId: number): void {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function getCartTotalAmount(): number {
    const total = cartItems.reduce((sum, item) => {
      const product = getProductById(String(item.id));
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    return total;
  }

  function placeOrder() {
    alert("Purchase Successful!");
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getTotalQuantity,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotalAmount,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
