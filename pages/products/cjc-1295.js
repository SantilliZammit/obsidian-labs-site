import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CJC1295() {
  const options = {
    "10 mg": {
      price: 89.99,
      image: "/cjc-1295.png",
    },
  };

  const [selectedSize] = useState("10 mg");
  const [showInfo, setShowInfo] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [animateAdd, setAnimateAdd] = useState(false);
  const { addToCart } = useCart();

  const current = options[selectedSize];

  const buildItem = () => ({
    slug: "cjc-1295",
    name: "CJC-1295",
    variant: selectedSize,
    price: current.price,
    image: current.image,
    quantity: 1,
  });

  const handleAddToCart = () => {
    addToCart(buildItem());
    setAddedMessage(`Added CJC-1295 ${selectedSize} to cart`);
    setAnimateAdd(true);

    setTimeout(() => setAddedMessage(""), 1800);
    setTimeout(() => setAnimateAdd(false), 900);
  };

  const handleBuyNow = async () => {
    const item = buildItem();

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [item] }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed");
    }
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Products</Link>

      <section className="product-page">
        <div className="product-copy">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">CJC-1295</h1>

          <p className="product-subtitle">
            Growth hormone releasing peptide designed for advanced research applications.
          </p>

          <div className="product-tags">
            <span className="tag-pill">10 mg</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="price-display">${current.price.toFixed(2)}</div>

          {addedMessage && <div className="add-cart-toast">{addedMessage}</div>}
        </div>

        <div className={`product-image-wrap ${showInfo ? "glow-active" : ""}`}>
          <div className={`product-image-stack ${animateAdd ? "cart-added-pulse" : ""}`}>
            <img src={current.image} className="product-image" />
            <img src={current.image} className="product-reflection" />
            <div className="glow"></div>
          </div>
        </div>

        <div className="info-dropdown">
          <button onClick={() => setShowInfo(!showInfo)} className="info-toggle">
            {showInfo ? "Hide Product Info ▲" : "More Product Info ▼"}
          </button>

          <div className={`info-panel ${showInfo ? "open" : ""}`}>
            <h2>Overview</h2>
            <p>
              CJC-1295 is a synthetic peptide that stimulates growth hormone release.
              It is widely researched for its role in recovery, performance, and metabolic function.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Growth hormone optimization</li>
              <li>Recovery and repair</li>
              <li>Fat metabolism</li>
              <li>Performance enhancement</li>
            </ul>
          </div>
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
