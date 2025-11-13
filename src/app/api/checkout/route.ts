import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "uah", // гривны
            product_data: {
              name: "Website development",
            },
            unit_amount: 50000, // 500.00 UAH (в копейках)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://your-site.com/success",
      cancel_url: "https://your-site.com/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
