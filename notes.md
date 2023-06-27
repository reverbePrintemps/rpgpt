# Notes

- Somehow the initial user prompt of "I AM GROOT" is a good one to perturb the model with and test out non-happy path scenarios. Namely it leads to the model returning plain text before the JSON, causing the parser to fail in its current state. This is a good test case to handle.
- Interestingly, I've noticed that, when passing the first "assistant" type init message to the model formatted as stringified JSON, it is much more likely to follow that example and return a JSON response.
<!-- !Important -->
- The model can decide to return a null after returning values for a while. Example: model returns strings for the prompt_examples for a good amount of fragments, then will start returning null for no reason. I've adjusted the "typicalRound" to represent strings instead of a null because of this.
- After the model got stuck in some sort of neverending loop, just producing its own game by including "next_round" after next round, decided to add a value for "max_tokens" to prevent that from happening again.
<!-- *Interesting -->
- The order of the properties in the JSON object passed to the model seems to matter. If you want to receive something earlier than something else, place it higher in the example object.

# Learnings
