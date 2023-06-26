import { Round } from "../components/Round";
import { Message } from "ai";

const placeholderPrompts = [
  "Like Lord of the Rings, but with cats.",
  "I'm a wizard in a post-apocalyptic world.",
  "What if Back to the Future was a horror movie?",
  "Everybody was Kung Fu fighting when suddenly...",
  "I'm a detective in a cyberpunk city.",
  "What if the world was made of candy?",
  "I'm a vampire in a world where vampires are illegal.",
  "Me and my friends are trying to save the world from a meteor.",
  "I must collect all the Pokemon but I'm allergic to them.",
  "My cat is a secret agent.",
  "I have the power to turn into a rock.",
  "My power is to eat anything and gain its power.",
];

const genericRoundExample: Round = {
  id: 0,
  prompt: "string",
  options: [{ id: 0, text: "string" }],
  freetext_prompt_placeholders: placeholderPrompts,
  game_over: undefined,
};

const finalRoundExample: Round = {
  id: 0,
  prompt: "string",
  options: undefined,
  freetext_prompt_placeholders: null,
  game_over: "win",
};

const initialRound: Round = {
  id: 0,
  prompt: "What kind of adventure would you like to go on?",
  freetext_prompt_placeholders: placeholderPrompts,
};

const systemMessage = `You are a text-based adventure game master. All of your responses should be strictly and exclusively formatted like so: ${JSON.stringify(
  genericRoundExample
)}. with no other text or otherwise comments. A game should last no longer than 3 rounds. A final round should always include a "game_over" property with the value of either "win" or "lose". Here's an example of a last round: ${JSON.stringify(
  finalRoundExample
)}`;

export const initialMessages = [
  {
    id: "0",
    role: "system",
    content: JSON.stringify(systemMessage),
  },
  {
    id: "1",
    role: "assistant",
    content: JSON.stringify(initialRound),
  },
] as Message[];
