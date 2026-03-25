import { useMemo } from "react";

export default function ShippingPreview({ subtotal }) {
  const FREE_SHIPPING_THRESHOLD = 500;
  const SHIPPING_COST = 25;

  const { progress, remaining, unlocked } = useMemo(() => {
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
    const unlocked = subtotal >= FREE_SHIPPING_THRESHOLD;

    return { progress, remaining, unlocked };
  }, [subtotal]);

  return (
    <div style={{ marginTop: "16px" }}>
      {/* MESSAGE */}
      <p
        style={{
          fontSize: "14px",
          color: unlocked ? "#00ffc3" : "#aaa",
          marginBottom: "6px",
        }}
      >
        {unlocked
          ? "🚚 Free shipping unlocked"
          : `Add $${remaining.toFixed(2)} more to unlock FREE shipping`}
      </p>

      {/* PROGRESS BAR */}
      <div
        style={{
          width: "100%",
          height: "6px",
          background: "#1a1a1a",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00ffc3, #00aaff)",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* SHIPPING PRICE PREVIEW */}
      <p
        style={{
          marginTop: "8px",
          fontSize: "13px",
          color: "#888",
        }}
      >
        Shipping:{" "}
        <span style={{ color: unlocked ? "#00ffc3" : "#fff" }}>
          {unlocked ? "FREE" : `$${SHIPPING_COST.toFixed(2)}`}
        </span>
      </p>

      {/* 🔥 AUTO UPSELL */}
      {!unlocked && (
        <p
          style={{
            marginTop: "6px",
            fontSize: "13px",
            color: "#00ffc3",
          }}
        >
          💡 Add one more item to save on shipping
        </p>
      )}
    </div>
  );
}
