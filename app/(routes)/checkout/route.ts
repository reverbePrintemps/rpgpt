import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/stripe/stripe";

export async function GET(req: NextRequest) {
  const cri = req.nextUrl.searchParams.get("cri");
  const priceId = ["test", "development"].includes(process.env.NODE_ENV)
    ? "price_1NZa6uEhHgoFRl3LRH0oRVki"
    : process.env.NODE_ENV === "production"
    ? "price_1NdwlbEhHgoFRl3LMqp5vN8S"
    : "";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    client_reference_id: cri || undefined,
  });

  if (!session.url) {
    return NextResponse.error();
  }
  return NextResponse.redirect(session.url, { status: 303 });
}
