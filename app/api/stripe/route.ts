import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

// Code from https://github.com/BastidaNicolas/nextauth-prisma-stripe/blob/master/src/app/api/webhooks/route.ts

const secretKey = ["development", "test"].includes(process.env.NODE_ENV)
  ? process.env.STRIPE_SECRET_KEY_TEST!
  : process.env.NODE_ENV === "production"
  ? process.env.STRIPE_SECRET_KEY_PRODUCTION!
  : "";

const stripe = new Stripe(secretKey, {
  apiVersion: "2022-11-15",
});

// !Important: When testing webhook through CLI, replace STRIPE_WEBHOOK_SECRET_TEST with STRIPE_WEBHOOK_SECRET_TEST_CLI
const webhookSecret = ["development", "test"].includes(process.env.NODE_ENV)
  ? process.env.STRIPE_WEBHOOK_SECRET_TEST!
  : process.env.NODE_ENV === "production"
  ? process.env.STRIPE_WEBHOOK_SECRET_PRODUCTION!
  : "";
export async function POST(req: NextRequest) {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 }
      );
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        // TODO
        break;
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
}
