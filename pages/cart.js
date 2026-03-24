import Link from "next/link";

export default function CartPage() {
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

        <div className="cart-empty">
          <p>Your cart is currently empty.</p>
          <Link href="/" className="primary-btn cart-link-btn">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}
