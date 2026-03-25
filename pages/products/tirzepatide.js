import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function Tirzepatide() {
  const options = {
    "10 mg": {
      price: 99.99,
      image: "/tirzepatide-10mg.png",
    },
    "30 mg": {
      price: 199.99,
      image: "/tirzepatide-30mg.png",
    },
    "50 mg": {
      price: 299.99,
      image: "/tirzepatide-50mg.png",
    },
    "60 mg": {
      price: 349.99,
      image: "/tirzepatide-60mg.png",
    },
  };

  const [selectedSize, setSelectedSize] = useState("30 mg");
  const [showInfo, setShowInfo] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [animateAdd, setAnimateAdd] = useState(false);
  const { addToCart } = useCart();

  const current = options[selectedSize];

  const buildItem = () => ({
    slug: "tirzepatide",
    name: "Tirzepatide",
    variant: selectedSize,
    price: current.price,
    image: current.image,
    quantity: 1,
  });

  const handleAddToCart = () => {
    addToCart(buildItem());
    setAddedMessage(`Added Tirzepatide ${selectedSize} to cart`);
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
      alert("Checkout failed.");
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

          <h1 className="product-title">Tirzepatide Research</h1>

          <p className="product-subtitle">
            Advanced dual-action peptide studied for metabolic optimization,
            glucose regulation, and weight management support.
          </p>

          <div className="product-tags">
            <span className="tag-pill">{selectedSize}</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="product-select-row">
            <label className="select-label">Size</label>

            <select
              className="dose-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="10 mg">10 mg</option>
              <option value="30 mg">30 mg</option>
              <option value="50 mg">50 mg</option>
              <option value="60 mg">60 mg</option>
            </select>
          </div>

          <div className="price-display">
            ${current.price.toFixed(2)}
          </div>

          {addedMessage && (
            <div className="add-cart-toast">{addedMessage}</div>
          )}
        </div>

        <div className="product-image-wrap">
          <div className={`product-image-stack ${animateAdd ? "cart-added-pulse" : ""}`}>
            <img src={current.image} className="product-image" />
            <img src={current.image} className="product-reflection" />
            <div className="glow"></div>
          </div>
        </div>

        <div className="info-dropdown">
          <button
            className="info-toggle"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? "Hide Info ▲" : "More Info ▼"}
          </button>

          <div className={`info-panel ${showInfo ? "open" : ""}`}>
            <h2>Overview</h2>
            <p>
              Tirzepatide is a dual GIP and GLP-1 receptor agonist currently
              being studied for its powerful effects on metabolic function,
              appetite regulation, insulin sensitivity, and weight management.
            </p>

            <h3>Research Focus</h3>
            <ul>
              <li>Weight management</li>
              <li>Glucose control</li>
              <li>Metabolic efficiency</li>
              <li>Appetite suppression</li>
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
