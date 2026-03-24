import { useState } from "react";
import Link from "next/link";

export default function Retatrutide() {
  const [variant, setVariant] = useState("60");

  const image =
    variant === "60"
      ? "/retatrutide-60mg.png"
      : "/retatrutide-30mg.png";

  return (
    <div className="product-page">
      <header className="product-nav">
        <div className="product-brand">OBSIDIAN LABS</div>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </header>

      <section className="product-container">
        <div className="product-image-section">
          <img src={image} alt="Retatrutide" />
        </div>

        <div className="product-info-section">
          <h1>Retatrutide</h1>
          <p className="product-subtitle">
            {variant === "60" ? "60 mg" : "30 mg"} Research Peptide
          </p>

          <p className="product-description">
            Advanced multi-pathway peptide designed for cutting-edge research
            applications. Manufactured with precision and presented with a
            premium clinical aesthetic.
          </p>

          {/* 🔥 VARIANT SELECTOR */}
          <div className="product-variants">
            <button
              className={variant === "30" ? "active" : ""}
              onClick={() => setVariant("30")}
            >
              30 mg
            </button>

            <button
              className={variant === "60" ? "active" : ""}
              onClick={() => setVariant("60")}
            >
              60 mg
            </button>
          </div>

          <div className="product-price">
            <span>
              {variant === "60" ? "$199.99" : "$129.99"}
            </span>
          </div>

          <button className="product-buy-btn">
            Add to Cart
          </button>

          <div className="product-meta">
            <p>Research Use Only</p>
            <p>Lyophilized Peptide</p>
          </div>
        </div>
      </section>
    </div>
  );
}
