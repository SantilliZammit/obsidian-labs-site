import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FREE_SHIPPING_THRESHOLD = 500;
const GROUND_SHIPPING_RATE_ID = "shr_1TFPF6ETnF6oDRfIu17dCP67"; // Standard
const EXPRESS_SHIPPING_RATE_ID = "shr_1TFPG9ETnF6oDRfINcpnya7j"; // Express
const FREE_SHIPPING_RATE_ID = "shr_1TFPGtETnF6oDRfIavpKdy1j"; // Free

const PRICE_IDS = {
  "20 mg": {
    monthly: "price_1TFOgWETnF6oDRfITV7WdmwJ",
    biweekly: "price_1TFOmWETnF6oDRfIMaDxpvwg",
  },
  "30 mg": {
    monthly: "price_1TFbutETnF6oDRfIIHJtiF5w",
    biweekly: "price_1TFbw8ETnF6oDRfIWbz3xlb0",
  },
  "50 mg": {
    monthly: "price_1TFc0SETnF6oDRfIlvVqDjnP",
    biweekly: "price_1TFc0qETnF6oDRfI3Q7CWqDV",
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const hasSubscription = items.some((item) => item.subscription);

    let line_items = [];

    if (hasSubscription) {
      line_items = items.map((item) => {
        if (item.subscription) {
          const size = item.variant.includes("30")
            ? "30 mg"
            : item.variant.includes("50")
            ? "50 mg"
            : "20 mg";

          const priceId =
            item.subscriptionFrequency === "biweekly"
              ? PRICE_IDS[size].biweekly
              : PRICE_IDS[size].monthly;

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
      });
    } else {
      line_items = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${item.name} (${item.variant})`,
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Number(item.quantity) || 1,
      }));
    }

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

    const sessionConfig = {
      mode: hasSubscription ? "subscription" : "payment",
      line_items,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    };

    if (!hasSubscription) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ["US"],
      };

      sessionConfig.shipping_options = shipping_options;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({
      error: err?.message || "Stripe checkout failed",
    });
  }
}
