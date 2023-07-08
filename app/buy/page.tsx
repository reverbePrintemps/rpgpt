import { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const pricingTableId = ["development", "test"].includes(process.env.NODE_ENV)
  ? process.env.STRIPE_PRICING_TABLE_ID_TEST
  : process.env.NODE_ENV === "production"
  ? process.env.STRIPE_PRICING_TABLE_ID_PRODUCTION
  : "";

const publishableKey = ["development", "test"].includes(process.env.NODE_ENV)
  ? process.env.STRIPE_PUBLISHABLE_KEY_TEST
  : process.env.NODE_ENV === "production"
  ? process.env.STRIPE_PUBLISHABLE_KEY_PRODUCTION
  : "";

export default function Page() {
  return (
    <stripe-pricing-table
      pricing-table-id={pricingTableId}
      publishable-key={publishableKey}
    />
  );
}
