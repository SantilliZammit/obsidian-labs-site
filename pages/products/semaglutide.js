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

  const frequentlyBoughtTogether = [
    {
      id: "bpc-157",
      name: "BPC-157 10 mg",
      price: 49.99,
      image: "/bpc-157-10mg.png",
    },
    {
      id: "tb-500",
      name: "TB-500 10 mg",
      price: 59.99,
      image: "/tb-500-10mg.png",
    },
  ];

  const peopleAlsoBought = [
    {
      id: "tirzepatide",
      name: "Tirzepatide 10 mg",
      price: 129.99,
      image: "/tirzepatide-10mg.png",
    },
    {
      id: "retatrutide",
      name: "Retatrutide 30 mg",
      price: 129.99,
      image: "/retatrutide-30mg.png",
    },
    {
      id: "cjc-1295",
      name: "CJC-1295",
      price: 89.99,
      image: "/cjc-1295.png",
    },
  ];

  const orderBump = {
    id: "lab-priority",
    name: "Priority Handling + Premium Packaging",
    price: 19.99,
  };

  const [selectedSize, setSelectedSize] = useState("20 mg");
  const [purchaseType, setPurchaseType] = useState("subscription");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("monthly");
  const [showInfo, setShowInfo] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [animateAdd, setAnimateAdd] = useState(false);
  const [selectedBundleIds, setSelectedBundleIds] = useState(["bpc-157"]);
  const [selectedAlsoBoughtIds, setSelectedAlsoBoughtIds] = useState([]);
  const [bumpSelected, setBumpSelected] = useState(true);
  const { addToCart } = useCart();

  const current = options[selectedSize];

  const subscriptionPrice = useMemo(() => current.price * 0.85, [current.price]);
  const finalPrice = purchaseType === "subscription" ? subscriptionPrice : current.price;
  const savings = current.price - subscriptionPrice;
  const frequencyLabel = subscriptionFrequency === "biweekly" ? "Every 2 Weeks" : "Monthly";

  const selectedBundleItems = frequentlyBoughtTogether.filter((item) =>
    selectedBundleIds.includes(item.id)
  );

  const selectedAlsoBoughtItems = peopleAlsoBought.filter((item) =>
    selectedAlsoBoughtIds.includes(item.id)
  );

  const bundleSubtotal = selectedBundleItems.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscountRate =
    selectedBundleItems.length >= 2 ? 0.1 : selectedBundleItems.length === 1 ? 0.05 : 0;
  const bundleDiscount = bundleSubtotal * bundleDiscountRate;

  const alsoBoughtSubtotal = selectedAlsoBoughtItems.reduce((sum, item) => sum + item.price, 0);
  const alsoBoughtDiscountRate = selectedAlsoBoughtItems.length >= 2 ? 0.08 : 0;
  const alsoBoughtDiscount = alsoBoughtSubtotal * alsoBoughtDiscountRate;

  const bumpPrice = bumpSelected ? orderBump.price : 0;

  const estimatedTotal =
    finalPrice +
    (bundleSubtotal - bundleDiscount) +
    (alsoBoughtSubtotal - alsoBoughtDiscount) +
    bumpPrice;

  const liveSignals = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const interest = 18 + ((hour * 3 + minute) % 11);
    const stock = 9 + ((hour + minute) % 6);
    return {
      interest,
      stock,
    };
  }, []);

  const toggleBundle = (id) => {
    setSelectedBundleIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAlsoBought = (id) => {
    setSelectedAlsoBoughtIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const buildMainItem = () => ({
    slug: "semaglutide",
    name: "Semaglutide",
    variant:
      purchaseType === "subscription"
        ? `${selectedSize} • Subscribe & Save 15% • ${frequencyLabel}`
        : `${selectedSize} • One-Time Purchase`,
    price: Number(finalPrice.toFixed(2)),
    image: current.image,
    quantity: 1,
    subscription: purchaseType === "subscription",
    subscriptionFrequency,
  });

  const buildDiscountedItems = (items, discountRate, label) => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const totalDiscount = subtotal * discountRate;
    const perItemDiscount = items.length > 0 ? totalDiscount / items.length : 0;

    return items.map((item) => ({
      slug: item.id,
      name: item.name,
      variant: `${label}${discountRate > 0 ? ` • ${Math.round(discountRate * 100)}% savings` : ""}`,
      price: Number((item.price - perItemDiscount).toFixed(2)),
      image: item.image,
      quantity: 1,
    }));
  };

  const buildBumpItem = () => ({
    slug: orderBump.id,
    name: orderBump.name,
    variant: "Order Bump",
    price: orderBump.price,
    image: current.image,
    quantity: 1,
  });

  const buildCartItems = () => {
    const items = [
      buildMainItem(),
      ...buildDiscountedItems(selectedBundleItems, bundleDiscountRate, "Bundle Add-On"),
      ...buildDiscountedItems(selectedAlsoBoughtItems, alsoBoughtDiscountRate, "People Also Bought"),
    ];

    if (bumpSelected) items.push(buildBumpItem());
    return items;
  };

  const handleAddToCart = () => {
    buildCartItems().forEach((item) => addToCart(item));
    setAddedMessage("Added selected items to cart");
    setAnimateAdd(true);

    setTimeout(() => setAddedMessage(""), 1800);
    setTimeout(() => setAnimateAdd(false), 900);
  };

  const handleBuyNow = async () => {
    const items = buildCartItems();

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
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
        {/* HEADER / TITLE / REVIEWS / TAGS / SIZE / PRICE / URGENCY */}
        <div className="product-copy premium-product-copy">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">Semaglutide Research</h1>
          <p className="product-subtitle">
            Advanced peptide for appetite, body composition, and metabolic research
          </p>

          <div className="review-row">
            <span className="review-stars">★★★★★</span>
            <span className="review-score">4.9</span>
            <span className="review-count">(214 reviews)</span>
          </div>

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

          <div className="scarcity-line">
            <span className="scarcity-dot"></span>
            Only {liveSignals.stock} left at this discounted price
          </div>

          <div className="social-proof-line">
            {liveSignals.interest} people viewed this in the last 24 hours
          </div>
        </div>

        {/* PRODUCT IMAGE — MUST COME HERE */}
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

        {/* PURCHASE BOX — MUST COME AFTER IMAGE */}
        <div className="purchase-panel">
          <div className="purchase-panel-header">
            <p className="purchase-panel-eyebrow">Choose your order type</p>
            <h3 className="purchase-panel-title">Fastest way to start</h3>
          </div>

          {/* PURCHASE OPTIONS */}
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
                <div className="subscription-highlight">
                  Most customers choose this option
                </div>
              </div>
              <span className="best-value-badge">Best Value</span>
            </label>
          </div>

          {/* DELIVERY FREQUENCY */}
          {purchaseType === "subscription" && (
            <div className="frequency-panel premium-frequency-panel">
              <div className="frequency-label">Delivery frequency</div>
              <div className="frequency-options">
                <button
                  type="button"
                  className={`frequency-pill ${subscriptionFrequency === "monthly" ? "active" : ""}`}
                  onClick={() => setSubscriptionFrequency("monthly")}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={`frequency-pill ${subscriptionFrequency === "biweekly" ? "active" : ""}`}
                  onClick={() => setSubscriptionFrequency("biweekly")}
                >
                  Every 2 Weeks
                </button>
              </div>
            </div>
          )}

          {/* FREQUENTLY BOUGHT TOGETHER */}
          <div className="bundle-panel">
            <div className="bundle-panel-header">
              <div className="bundle-title">Frequently bought together</div>
              <div className="bundle-subtitle">
                Add complementary products and save more
              </div>
            </div>

            <div className="bundle-grid">
              {frequentlyBoughtTogether.map((item) => (
                <label
                  key={item.id}
                  className={`bundle-card ${
                    selectedBundleIds.includes(item.id) ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBundleIds.includes(item.id)}
                    onChange={() => toggleBundle(item.id)}
                  />
                  <img src={item.image} alt={item.name} className="bundle-image" />
                  <div className="bundle-copy">
                    <div className="bundle-name">{item.name}</div>
                    <div className="bundle-price">${item.price.toFixed(2)}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="bundle-savings-line">
              {bundleDiscount > 0
                ? `Bundle savings applied: -$${bundleDiscount.toFixed(2)}`
                : "Add 2 items together to unlock 10% bundle savings"}
            </div>
          </div>

          {/* PEOPLE ALSO BOUGHT — AI STYLE CAROUSEL */}
          <div className="also-bought-panel">
            <div className="bundle-panel-header">
              <div className="bundle-title">People also bought</div>
              <div className="bundle-subtitle">
                Popular pairings based on similar orders
              </div>
            </div>

            <div className="also-bought-carousel">
              {peopleAlsoBought.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`also-bought-card ${
                    selectedAlsoBoughtIds.includes(item.id) ? "active" : ""
                  }`}
                  onClick={() => toggleAlsoBought(item.id)}
                >
                  <img src={item.image} alt={item.name} className="also-bought-image" />
                  <div className="also-bought-name">{item.name}</div>
                  <div className="also-bought-price">${item.price.toFixed(2)}</div>
                </button>
              ))}
            </div>

            <div className="bundle-savings-line">
              {alsoBoughtDiscount > 0
                ? `People also bought savings applied: -$${alsoBoughtDiscount.toFixed(2)}`
                : "Select 2 to unlock 8% additional savings"}
            </div>
          </div>

          {/* ORDER BUMP */}
          <div className={`order-bump ${bumpSelected ? "active" : ""}`}>
            <label className="order-bump-label">
              <input
                type="checkbox"
                checked={bumpSelected}
                onChange={() => setBumpSelected((prev) => !prev)}
              />
              <div className="order-bump-copy">
                <div className="order-bump-top">
                  <span className="order-bump-title">
                    Add Priority Handling + Premium Packaging
                  </span>
                  <span className="order-bump-price">
                    ${orderBump.price.toFixed(2)}
                  </span>
                </div>
                <div className="order-bump-sub">
                  Fast-track your order with elevated packaging and priority processing
                </div>
              </div>
            </label>
          </div>

          {/* ESTIMATED TOTAL */}
          <div className="estimated-total">
            Estimated total today: <span>${estimatedTotal.toFixed(2)}</span>
          </div>

          <div className="micro-urgency">
            Ships fast. Limited stock at current promo pricing.
          </div>

          {addedMessage && <div className="add-cart-toast">{addedMessage}</div>}

          {/* BUTTONS */}
          <div className="product-actions shop-actions premium-shop-actions">
            <button className="primary-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="secondary-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="conversion-copy">
            Secure checkout • Fast shipping • Cancel anytime
          </div>

          <div className="trust-strip">
            <span className="trust-pill">Secure Checkout</span>
            <span className="trust-pill">Fast Shipping</span>
            <span className="trust-pill">Premium Lab Grade</span>
            <span className="trust-pill">Cancel Anytime</span>
          </div>
        </div>

        {/* INFO DROPDOWN */}
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

        {/* RESEARCH BUTTONS */}
        <div className="product-actions research-actions premium-research-actions">
          <button className="primary-btn">Request Research Access</button>
          <button className="secondary-btn">View Lab Information</button>
          <button className="secondary-btn">View Certificate of Analysis</button>
        </div>
      </section>

      {/* STICKY BUY BAR */}
      <div className="sticky-buy-bar">
        <div className="sticky-buy-bar__left">
          <div className="sticky-buy-bar__title">Semaglutide {selectedSize}</div>
          <div className="sticky-buy-bar__price">${finalPrice.toFixed(2)}</div>
          <div className="sticky-buy-bar__sub">
            Save ${savings.toFixed(2)} • Only {liveSignals.stock} left
          </div>
        </div>
        <div className="sticky-buy-bar__right">
          <button className="primary-btn sticky-buy-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
                    }
