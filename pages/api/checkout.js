import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FREE_SHIPPING_THRESHOLD = 500;

const GROUND_SHIPPING_RATE_ID = process.env.STRIPE_GROUND_SHIPPING_RATE_ID;
const EXPRESS_SHIPPING_RATE_ID = process.env.STRIPE_EXPRESS_SHIPPING_RATE_ID;
const FREE_SHIPPING_RATE_ID = process.env.STRIPE_FREE_SHIPPING_RATE_ID;

/*
  REAL recurring Stripe Price IDs required for subscription billing.

  Create recurring monthly / biweekly prices in Stripe first, then store them in Vercel env vars.

  Example env var names:
  STRIPE_PRICE_SEMAGLUTIDE_20MG_MONTHLY
  STRIPE_PRICE_SEMAGLUTIDE_20MG_BIWEEKLY
  STRIPE_PRICE_SEMAGLUTIDE_30MG_MONTHLY
  STRIPE_PRICE_SEMAGLUTIDE_30MG_BIWEEKLY
  STRIPE_PRICE_SEMAGLUTIDE_50MG_MONTHLY
  STRIPE_PRICE_SEMAGLUTIDE_50MG_BIWEEKLY
*/

const SUBSCRIPTION_PRICE_MAP = {
  semaglutide: {
    "20 mg": {
      monthly: process.env.STRIPE_PRICE_SEMAGLUTIDE_20MG_MONTHLY,
      biweekly: process.env.STRIPE_PRICE_SEMAGLUTIDE_20MG_BIWEEKLY,
    },
    "30 mg": {
      monthly: process.env.STRIPE_PRICE_SEMAGLUTIDE_30MG_MONTHLY,
      biweekly: process.env.STRIPE_PRICE_SEMAGLUTIDE_30MG_BIWEEKLY,
    },
    "50 mg": {
      monthly: process.env.STRIPE_PRICE_SEMAGLUTIDE_50MG_MONTHLY,
      biweekly: process.env.STRIPE_PRICE_SEMAGLUTIDE_50MG_BIWEEKLY,
    },
  },
};

function extractBaseVariant(variant = "") {
  return String(variant).split(" • ")[0].trim();
}

function normalizeFrequency(subscriptionFrequency = "", variant = "") {
  const freq = String(subscriptionFrequency).toLowerCase();

  if (freq === "biweekly" || freq === "every 2 weeks") return "biweekly";
  if (freq === "monthly") return "monthly";

  const variantLower = String(variant).toLowerCase();
  if (variantLower.includes("every 2 weeks") || variantLower.includes("bi-weekly")) {
    return "biweekly";
  }

  return "monthly";
}

function getSubscriptionPriceId(item) {
  const slug = String(item.slug || "").toLowerCase();
  const baseVariant = extractBaseVariant(item.variant);
  const frequency = normalizeFrequency(item.subscriptionFrequency, item.variant);

  return SUBSCRIPTION_PRICE_MAP?.[slug]?.[baseVariant]?.[frequency] || null;
}

function buildLineItem(item) {
  if (item.subscription) {
    const priceId = getSubscriptionPriceId(item);

    if (!priceId) {
      throw new Error(
        `Missing recurring Stripe Price ID for ${item.name} (${extractBaseVariant(
          item.variant
        )}, ${normalizeFrequency(item.subscriptionFrequency, item.variant)})`
      );
    }

    return {
      price: priceId,
      quantity: Number(item.quantity) || 1,
    };
  }

  return {
    price_data: {
      currency: "usd",
      product_data: {
        name: `${item.name} (${item.variant})`,
      },
      unit_amount: Math.round(Number(item.price) * 100),
    },
    quantity: Number(item.quantity) || 1,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const hasSubscription = items.some((item) => Boolean(item.subscription));

    const line_items = items.map(buildLineItem);

    const subtotal = items.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity || 1);
    }, 0);

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

    const session = await stripe.checkout.sessions.create({
      mode: hasSubscription ? "subscription" : "payment",
      line_items,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options,
      customer_creation: hasSubscription ? "always" : "if_required",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({
      error: err?.message || "Stripe checkout failed",
    });
  }
}
