import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { cartItems, cartTotal } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <button className="cart-drawer-toggle" onClick={() => setOpen(!open)}>
        Cart{cartCount > 0 ? ` (${cartCount})` : ""}
      </button>

      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <button className="cart-drawer-close" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer-list">
              {cartItems.map((item) => (
                <div
                  key={`${item.slug}-${item.variant}`}
                  className="cart-drawer-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-drawer-item-image"
                  />

                  <div className="cart-drawer-item-info">
                    <p className="cart-drawer-item-name">{item.name}</p>
                    <p className="cart-drawer-item-variant">{item.variant}</p>
                    <p className="cart-drawer-item-qty">
                      Qty: {item.quantity}
                    </p>
                    <p className="cart-drawer-item-qty">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <p className="cart-drawer-total">
                Total: ${cartTotal.toFixed(2)}
              </p>

              <Link href="/cart" className="primary-btn cart-drawer-link">
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
