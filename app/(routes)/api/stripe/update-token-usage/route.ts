import { stripe } from "@/app/stripe/stripe";

export async function POST(req: Request) {
  const { subscriptionId, tokens }: { subscriptionId: string; tokens: number } =
    await req.json();

  stripe.subscriptionItems.createUsageRecord(subscriptionId, {
    quantity: tokens,
    timestamp: Math.floor(Date.now() / 1000),
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
