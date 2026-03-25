import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout session failed");
        console.error("Checkout error:", data);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout session failed");
        console.error("Missing checkout URL:", data);
      }
    } catch (error) {
      console.error("Checkout request failed:", error);
      alert(error.message || "Something went wrong starting checkout.");
    }
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Continue Shopping
      </Link>

      <section className="cart-page">
        <div className="cart-header">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty.</p>
            <Link href="/" className="primary-btn cart-link-btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div
                  key={`${item.slug}-${item.variant}`}
                  className="cart-item-card"
                >
                  <div className="cart-item-image-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.variant}</p>
                    <p>${Number(item.price).toFixed(2)}</p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="cart-qty-row">
                      <button
                        className="qty-btn"
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

                      <span className="qty-value">{item.quantity}</span>

                      <button
                        className="qty-btn"
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
                      className="secondary-btn"
                      onClick={() => removeFromCart(item.slug, item.variant)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <p>Total: ${cartTotal.toFixed(2)}</p>

              <div className="cart-summary-actions">
                <button className="primary-btn" onClick={handleCheckout}>
                  Checkout
                </button>
                <button className="secondary-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
                        }
