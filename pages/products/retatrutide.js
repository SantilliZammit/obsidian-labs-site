import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";

export default function Retatrutide() {
  const options = {
    "30 mg": {
      price: 129.99,
      image: "/retatrutide-30mg.png",
    },
    "60 mg": {
      price: 199.99,
      image: "/retatrutide-60mg.png",
    },
  };

  const [selectedSize, setSelectedSize] = useState("60 mg");
  const [showInfo, setShowInfo] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const current = options[selectedSize];

  const buildItem = () => ({
    slug: "retatrutide",
    name: "Retatrutide",
    variant: selectedSize,
    price: current.price,
    image: current.image,
    quantity: 1,
  });

  const handleAddToCart = () => {
    addToCart(buildItem());
    router.push("/cart");
  };

  const handleBuyNow = async () => {
    const item = buildItem();

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [item],
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout session failed.");
        console.error(data);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong starting checkout.");
    }
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-page">
        <div className="product-copy">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">Retatrutide Research</h1>
          <p className="product-subtitle">
            Advanced peptide for metabolic and weight management research
          </p>

          <div className="product-tags">
            <span className="tag-pill">{selectedSize}</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="product-select-row">
            <label htmlFor="retatrutide-size" className="select-label">
              Size
            </label>
            <select
              id="retatrutide-size"
              className="dose-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="30 mg">30 mg</option>
              <option value="60 mg">60 mg</option>
            </select>
          </div>

          <div className="price-display">${current.price.toFixed(2)}</div>
        </div>

        <div className={`product-image-wrap ${showInfo ? "glow-active" : ""}`}>
          <div className="product-image-stack">
            <img
              src={current.image}
              alt={`Retatrutide ${selectedSize}`}
              className="product-image"
            />
            <img
              src={current.image}
              alt={`Retatrutide ${selectedSize} reflection`}
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
              Retatrutide is an investigational peptide studied for metabolic
              function, body-weight regulation, and multi-receptor research.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Metabolic support research</li>
              <li>Weight management studies</li>
              <li>Energy regulation</li>
              <li>Multi-pathway peptide research</li>
            </ul>
          </div>
        </div>

        <div className="product-actions research-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
          <a
            href="/retatrutide-lab-report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn"
          >
            View Certificate of Analysis
          </a>
        </div>

        <div className="product-actions shop-actions">
          <button className="primary-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="secondary-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </section>
    </div>
  );
}
