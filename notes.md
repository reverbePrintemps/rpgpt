# Notes

- Somehow the initial user prompt of "I AM GROOT" is a good one to perturb the model with and test out non-happy path scenarios. Namely it leads to the model returning plain text before the JSON, causing the parser to fail in its current state. This is a good test case to handle.
- Interestingly, I've noticed that, when passing the first "assistant" type init message to the model formatted as stringified JSON, it is much more likely to follow that example and return a JSON response.
<!-- !Important -->
- The model can decide to return a null after returning values for a while. Example: model returns strings for the prompt_examples for a good amount of fragments, then will start returning null for no reason. I've adjusted the "typicalRound" to represent strings instead of a null because of this.
- After the model got stuck in some sort of neverending loop, just producing its own game by including "next_round" after next round, decided to add a value for "max_tokens" to prevent that from happening again.
<!-- *Interesting -->
- The order of the properties in the JSON object passed to the model seems to matter. If you want to receive something earlier than something else, place it higher in the example object.
- While attempting to implement a paywall, I went on a long, confusing tangent which led me to create multiple new repos in an attempt to not use Firebase (mainly to learn something new). However, unsurprisingly, trying to pick up ~4 new technologies/libraries (Supabase, Prisma, tRPC, NextAuth) in one go on top of the Stripe SDK (and Next which is still a bit new for me) quickly became overwhelming. That being said, during this confusion-infused research phase I became aware of the [T3 stack](https://create.t3.gg/) (Typescript, tRPC, Tailwind) and hope that one day I'll be able to pick it up as I would a standard CRA or Next.js project. But for now, that much overhead and complexity is not worth it for a simple paywall. I'll be sticking with Firebase for now.

# Gotchas

- Use dot notated string to update a firebase document's data's nested field. F.e updating `{stripe: {id: "123"}}` will override the existing `stripe` object. Instead, use `"stripe.id": "123"` to update the nested field.

# Learnings

- Stripe does not allow pricing tables to show products with a sub-cent pricing. And it does not allow reporting usage with a non-integer number. Both of these things means using pricing tables for metered usage is not possible.
- It also seems that Stripe does not allow the creation of a payment Link for our pay-as-you-go product. I don't know whether it's because it's a subscription, if it's because it's a metered usage product, or if it's because it has a sub-cent pricing.
