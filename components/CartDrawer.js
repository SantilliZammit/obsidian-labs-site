import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setOpen(false);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout session failed.");
        console.error(data);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong starting checkout.");
    }
  };

  return (
    <>
      {!open && (
        <button className="cart-drawer-toggle" onClick={() => setOpen(true)}>
          Cart{cartCount > 0 ? ` (${cartCount})` : ""}
        </button>
      )}

      <div
        className={`cart-drawer-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />

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

            <div className="cart-drawer-actions">
              <button
                className="secondary-btn"
                onClick={() => setOpen(false)}
                style={{ width: "100%" }}
              >
                Continue Shopping
              </button>
            </div>
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
                    <p className="cart-drawer-item-price">
                      ${Number(item.price).toFixed(2)}
                    </p>

                    <div className="cart-drawer-qty-row">
                      <button
                        className="cart-drawer-qty-btn"
                        onClick={() =>
                          updateQuantity(
                            item.slug,
                            item.variant,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span className="cart-drawer-qty-value">
                        {item.quantity}
                      </span>

                      <button
                        className="cart-drawer-qty-btn"
                        onClick={() =>
                          updateQuantity(
                            item.slug,
                            item.variant,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-drawer-remove"
                      onClick={() => removeFromCart(item.slug, item.variant)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <p className="cart-drawer-total-items">
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </p>
              <p className="cart-drawer-total">
                Subtotal: ${cartTotal.toFixed(2)}
              </p>

              <div className="cart-drawer-actions">
                <button
                  className="secondary-btn"
                  onClick={() => setOpen(false)}
                  style={{ width: "100%" }}
                >
                  Continue Shopping
                </button>

                <Link href="/cart" className="secondary-btn cart-drawer-link">
                  View Full Cart
                </Link>

                <button
                  className="primary-btn"
                  onClick={handleCheckout}
                  style={{ width: "100%" }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
                }
