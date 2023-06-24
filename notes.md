# Notes

- Somehow the initial user prompt of "I AM GROOT" is a good one to perturb the model with and test out non-happy path scenarios. Namely it leads to the model returning plain text before the JSON, causing the parser to fail in its current state. This is a good test case to handle.
- Interestingly, I've noticed that, when passing the first "assistant" type init message to the model formatted as stringified JSON, it is much more likely to follow that example and return a JSON response.

# Learnings
