import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          padding: "10px 16px",
          borderRadius: "10px",
          background: "#00e0ff",
          color: "#000",
          fontWeight: "bold",
          border: "none",
        }}
      >
        Cart ({cart.length})
      </button>

      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-320px",
          width: "320px",
          height: "100%",
          background: "#0a0a0a",
          color: "#fff",
          padding: "20px",
          transition: "0.3s",
          zIndex: 9998,
        }}
      >
        <h2>Your Cart</h2>

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map((item, i) => (
          <div key={i}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </>
  );
        }
