import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FREE_SHIPPING_THRESHOLD = 500;
const GROUND_SHIPPING_AMOUNT = 25;
const EXPRESS_SHIPPING_AMOUNT = 45;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

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

    const subtotal = items.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity || 1);
    }, 0);

    const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

    const shipping_options = qualifiesForFreeShipping
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free Ground Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 3,
                },
                maximum: {
                  unit: "business_day",
                  value: 5,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: EXPRESS_SHIPPING_AMOUNT * 100,
                currency: "usd",
              },
              display_name: "Express Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 2,
                },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: GROUND_SHIPPING_AMOUNT * 100,
                currency: "usd",
              },
              display_name: "Ground Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 3,
                },
                maximum: {
                  unit: "business_day",
                  value: 5,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: EXPRESS_SHIPPING_AMOUNT * 100,
                currency: "usd",
              },
              display_name: "Express Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 2,
                },
              },
            },
          },
        ];

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
    return res.status(500).json({ error: err.message });
  }
}
