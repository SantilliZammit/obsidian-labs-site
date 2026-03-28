import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function Semaglutide() {

  const options = {
    "20 mg": { price: 199.99, image: "/semaglutide-20mg.png" },
    "30 mg": { price: 249.99, image: "/semaglutide-30mg.png" },
    "50 mg": { price: 349.99, image: "/semaglutide-50mg.png" },
  };

  const frequentlyBoughtTogether = [
    { id: "bpc-157", name: "BPC-157 10 mg", price: 49.99, image: "/bpc-157-10mg.png" },
    { id: "tb-500", name: "TB-500 10 mg", price: 59.99, image: "/tb-500-10mg.png" },
  ];

  const peopleAlsoBought = [
    { id: "tirzepatide", name: "Tirzepatide 10 mg", price: 129.99, image: "/tirzepatide-10mg.png" },
    { id: "retatrutide", name: "Retatrutide 30 mg", price: 129.99, image: "/retatrutide-30mg.png" },
    { id: "cjc-1295", name: "CJC-1295", price: 89.99, image: "/cjc-1295.png" },
  ];

  const orderBump = {
    id: "lab-priority",
    name: "Priority Handling + Premium Packaging",
    price: 19.99,
  };

  const [selectedSize, setSelectedSize] = useState("20 mg");
  const [purchaseType, setPurchaseType] = useState("subscription");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("monthly");
  const [selectedBundleIds, setSelectedBundleIds] = useState(["bpc-157"]);
  const [selectedAlsoBoughtIds, setSelectedAlsoBoughtIds] = useState([]);
  const [bumpSelected, setBumpSelected] = useState(true);

  const { addToCart } = useCart();

  const current = options[selectedSize];

  const subscriptionPrice = useMemo(() => current.price * 0.85, [current.price]);
  const finalPrice = purchaseType === "subscription" ? subscriptionPrice : current.price;

  const savings = current.price - subscriptionPrice;

  const toggleBundle = (id) => {
    setSelectedBundleIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAlsoBought = (id) => {
    setSelectedAlsoBoughtIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    addToCart({
      name: "Semaglutide",
      price: finalPrice,
      image: current.image,
    });
  };

  return (
    <div className="semaglutide-page"> {/* 🔥 THIS FIXES EVERYTHING */}

      <div className="container">

        <Link href="/" className="back-link">
          ← Back to Products
        </Link>

        <section className="product-page premium-product-page">

          <div className="product-copy premium-product-copy">
            <h1 className="product-title">Semaglutide Research</h1>
            <p className="product-subtitle">
              Advanced peptide for appetite and metabolic research
            </p>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="20 mg">20 mg</option>
              <option value="30 mg">30 mg</option>
              <option value="50 mg">50 mg</option>
            </select>

            <div className="price-display">
              ${finalPrice.toFixed(2)}
            </div>

          </div>

          <div className="product-image-wrap">
            <img src={current.image} alt="product" />
          </div>

          <div className="purchase-panel">

            <button onClick={handleAddToCart} className="primary-btn">
              Add to Cart
            </button>

          </div>

        </section>

      </div>

    </div>  // 🔥 THIS CLOSES THE WRAPPER
  );
}
