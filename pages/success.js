import Link from "next/link";

export default function Success() {
  return (
    <div className="container">
      <section className="cart-page">
        <div className="cart-header">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">Payment Successful 🎉</h1>
          <p className="product-subtitle">
            Your order has been placed successfully.
          </p>
        </div>

        <div className="cart-empty">
          <p>Thank you for your purchase.</p>
          <Link href="/" className="primary-btn cart-link-btn">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
