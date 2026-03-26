import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function Semaglutide() {
  const options = {
    "20 mg": {
      price: 199.99,
      image: "/semaglutide-20mg.png",
    },
    "30 mg": {
      price: 249.99,
      image: "/semaglutide-30mg.png",
    },
    "50 mg": {
      price: 349.99,
      image: "/semaglutide-50mg.png",
    },
  };

  const [selectedSize, setSelectedSize] = useState("20 mg");
  const [purchaseType, setPurchaseType] = useState("one-time");
  const [showInfo, setShowInfo] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [animateAdd, setAnimateAdd] = useState(false);
  const { addToCart } = useCart();

  const current = options[selectedSize];

  const finalPrice =
    purchaseType === "subscription"
      ? current.price * 0.85
      : current.price;

  const buildItem = () => ({
    slug: "semaglutide",
    name: "Semaglutide",
    variant: `${selectedSize}${purchaseType === "subscription" ? " • Subscribe & Save 15%" : ""}`,
    price: finalPrice,
    image: current.image,
    quantity: 1,
    subscription: purchaseType === "subscription",
  });

  const handleAddToCart = () => {
    addToCart(buildItem());
    setAddedMessage(
      `Added Semaglutide ${selectedSize}${purchaseType === "subscription" ? " subscription" : ""} to cart`
    );
    setAnimateAdd(true);

    setTimeout(() => setAddedMessage(""), 1800);
    setTimeout(() => setAnimateAdd(false), 900);
  };

  const handleBuyNow = async () => {
    const item = buildItem();

    try {
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
        alert(data.error || "Checkout session failed.");
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
          <h1 className="product-title">Semaglutide Research</h1>
          <p className="product-subtitle">
            Advanced peptide for appetite, body composition, and metabolic research
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
              <option value="20 mg">20 mg</option>
              <option value="30 mg">30 mg</option>
              <option value="50 mg">50 mg</option>
            </select>
          </div>

          {/* PRICE FIRST */}
          <div className="price-display">${finalPrice.toFixed(2)}</div>

          {/* THEN SUBSCRIPTION */}
          <div className="purchase-options">
            <label className={`purchase-option ${purchaseType === "one-time" ? "active" : ""}`}>
              <input
                type="radio"
                name="purchaseType"
                checked={purchaseType === "one-time"}
                onChange={() => setPurchaseType("one-time")}
              />
              <span>One-time purchase</span>
            </label>

            <label className={`purchase-option ${purchaseType === "subscription" ? "active" : ""}`}>
              <input
                type="radio"
                name="purchaseType"
                checked={purchaseType === "subscription"}
                onChange={() => setPurchaseType("subscription")}
              />
              <span>Subscribe & Save 15%</span>
            </label>

            {purchaseType === "subscription" && (
              <p className="subscription-note">
                Save 15% on every recurring order. Cancel anytime.
              </p>
            )}
          </div>

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
          <button className="info-toggle" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Hide Product Information ▲" : "More Product Information ▼"}
          </button>

          <div className={`info-panel ${showInfo ? "open" : ""}`}>
            <h2>Overview</h2>
            <p>
              Semaglutide is studied for appetite regulation, metabolic function,
              and weight management research.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Appetite regulation</li>
              <li>Metabolic support</li>
              <li>Body composition</li>
              <li>Weight management</li>
            </ul>
          </div>
        </div>

        <div className="product-actions research-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
          <button className="secondary-btn">View Certificate of Analysis</button>
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
