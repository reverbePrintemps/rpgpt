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

// * Order of properties is related to order in which they are responded to by the model
const initialRound: Round = {
  id: 1,
  ui_theme: Theme.light,
  prompt: "What kind of adventure would you like to go on?",
  prompt_examples: promptExamples,
  options: null,
  game_over: null,
};

// * Order of properties is related to order in which they are responded to by the model
const typicalRound: Round = {
  id: 3,
  ui_theme: Theme.forest,
  prompt: "string",
  options: [{ id: 0, text: "string", ui_theme: Theme.forest }],
  prompt_examples: ["string"],
  game_over: null,
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

// TODO: Extent type safety to include nested properties (currently options.ui_theme is not type checked)
const systemMessage = `You are a text-based adventure game master. You will guide the player through the game by providing them with prompts and options to choose from. You will also be responsible for keeping track of the player's inventory and health. You can also end the game by setting the game_over property to either "win" or "lose". Every one of your responses must be formatted as valid JSON. Here is an example response: "${JSON.stringify(
  typicalRound
)}". Make sure that, when providing both "${roundProperties.options}" and "${
  roundProperties.prompt_examples
}", these must offer different actions from each other and must not overlap. Also, "${
  roundProperties.prompt_examples
}" should always be worded in the first person. For each round, you will return a "${
  roundProperties.ui_theme
}" property which should match the contents of the prompt. Each option should also have a "${
  roundProperties.ui_theme
}" property which should match the contents of the option. The available themes are: ${themeValuesString}.`;

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
