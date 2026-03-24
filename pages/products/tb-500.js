import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function TB500() {
  const options = {
    "5 mg": {
      price: 59.99,
      image: "/tb-500.png",
    },
    "10 mg": {
      price: 109.99,
      image: "/tb-500-10mg.png",
    },
  };

  const [selectedSize, setSelectedSize] = useState("5 mg");
  const [showInfo, setShowInfo] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [animateAdd, setAnimateAdd] = useState(false);
  const { addToCart } = useCart();

  const current = options[selectedSize];

  const buildItem = () => ({
    slug: "tb-500",
    name: "TB-500",
    variant: selectedSize,
    price: current.price,
    image: current.image,
    quantity: 1,
  });

  const handleAddToCart = () => {
    addToCart(buildItem());
    setAddedMessage(`Added TB-500 ${selectedSize} to cart`);
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
          <h1 className="product-title">TB-500 Research</h1>
          <p className="product-subtitle">
            Recovery-focused peptide for repair, healing, and research
          </p>

          <div className="product-tags">
            <span className="tag-pill">{selectedSize}</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="product-select-row">
            <label htmlFor="tb-size" className="select-label">
              Size
            </label>
            <select
              id="tb-size"
              className="dose-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="5 mg">5 mg</option>
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
              alt={`TB-500 ${selectedSize}`}
              className="product-image"
            />
            <img
              src={current.image}
              alt={`TB-500 ${selectedSize} reflection`}
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
              TB-500 is a synthetic peptide studied for its role in tissue recovery,
              repair, and cellular migration.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Recovery research</li>
              <li>Repair studies</li>
              <li>Tissue support</li>
              <li>Cell migration research</li>
            </ul>
          </div>
        </div>

        <div className="product-actions research-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
          <a
            href="/tb-500-lab-report.pdf"
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
