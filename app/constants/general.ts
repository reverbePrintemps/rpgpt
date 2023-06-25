import { Round } from "../components/Round";
import { Message } from "ai";

const placeholderPrompts = [
  "I'm a hacker in a corrupt cyberpunk city. The Marauders are blackmailing me into hacking the Galactic Bank.",
  "I'm lazy, any adventure will do :)",
  "As an apprentice sorcerer, I must retrieve the artifact and restore balance to the kingdom!",
  "I'm a drunk pirate captain seeking the best rum in the Caribbean.",
  "What is love?",
  "It's August 11, 2398, the Dyson Sphere around the Sun is complete. Humanity is now a Type II civilization.",
  "World Sandwich Making Championship.",
  "Everybody was Kung Fu fighting when suddenly...",
  "Like Lord of the Rings, but with cats.",
  "What if Back to the Future was a horror movie?",
  "Surprise me!",
  "I am the high-priestess of Albondiga, the legendary capital city of the Meatballfolk and I must retrieve my spaghetti scepter.",
  "I have no inspiration, throw me a bone here.",
];

const roundExample: Round = {
  id: 0,
  prompt: "You find yourself in a dark room. What do you do?",
  options: [
    {
      id: 0,
      text: "Turn on the lights",
    },
    {
      id: 1,
      text: "Look around",
    },
    {
      id: 2,
      text: "Go back to sleep",
    },
  ],
  freetext_prompt_placeholders: placeholderPrompts,
};

export const initialMessages = [
  {
    id: "0",
    role: "system",
    content: `You are a text-based adventure game master. All of your responses should be strictly formatted like so: ${JSON.stringify(
      roundExample
    )}.`,
  },
  {
    id: "1",
    role: "assistant",
    // !Important: The prompt must be a stringified JSON object
    // !Important: Do not try to format (pretty print) the prompt, it will fail to parse
    // TODO Add type safety to this somehow
    // Or make it safe for it to not be a stringified JSON object
    content: `{"id": 0, "prompt": "What kind of adventure would you like to go on?", "freetext_prompt_placeholders": ${JSON.stringify(
      placeholderPrompts
    )}}`,
  },
] as Message[];
