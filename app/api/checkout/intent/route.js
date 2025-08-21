import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }
    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });
    const body = await request.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const amount = items.reduce((sum, i) => sum + (i.priceCents || 0) * (i.quantity || 1), 0);
    const currency = body?.currency || "INR";

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      payment_method_types: ["card", "upi"],
      metadata: { source: "luxe-store" },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (e) {
    return NextResponse.json({ error: "Unable to create payment intent" }, { status: 400 });
  }
}


