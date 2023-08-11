import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const secretKey = ["development", "test"].includes(process.env.NODE_ENV)
  ? process.env.STRIPE_SECRET_KEY_TEST!
  : process.env.NODE_ENV === "production"
  ? process.env.STRIPE_SECRET_KEY_PRODUCTION!
  : "";

const publishableKey = ["development", "test"].includes(process.env.NODE_ENV)
  ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST!
  : process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION!
  : "";

export const stripe = new Stripe(secretKey, {
  apiVersion: "2022-11-15",
});

export const stripePromise = loadStripe(publishableKey);
