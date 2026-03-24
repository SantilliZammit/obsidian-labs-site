import { useState } from "react";

export default function TB500() {
  const [size, setSize] = useState("5mg");
  const [open, setOpen] = useState(false);

  const price = size === "10mg" ? "$109.99" : "$59.99";
  const image = size === "10mg" ? "/tb-500-10mg.png" : "/tb-500.png";

  return (
    <div className="product-page">

      <h1>TB-500 Research</h1>
      <p className="subtitle">
        Advanced peptide for recovery, repair, and regenerative research
      </p>

      <div className="tags">
        <span>{size}</span>
        <span>Research Use Only</span>
        <span>Premium Lab Grade</span>
      </div>

      <div className="selector">
        <label>Size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="5mg">5 mg</option>
          <option value="10mg">10 mg</option>
        </select>
      </div>

      <h2 className="price">{price}</h2>

      {/* IMAGE + GLOW */}
      <div className={`product-image-wrap ${open ? "glow-active" : ""}`}>
        <div className="product-image-stack">

          <div className="glow"></div>

          <img src={image} className="product-image" />

        </div>
      </div>

      {/* 🔥 DROPDOWN DIRECTLY UNDER IMAGE */}
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          onClick={() => setOpen(!open)}
        >
          More Product Information ▼
        </button>

        <div className={`dropdown-content ${open ? "open" : ""}`}>
          <div className="info-card">

            <h3>Overview</h3>
            <p>
              TB-500 is a synthetic peptide derived from Thymosin Beta-4.
              It is widely studied for its ability to promote cell migration,
              tissue regeneration, and accelerated healing.
            </p>

            <h4>Key Research Areas</h4>
            <ul>
              <li>Muscle recovery</li>
              <li>Ligament and tendon repair</li>
              <li>Wound healing</li>
              <li>Inflammation modulation</li>
            </ul>

            <div className="buttons">
              <button className="primary">Request Research Access</button>
              <button className="secondary">View Lab Information</button>
            </div>

            <div className="buttons">
              <button className="primary">Add to Cart</button>
              <button className="secondary">Buy Now</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
                }
