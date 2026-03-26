import Link from "next/link";
import { useState } from "react";
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
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

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

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-page">
        <div className="product-image-wrap">
          <img
            src={selectedVariant.image}
            alt={selectedVariant.label}
            className="product-image"
          />
        </div>

        <div className="product-details">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">Semaglutide</h1>
          <p className="product-subtitle">Premium Quality</p>

          <div className="product-price">
            ${selectedVariant.price.toFixed(2)}
          </div>

          <div className="variant-selector">
            {variants.map((variant) => (
              <button
                key={variant.label}
                className={`variant-btn ${
                  selectedVariant.label === variant.label ? "active" : ""
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.label}
              </button>
            ))}
          </div>

          <p className="product-description">
            Premium quality Semaglutide vial with Obsidian Labs design.
            Clean presentation, secure checkout, and fast shipping.
          </p>

          <div className="product-actions">
            <button className="primary-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
