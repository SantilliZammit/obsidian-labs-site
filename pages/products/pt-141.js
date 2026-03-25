import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function PT141Page() {
  const { addToCart } = useCart();
  const [selectedDose, setSelectedDose] = useState("10mg");
  const [showInfo, setShowInfo] = useState(false);

  const product = {
    name: "PT-141",
    subtitle:
      "Advanced peptide designed to support libido, performance, and neurological signaling research.",
    image: "/pt141-10mg.png",
    doses: {
      "10mg": 79.99,
    },
  };

  const price = product.doses[selectedDose];

  const handleAddToCart = () => {
    addToCart({
      id: `pt-141-${selectedDose}`,
      name: "PT-141",
      variant: selectedDose,
      price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="product-page">
        <div className="product-copy">
          <p className="eyebrow">FLAGSHIP COMPOUND</p>
          <h1 className="product-title">PT-141</h1>
          <p className="product-subtitle">{product.subtitle}</p>

          <div className="product-tags">
            <span className="tag-pill">Performance Research</span>
            <span className="tag-pill">Neurological Signaling</span>
            <span className="tag-pill">Research Use Only</span>
          </div>

          <div className="product-select-row">
            <span className="select-label">Select Dose:</span>
            <select
              className="dose-select"
              value={selectedDose}
              onChange={(e) => setSelectedDose(e.target.value)}
            >
              <option value="10mg">10mg</option>
            </select>
          </div>

          <div className="price-display">${price.toFixed(2)}</div>
        </div>

        <div className="product-image-wrap">
          <div className="product-image-stack">
            <img
              src={product.image}
              alt="PT-141 10mg"
              className="product-image"
            />
            <img
              src={product.image}
              alt=""
              className="product-reflection"
            />
            <div className="glow" />
          </div>
        </div>

        <div className="product-actions research-actions">
          <button className="primary-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button
            className="secondary-btn"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? "Hide Details" : "Learn More"}
          </button>
        </div>

        <div className="info-dropdown">
          <div className={`info-panel ${showInfo ? "open" : ""}`}>
            <h2>About PT-141</h2>
            <p>
              PT-141 is a research peptide studied for libido, performance, and
              central nervous system signaling. Obsidian Labs presents PT-141 in
              a clean, premium research-grade format aligned with the rest of
              the product line.
            </p>

            <h3>Product Details</h3>
            <ul>
              <li>Compound: PT-141</li>
              <li>Dosage: 10mg</li>
              <li>Form: Lyophilized powder</li>
              <li>Use: Research Use Only</li>
              <li>Premium research-grade presentation</li>
            </ul>

            <h3>Important Notice</h3>
            <p>For research use only. Not for human consumption.</p>
          </div>
        </div>
      </div>
    </div>
  );
                }
