import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";

const variants = [
  {
    label: "20 mg",
    price: 199.99,
    image: "/semaglutide-20mg.png",
  },
  {
    label: "30 mg",
    price: 249.99,
    image: "/semaglutide-30mg.png",
  },
  {
    label: "50 mg",
    price: 349.99,
    image: "/semaglutide-50mg.png",
  },
];

export default function SemaglutidePage() {
  const { addToCart, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState("20 mg");
  const [infoOpen, setInfoOpen] = useState(false);

  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.label === selectedSize) || variants[0],
    [selectedSize]
  );

  const handleAddToCart = () => {
    addToCart({
      slug: "semaglutide",
      name: "Semaglutide",
      variant: selectedVariant.label,
      price: selectedVariant.price,
      image: selectedVariant.image,
      quantity: 1,
    });
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-detail-page">
        <div className="product-detail-header">
          <p className="product-detail-eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-detail-title">Semaglutide Research</h1>
          <p className="product-detail-subtitle">
            Advanced peptide for appetite, body composition, and metabolic research
          </p>

          <div className="product-badge-row">
            <span>{selectedVariant.label}</span>
            <span>Research Use Only</span>
            <span>Premium Lab Grade</span>
          </div>

          <div className="product-size-row">
            <label htmlFor="semaglutide-size">Size</label>
            <select
              id="semaglutide-size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="product-size-select"
            >
              {variants.map((variant) => (
                <option key={variant.label} value={variant.label}>
                  {variant.label}
                </option>
              ))}
            </select>
          </div>

          <div className="product-big-price">
            ${selectedVariant.price.toFixed(2)}
          </div>
        </div>

        <div className="product-hero-card">
          <div className="product-hero-image-wrap">
            <img
              src={selectedVariant.image}
              alt={`Semaglutide ${selectedVariant.label}`}
              className="product-hero-image"
            />
          </div>
        </div>

        <div className="product-info-panel">
          <button
            className="product-info-toggle"
            onClick={() => setInfoOpen(!infoOpen)}
            type="button"
          >
            More Product Information {infoOpen ? "▲" : "▼"}
          </button>

          {infoOpen && (
            <div className="product-info-content">
              <p>
                Semaglutide is presented in the Obsidian Labs premium format with
                research-focused branding, clean design, and secure checkout.
              </p>
              <ul className="product-feature-list">
                <li>Premium quality vial presentation</li>
                <li>Research use only</li>
                <li>Fast shipping options at checkout</li>
                <li>Secure Stripe checkout flow</li>
              </ul>
            </div>
          )}
        </div>

        <div className="product-action-grid">
          <button className="primary-btn" type="button">
            Request Research Access
          </button>

          <button className="secondary-btn" type="button">
            View Lab Information
          </button>

          <button className="secondary-btn" type="button">
            View Certificate of Analysis
          </button>
        </div>

        <div className="product-buy-row">
          <button className="primary-btn" onClick={handleAddToCart} type="button">
            Add to Cart
          </button>

          <button className="secondary-btn" onClick={handleBuyNow} type="button">
            Buy Now
          </button>
        </div>
      </section>
    </div>
  );
          }
