import { useMemo, useState } from "react";
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
  const [purchaseType, setPurchaseType] = useState("subscription");
  const [showInfo, setShowInfo] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [animateAdd, setAnimateAdd] = useState(false);
  const { addToCart } = useCart();

  const current = options[selectedSize];

  const subscriptionPrice = useMemo(() => current.price * 0.85, [current.price]);
  const finalPrice = purchaseType === "subscription" ? subscriptionPrice : current.price;
  const savings = current.price - subscriptionPrice;

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
        alert(data.error || "Checkout session failed.");
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

      <section className="product-page premium-product-page">
        <div className="product-copy premium-product-copy">
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
            <label htmlFor="semaglutide-size" className="select-label">
              Size
            </label>
            <select
              id="semaglutide-size"
              className="dose-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="20 mg">20 mg</option>
              <option value="30 mg">30 mg</option>
              <option value="50 mg">50 mg</option>
            </select>
          </div>

          <div className="premium-price-wrap">
            <div className="price-display">${finalPrice.toFixed(2)}</div>
            {purchaseType === "subscription" && (
              <div className="subscription-savings-line">
                Save ${savings.toFixed(2)} on every order
              </div>
            )}
          </div>

          <div className="purchase-options premium-purchase-options">
            <label
              className={`purchase-option premium-purchase-option ${
                purchaseType === "one-time" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="purchaseType"
                value="one-time"
                checked={purchaseType === "one-time"}
                onChange={() => setPurchaseType("one-time")}
              />
              <div className="purchase-option-copy">
                <div className="purchase-option-top">
                  <span className="purchase-option-title">One-time purchase</span>
                  <span className="purchase-option-price">
                    ${current.price.toFixed(2)}
                  </span>
                </div>
                <div className="purchase-option-sub">
                  Buy once with fast checkout
                </div>
              </div>
            </label>

            <label
              className={`purchase-option premium-purchase-option premium-subscription-option ${
                purchaseType === "subscription" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="purchaseType"
                value="subscription"
                checked={purchaseType === "subscription"}
                onChange={() => setPurchaseType("subscription")}
              />
              <div className="purchase-option-copy">
                <div className="purchase-option-top">
                  <span className="purchase-option-title">
                    Subscribe &amp; Save 15%
                  </span>
                  <span className="purchase-option-price">
                    ${subscriptionPrice.toFixed(2)}
                  </span>
                </div>
                <div className="purchase-option-sub">
                  Save ${savings.toFixed(2)} every order • Cancel anytime
                </div>
              </div>
              <span className="best-value-badge">Best Value</span>
            </label>
          </div>

          {addedMessage && <div className="add-cart-toast">{addedMessage}</div>}

          <div className="product-actions shop-actions premium-shop-actions">
            <button className="primary-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="secondary-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          <div className="trust-strip">
            <div className="trust-pill">Secure Checkout</div>
            <div className="trust-pill">Fast Shipping</div>
            <div className="trust-pill">Premium Lab Grade</div>
            <div className="trust-pill">Cancel Anytime</div>
          </div>
        </div>

        <div className={`product-image-wrap premium-image-wrap ${showInfo ? "glow-active" : ""}`}>
          <div className={`product-image-stack premium-image-stack ${animateAdd ? "cart-added-pulse" : ""}`}>
            <img
              src={current.image}
              alt={`Semaglutide ${selectedSize}`}
              className="product-image premium-product-image"
            />
            <img
              src={current.image}
              alt={`Semaglutide ${selectedSize} reflection`}
              className="product-reflection"
            />
            <div className="glow"></div>
          </div>
        </div>

        <div className="info-dropdown premium-info-dropdown">
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
              Semaglutide is an investigational peptide studied for appetite
              regulation, body composition, metabolic function, and weight
              management research.
            </p>

            <h3>Key Research Areas</h3>
            <ul>
              <li>Appetite regulation research</li>
              <li>Metabolic support studies</li>
              <li>Body composition research</li>
              <li>Weight management investigation</li>
            </ul>
          </div>
        </div>

        <div className="product-actions research-actions premium-research-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
          <button className="secondary-btn">View Certificate of Analysis</button>
        </div>
      </section>
    </div>
  );
                }
