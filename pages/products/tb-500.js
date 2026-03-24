import { useState } from "react";
import Link from "next/link";

export default function TB500() {
  const options = {
    "5 mg": {
      price: "$59.99",
      image: "/tb-500.png",
    },
    "10 mg": {
      price: "$109.99",
      image: "/tb-500-10mg.png",
    },
  };

  const [selectedSize, setSelectedSize] = useState("5 mg");
  const [showInfo, setShowInfo] = useState(false);

  const current = options[selectedSize];

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-page">
        <div className="product-copy">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">TB-500 Research</h1>
          <p className="product-subtitle">
            Advanced peptide for recovery, repair, and regenerative research
          </p>

          <div className="product-tags">
            <span className="tag-pill">{selectedSize}</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="product-select-row">
            <label htmlFor="tb500-size" className="select-label">
              Size
            </label>
            <select
              id="tb500-size"
              className="dose-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="5 mg">5 mg</option>
              <option value="10 mg">10 mg</option>
            </select>
          </div>

          <div className="price-display">{current.price}</div>
        </div>

        <div className={`product-image-wrap ${showInfo ? "glow-active" : ""}`}>
          <div className="product-image-stack">
            <img
              src={current.image}
              alt={`TB-500 ${selectedSize}`}
              className="product-image"
            />
            <img
              src={current.image}
              alt={`TB-500 ${selectedSize} reflection`}
              className="product-reflection"
            />
            <div className="glow"></div>
          </div>
        </div>

        <div className="info-dropdown">
          <button
            className="info-toggle"
            type="button"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? "Hide Product Information ▲" : "More Product Information ▼"}
          </button>

          <div className={`info-panel ${showInfo ? "open" : ""}`}>
            <h2>Overview</h2>
            <p>
              TB-500 is a synthetic peptide derived from Thymosin Beta-4. It is
              widely studied for its role in recovery, cell migration, tissue
              regeneration, and accelerated healing.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Muscle recovery</li>
              <li>Ligament and tendon repair</li>
              <li>Wound healing</li>
              <li>Inflammation modulation</li>
            </ul>
          </div>
        </div>

        <div className="product-actions research-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
        </div>

        <div className="product-actions shop-actions">
          <button className="primary-btn">Add to Cart</button>
          <button className="secondary-btn">Buy Now</button>
        </div>
      </section>
    </div>
  );
                }
