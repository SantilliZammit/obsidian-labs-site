import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FREE_SHIPPING_THRESHOLD = 500;

// ✅ YOUR REAL SHIPPING RATE IDS (CORRECTLY MAPPED)
const GROUND_SHIPPING_RATE_ID = "shr_1TErNtIM6o7c6vXeIKQbTDVJ";
const EXPRESS_SHIPPING_RATE_ID = "shr_1TErOnIM6o7c6vXeaoJYoAYu";
const FREE_SHIPPING_RATE_ID = "shr_1TErPNIM6o7c6vXeafO8mge8";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    // 🛒 Build line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} (${item.variant})`,
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Number(item.quantity) || 1,
    }));

    // 💰 Calculate subtotal
    const subtotal = items.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity || 1);
    }, 0);

    // 🚚 Choose correct shipping options
    const shipping_options =
      subtotal >= FREE_SHIPPING_THRESHOLD
        ? [
            { shipping_rate: FREE_SHIPPING_RATE_ID },
            { shipping_rate: EXPRESS_SHIPPING_RATE_ID },
          ]
        : [
            { shipping_rate: GROUND_SHIPPING_RATE_ID },
            { shipping_rate: EXPRESS_SHIPPING_RATE_ID },
          ];

    // 💳 Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,

      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      shipping_options,

      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: err.message });
  }
}
