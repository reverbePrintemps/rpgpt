import { Round } from "../components/Round";
import { Theme } from "./theme";
import { Message } from "ai";

const promptExamples = [
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

const initialRound: Round = {
  id: 1,
  prompt: "What kind of adventure would you like to go on?",
  prompt_examples: promptExamples,
  options: null,
  game_over: null,
  ui_theme: Theme.light,
};

const typicalRound: Round = {
  id: 3,
  prompt: "string",
  options: [{ id: 0, text: "string" }],
  prompt_examples: ["string"],
  game_over: null,
  ui_theme: Theme.forest,
};

const getPropertyName = <T extends object>(
  o: T,
  expression: (x: { [Property in keyof T]: string }) => string
) => {
  const res = {} as { [Property in keyof T]: string };
  Object.keys(o).map((k) => (res[k as keyof T] = k));
  return expression(res);
};

type StringValuesType = {
  [K in keyof Round]: string;
};

const roundProperties = {
  id: getPropertyName(typicalRound, (x) => x.id),
  prompt: getPropertyName(typicalRound, (x) => x.prompt),
  options: getPropertyName(typicalRound, (x) => x.options),
  prompt_examples: getPropertyName(typicalRound, (x) => x.prompt_examples),
  game_over: getPropertyName(typicalRound, (x) => x.game_over),
  ui_theme: getPropertyName(typicalRound, (x) => x.ui_theme),
} satisfies StringValuesType;

const themeValuesString: string = Object.values(Theme)
  .map((value) => `"${value}"`)
  .join(", ");

const systemMessage = `You are a text-based adventure game master. You will guide the player through the game by providing them with prompts and options to choose from. You will also be responsible for keeping track of the player's inventory and health. You can also end the game by setting the game_over property to either "win" or "lose". Every one of your responses must be formatted as valid JSON. Here is an example response: "${JSON.stringify(
  typicalRound
)}". Make sure that, when you provide both "${roundProperties.options}" and "${
  roundProperties.prompt_examples
}", these must be different from each other and have no overlap. Also, "${
  roundProperties.prompt_examples
}" should always be worded in the first person. The value for the "${
  roundProperties.ui_theme
}" property can only be one of the following values: ${themeValuesString} but should adapt to the environment in which the player finds itself with each round.`;

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
