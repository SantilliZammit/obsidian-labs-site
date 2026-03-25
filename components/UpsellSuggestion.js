export default function UpsellSuggestion({ subtotal, addToCart }) {
  const FREE_SHIPPING_THRESHOLD = 500;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  if (remaining <= 0) return null;

  let suggestion;

  if (remaining > 150) {
    suggestion = {
      name: "Retatrutide",
      price: 199.99,
      slug: "retatrutide",
      variant: "60 mg",
      image: "/retatrutide-60mg.png",
    };
  } else if (remaining > 75) {
    suggestion = {
      name: "TB-500",
      price: 59.99,
      slug: "tb-500",
      variant: "5 mg",
      image: "/tb-500-5mg.png",
    };
  } else {
    suggestion = {
      name: "BPC-157",
      price: 49.99,
      slug: "bpc-157",
      variant: "5 mg",
      image: "/bpc-157-5mg.png",
    };
  }

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        background: "#0a0a0a",
      }}
    >
      <p style={{ fontSize: "13px", color: "#00ffc3" }}>
        💡 Add {suggestion.name} (${suggestion.price}) to unlock FREE shipping
      </p>

      <button
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "10px",
          background: "#00ffc3",
          color: "#000",
          borderRadius: "6px",
          fontWeight: "bold",
          border: "none",
        }}
        onClick={() =>
          addToCart({
            slug: suggestion.slug,
            name: suggestion.name,
            variant: suggestion.variant,
            price: suggestion.price,
            image: suggestion.image,
            quantity: 1,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
