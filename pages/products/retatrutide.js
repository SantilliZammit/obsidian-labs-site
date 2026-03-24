import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

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
  const { addToCart } = useCart();

  const current = options[selectedSize];

  const handleAddToCart = () => {
    addToCart({
      slug: "retatrutide",
      name: "Retatrutide",
      variant: selectedSize,
      price: current.price,
      image: current.image,
    });
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-page">
        <div className="product-copy">
          <p className="eyebrow">OBSIDIAN LABS</p>
          <h1 className="product-title">Retatrutide Research</h1>

          <div className="product-select-row">
            <label>Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="30 mg">30 mg</option>
              <option value="60 mg">60 mg</option>
            </select>
          </div>

          <div className="price-display">
            ${current.price.toFixed(2)}
          </div>

          <button className="primary-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <div className="product-image-wrap">
          <img src={current.image} alt="Retatrutide" />
        </div>
      </section>
    </div>
  );
}
