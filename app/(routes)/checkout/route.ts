import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/stripe/stripe";

export async function GET(req: NextRequest, res: NextResponse) {
  const cri = req.nextUrl.searchParams.get("cri");
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1NZa6uEhHgoFRl3LRH0oRVki",
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
