import { useState } from "react";
import Link from "next/link";

export default function BPC157() {
  const options = {
    "5 mg": {
      price: "$49.99",
      image: "/bpc-157.png",
    },
    "10 mg": {
      price: "$99.99",
      image: "/bpc-157-10mg.png",
    },
  };

  const [selectedSize, setSelectedSize] = useState("5 mg");
  const current = options[selectedSize];

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-hero single-column">
        <div className="product-copy centered-copy">
          <p className="eyebrow">OBSIDIAN LABS</p>

          <h1 className="product-title">BPC-157 Research</h1>

          <p className="product-subtitle">
            Advanced peptide for tissue repair and regenerative research
          </p>

          <div className="product-tags centered-tags">
            <span className="tag-pill">{selectedSize}</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="product-select-row">
            <label htmlFor="bpc-size" className="select-label">
              Size
            </label>

            <select
              id="bpc-size"
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

        <div className="product-image-wrap">
          <div className="product-image-stack">
            <img
              src={current.image}
              alt={`BPC-157 ${selectedSize}`}
              className="product-image"
            />
            <img
              src={current.image}
              alt={`BPC-157 ${selectedSize} reflection`}
              className="product-reflection"
            />
          </div>
        </div>
      </section>

      <section className="product-panel">
        <h2>Overview</h2>

        <p>
          BPC-157 is a synthetic peptide derived from a protective protein found
          in the stomach. It is widely studied for its regenerative and healing
          properties at the cellular level.
        </p>

        <h3>Key Research Areas</h3>

        <ul>
          <li>Tissue repair</li>
          <li>Ligament and tendon healing</li>
          <li>Gut health support</li>
          <li>Inflammation modulation</li>
        </ul>

        <div className="product-actions top-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
        </div>

        <div className="product-actions bottom-actions">
          <button className="primary-btn">Add to Cart</button>
          <button className="secondary-btn">Buy Now</button>
        </div>
      </section>
    </div>
  );
                }
