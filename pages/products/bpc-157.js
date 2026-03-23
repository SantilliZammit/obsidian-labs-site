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
  const [open, setOpen] = useState(false);

  const current = options[selectedSize];

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-hero">
        <div className="product-copy centered">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1>BPC-157 Research</h1>
          <p className="subtitle">
            Advanced peptide for tissue repair and regenerative research
          </p>

          <div className="tags">
            <span>5 mg</span>
            <span>Research Use Only</span>
            <span>Premium Lab Grade</span>
          </div>

          <div className="selector">
            <label>Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option>5 mg</option>
              <option>10 mg</option>
            </select>
          </div>

          <div className="price">{current.price}</div>
        </div>

        {/* IMAGE + GLOW */}
        <div className={`image-wrap ${open ? "glow-active" : ""}`}>
          <img src={current.image} className="product-image" />
          <div className="glow"></div>
        </div>

        {/* BUTTONS */}
        <div className="button-row">
          <button className="primary">Request Research Access</button>
          <button className="secondary">View Lab Information</button>
        </div>

        <div className="button-row">
          <button className="primary">Add to Cart</button>
          <button className="secondary">Buy Now</button>
        </div>

        {/* DROPDOWN (DIRECTLY UNDER IMAGE) */}
        <div className="dropdown">
          <button onClick={() => setOpen(!open)} className="dropdown-toggle">
            More Product Information ▼
          </button>

          <div className={`dropdown-content ${open ? "open" : ""}`}>
            <h3>Overview</h3>
            <p>
              BPC-157 is a synthetic peptide derived from a protective protein
              found in the stomach. It is widely studied for its regenerative
              and healing properties at the cellular level.
            </p>

            <h4>Key Research Areas</h4>
            <ul>
              <li>Tissue repair</li>
              <li>Ligament and tendon healing</li>
              <li>Gut health support</li>
              <li>Inflammation modulation</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
