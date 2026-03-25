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

  const [selectedSize, setSelectedSize] = useState("10 mg");
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

    setTimeout(() => {
      setAddedMessage("");
    }, 1800);

    setTimeout(() => {
      setAnimateAdd(false);
    }, 900);
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
          <h1 className="product-title">CJC-1295 Research</h1>

          <p className="product-subtitle">
            Advanced peptide studied for growth hormone support, recovery, body composition, and performance optimization.
          </p>

          <div className="product-tags">
            <span className="tag-pill">{selectedSize}</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="product-select-row">
            <label htmlFor="cjc-size" className="select-label">
              Size
            </label>
            <select
              id="cjc-size"
              className="dose-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="10 mg">10 mg</option>
            </select>
          </div>

          <div className="price-display">${current.price.toFixed(2)}</div>

          {addedMessage && <div className="add-cart-toast">{addedMessage}</div>}
        </div>

        <div className={`product-image-wrap ${showInfo ? "glow-active" : ""}`}>
          <div className={`product-image-stack ${animateAdd ? "cart-added-pulse" : ""}`}>
            <img
              src={current.image}
              alt={`CJC-1295 ${selectedSize}`}
              className="product-image"
            />
            <img
              src={current.image}
              alt={`CJC-1295 ${selectedSize} reflection`}
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
              CJC-1295 is a synthetic peptide commonly studied for its ability to stimulate natural growth hormone release. It is widely used in research focused on recovery, muscle repair, fat metabolism, and performance optimization.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Growth hormone optimization</li>
              <li>Recovery and tissue repair</li>
              <li>Body composition research</li>
              <li>Sleep quality and recovery cycles</li>
            </ul>

            <h3>Product Details</h3>
            <ul>
              <li>Compound: CJC-1295</li>
              <li>Dosage: 10 mg</li>
              <li>Form: Lyophilized powder</li>
              <li>Use: Research Use Only</li>
              <li>Premium lab-grade quality</li>
            </ul>
          </div>
        </div>

        <div className="product-actions research-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
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
