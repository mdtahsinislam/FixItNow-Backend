import Stripe from "stripe";
import { env } from "./env";

export const stripe = new Stripe(env.stripe.secretKey, {
  apiVersion: "2024-11-20.acacia", // use latest available
});