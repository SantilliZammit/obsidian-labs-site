export default function UpsellSuggestion({ subtotal }) {
  const FREE_SHIPPING_THRESHOLD = 500;

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  if (remaining <= 0) return null;

  const suggestion =
    remaining > 100
      ? { name: "BPC-157", price: 49.99 }
      : { name: "TB-500", price: 59.99 };

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
    </div>
  );
}
