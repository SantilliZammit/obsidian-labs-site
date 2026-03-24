import { useState } from "react";
import Link from "next/link";
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
  const [addedMessage, setAddedMessage] = useState("");

  const { cartItems, addToCart } = useCart();

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
    setAddedMessage(`Added Retatrutide ${selectedSize} to cart`);

    setTimeout(() => {
      setAddedMessage("");
    }, 2000);
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

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const retatrutideInCart = cartItems
    .filter((item) => item.slug === "retatrutide")
    .reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" className="back-link">
          ← Back to Products
        </Link>

        <Link
          href="/cart"
          className="secondary-btn"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Cart {cartCount > 0 ? `(${cartCount})` : ""}
        </Link>
      </div>

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

          {addedMessage && (
            <div
              style={{
                marginTop: "14px",
                padding: "12px 16px",
                border: "1px solid rgba(87, 227, 255, 0.35)",
                borderRadius: "12px",
                color: "#57e3ff",
                fontWeight: 600,
                background: "rgba(87, 227, 255, 0.08)",
              }}
            >
              {addedMessage}
            </div>
          )}

          <div
            style={{
              marginTop: "18px",
              padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p style={{ margin: 0, fontWeight: 700 }}>Your Product Bin</p>
            <p style={{ margin: "8px 0 0 0", opacity: 0.85 }}>
              Total items in cart: {cartCount}
            </p>
            <p style={{ margin: "6px 0 0 0", opacity: 0.85 }}>
              Retatrutide in cart: {retatrutideInCart}
            </p>

            <div style={{ marginTop: "14px" }}>
              <Link
                href="/cart"
                className="primary-btn"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                View Cart
              </Link>
            </div>
          </div>
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
