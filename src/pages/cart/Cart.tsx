import React, { useState, useEffect, useCallback } from 'react';
import { useAPI } from '@hooks/useAPI';
import { useSessionContext } from '@hooks/useSessionContext'; // Import the custom hook

interface CartItem {
  id: string; // or number, depending on how item IDs are defined elsewhere
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { post } = useAPI();
  const sessionContext = useSessionContext();

  const userId = sessionContext?.user?.id; // Assuming 'user' contains the user ID

  const loadCart = useCallback(async () => {
    if (!userId) return; // Early return if userId is undefined

    const body = JSON.stringify({ user_id: userId });
    const data = await post('get_cart', '', body);
    if (data) {
      const itemsArray: CartItem[] = Object.entries(data).map(([id, quantity]) => ({ id, quantity: Number(quantity) }));
      setCartItems(itemsArray);
    } else {
      console.error('Failed to fetch cart');
    }
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleAddItem = async (itemId: string, quantity: number) => {
    if (!userId) return; // Early return if userId is undefined

    const body = JSON.stringify({ user_id: userId, item_id: itemId, quantity });
    const success = await post('cart', '', body);
    if (success) {
      // Optimistic update
      const updatedCart = cartItems.map(item => item.id === itemId ? { ...item, quantity } : item);
      setCartItems(updatedCart);
      loadCart(); // Still load from server to confirm
    } else {
      console.error('Failed to add item');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>Product ID: {item.id}</h3>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleAddItem(item.id, item.quantity - 1)}>-</button>
          <button onClick={() => handleAddItem(item.id, item.quantity + 1)}>+</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
