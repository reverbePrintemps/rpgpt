import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/app/firebase/config";
import { stripe } from "@/app/stripe/stripe";
import Stripe from "stripe";

// Stripe event types: https://stripe.com/docs/api/events/types

// Code from https://github.com/BastidaNicolas/nextauth-prisma-stripe/blob/master/src/app/api/webhooks/route.ts

// * Note - "You can’t receive webhook events with properties auto-expanded. Objects sent in events are always in their minimal form. To access nested values in expandable properties, you must retrieve the object in a separate call within your webhook handler." - (https://stripe.com/docs/expand#with-webhooks)

// !Important: When testing webhook through CLI, replace STRIPE_WEBHOOK_SECRET_TEST with STRIPE_WEBHOOK_SECRET_TEST_CLI
const webhookSecret = ["development", "test"].includes(process.env.NODE_ENV)
  ? process.env.STRIPE_WEBHOOK_SECRET_TEST_CLI!
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

    ["development", "test"].includes(process.env.NODE_ENV) &&
      console.log("✅ Success:", event.id);

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data
          .object as Stripe.Checkout.Session;

        if (checkoutSessionCompleted.client_reference_id) {
          updateDoc(
            doc(
              firestore,
              "users",
              checkoutSessionCompleted.client_reference_id
            ),
            {
              isPaying: true,
              "stripe.customerId": checkoutSessionCompleted.customer,
            }
          );

          const subscription = await stripe.subscriptions.retrieve(
            // Safe to typecast because webhooks return strings, not objects
            checkoutSessionCompleted.subscription as string
          );
          const subscriptionItemID = subscription.items.data[0].id;

          updateDoc(
            doc(
              firestore,
              "users",
              checkoutSessionCompleted.client_reference_id
            ),
            {
              isPaying: true,
              "stripe.subscriptionItemId": subscriptionItemID,
            }
          );
        }

        break;
      default:
        console.warn(`🤷 Unhandled event type: ${event.type}`);
        break;
    }

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
