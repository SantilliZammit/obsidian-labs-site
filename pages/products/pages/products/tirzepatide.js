import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function Tirzepatide() {
  const options = {
    "10 mg": {
      price: 129.99,
      image: "/tirzepatide-10mg.png",
    },
    "30 mg": {
      price: 299.99,
      image: "/tirzepatide-30mg.png",
    },
    "50 mg": {
      price: 449.99,
      image: "/tirzepatide-50mg.png",
    },
    "60 mg": {
      price: 529.99,
      image: "/tirzepatide-60mg.png",
    },
  };

  const [selectedSize, setSelectedSize] = useState("10 mg");
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
          <h1 className="product-title">Tirzepatide Research</h1>
          <p className="product-subtitle">
            Advanced peptide studied for metabolic support, appetite regulation,
            body composition, and performance-focused research applications.
          </p>

          <div className="product-tags">
            <span className="tag-pill">{selectedSize}</span>
            <span className="tag-pill">Research Use Only</span>
            <span className="tag-pill">Premium Lab Grade</span>
          </div>

          <div className="product-select-row">
            <label htmlFor="tirzepatide-size" className="select-label">
              Size
            </label>
            <select
              id="tirzepatide-size"
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

          <div className="price-display">${current.price.toFixed(2)}</div>

          {addedMessage && <div className="add-cart-toast">{addedMessage}</div>}
        </div>

        <div className={`product-image-wrap ${showInfo ? "glow-active" : ""}`}>
          <div className={`product-image-stack ${animateAdd ? "cart-added-pulse" : ""}`}>
            <img
              src={current.image}
              alt={`Tirzepatide ${selectedSize}`}
              className="product-image"
            />
            <img
              src={current.image}
              alt={`Tirzepatide ${selectedSize} reflection`}
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
              Tirzepatide is a research peptide commonly studied for metabolic
              support, appetite signaling, weight management, body composition,
              and glucose-related research pathways. It has become one of the
              most talked-about peptides in modern metabolic and performance
              research because of its broad potential applications across body
              recomposition and advanced wellness protocols.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Metabolic function support</li>
              <li>Appetite and satiety signaling</li>
              <li>Body composition research</li>
              <li>Weight management and performance-focused protocols</li>
            </ul>

            <h3>Product Details</h3>
            <ul>
              <li>Compound: Tirzepatide</li>
              <li>Available Sizes: 10 mg, 30 mg, 50 mg, 60 mg</li>
              <li>Form: Lyophilized powder</li>
              <li>Use: Research Use Only</li>
              <li>Premium lab-grade presentation</li>
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
