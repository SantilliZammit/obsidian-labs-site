import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} (${item.variant})`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const shipping_options =
      subtotal >= 200
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 0,
                  currency: "usd",
                },
                display_name: "Free Shipping",
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
          ]
        : [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 995,
                  currency: "usd",
                },
                display_name: "Standard Shipping",
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
          ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
