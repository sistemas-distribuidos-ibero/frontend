
import React, { useState, useEffect } from 'react';
import { useAPI } from './useAPI';
import { useSessionContext } from '@hooks/useSessionContext'; // Import the custom hook

interface CartProps {
  token: string;
}

interface CartItem {
  id: string; // or number, depending on how item IDs are defined elsewhere
  quantity: number;
}

const Cart: React.FC<CartProps> = ({ token }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { get, post, delet } = useAPI(); // Note the typo in 'delet' could be fixed if it's within your control to 'delete'
  const sessionContext = useSessionContext(); // Use the session context hook

  const userId = sessionContext?.user; // Assuming 'user' contains the user ID

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) return; // Early return if userId is undefined

      const data = await get(`get-cart?user_id=${userId}`, token);
      if (data) {
        const itemsArray: CartItem[] = Object.entries(data).map(([id, quantity]) => ({ id, quantity: Number(quantity) }));
        setCartItems(itemsArray);
      } else {
        console.error('Failed to fetch cart');
      }
    };

    loadCart();
  }, [userId, token]); // Add userId to the dependency array

  const handleDeleteCart = async () => {
    if (!userId) return; // Early return if userId is undefined

    const data = await delet(`cart?user_id=${userId}`, token);
    if (data) {
      alert('Cart cleared!');
      setCartItems([]);
    } else {
      console.error('Failed to delete cart');
    }
  };

  const handleAddItem = async (itemId: string, quantity: number) => {
    if (!userId) return; // Early return if userId is undefined

    const body = JSON.stringify({ user_id: userId, item_id: itemId, quantity });
    const data = await post('cart', token, body);
    if (data) {
      loadCart();
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
      <button onClick={handleDeleteCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
