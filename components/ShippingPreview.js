export default function ShippingPreview({ subtotal = 0 }) {
  const freeShippingThreshold = 200;
  const standardShipping = 9.95;

  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  const amountRemaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const estimatedShipping = qualifiesForFreeShipping ? 0 : standardShipping;
  const estimatedTotal = subtotal + estimatedShipping;

  return (
    <div className="shipping-preview-card">
      <div className="shipping-preview-top">
        <div>
          <p className="shipping-preview-eyebrow">SHIPPING PREVIEW</p>
          <h3 className="shipping-preview-title">
            {qualifiesForFreeShipping
              ? "You unlocked free shipping"
              : `$${amountRemaining.toFixed(2)} away from free shipping`}
          </h3>
        </div>

        <div className="shipping-preview-summary">
          <div className="shipping-preview-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="shipping-preview-row">
            <span>Estimated Shipping</span>
            <strong>
              {qualifiesForFreeShipping ? "FREE" : `$${standardShipping.toFixed(2)}`}
            </strong>
          </div>
          <div className="shipping-preview-row total">
            <span>Estimated Total</span>
            <strong>${estimatedTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <div className="shipping-progress-wrap">
        <div className="shipping-progress-bar">
          <div
            className="shipping-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <p className="shipping-preview-note">
        {qualifiesForFreeShipping
          ? "Standard shipping is now free at checkout."
          : `Orders over $${freeShippingThreshold.toFixed(2)} qualify for free shipping.`}
      </p>
    </div>
  );
}
