# rpgpt

An AI-powered, text-based adventure role-playing game.

Currently deployed at: https://rpgpt-ai.vercel.app/

## Running locally

1. Clone the repository
2. [Get an openAI API key](https://platform.openai.com/account/api-keys) and ❗️ **make sure to attach your payments details to your OpenAI account, otherwise your API key won't work!** ❗️ (you can set a usage limit to avoid any unexpected charges)
3. Create a `.env.local` file at root of the project
4. Add the following to your `.env.local` file:
```
OPENAI_KEY=<your openAI key>
```
5. `npm install` to install dependencies
6. `npm run dev` to run the app in development mode
7. Visit [http://localhost:3000](http://localhost:3000) to view the app

## Stack

- [Next.js](https://nextjs.org/) v.13+ (`App router` paradigm)
- [Typescript](https://www.typescriptlang.org/) Because type safety is l̶o̶v̶e̶ life
- [DaisyUI](https://daisyui.com/) Components and theming library based on [TailwindCSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/docs/api-reference) Used to create chat completions
- [Vercel AI SDK](https://github.com/vercel-labs/ai) Vercel's SDK to interact with some generative AI APIs (including openAI)
- [OpenAI Edge](https://github.com/dan-kwiat/openai-edge) Unofficial (but officially recommended) package which uses fetch api (vs axios) to make requests to the openAI API and therefore can be deployed on an [edge environment](https://vercel.com/docs/concepts/edge-network/overview).
- [husky](https://typicode.github.io/husky/) Used to run tests upon a commit
- [Firebase](https://firebase.google.com/) For authentication and database
- [Stripe](https://stripe.com/) For payments

## Key Concepts

### Next.js file structure

If you're unfamiliar with Next.js or the "new" Next v.13+ `App router` paradigm, I suggest [reading up on it](https://nextjs.org/docs/getting-started/project-structure).

In a nutshell, the following names are reserved for special behaviors:

- `layout` - is a higher level component which will be used as a layout for all the pages in the directory
- `page` - is the page rendered at the name of the directory
- `loading` - will be returned by the server on page load until the page is ready to be rendered
- `error` - will be returned by the server if there is an error when fetching the page
- `route` - defines an API route

In essence, all you need to create a new route for your app all you need is a directory containing a `page.tsx` file. Ex: `/contact/page.tsx` will create a `/contact` route and render a page at that route.

You can [read more about this here](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions)

### OpenAI API

#### **Messages**

If you're unfamiliar with the openAI API, especially the chat completion endpoint, I suggest [you give it a read](https://platform.openai.com/docs/api-reference/chat/create). In a nutshell, the chat completion works as an array of messages of 3 types:

1. System - intended for instructing the model to adopt a persona, provide it with context, respond in a certain way, etc.
2. User - This is the user "speaking" to the model. The model will respond to this message.
3. Assistant - This is the model's response.

### Project

#### **API route**

- Under `/app/api/chat/route.ts` you'll find the api for the chat completion.
- It is called automatically when /game page is loaded.
- This is because the `/game/page.tsx` file loaded upon visiting the `/game` page uses [Vercel's `useChat` hook](https://github.com/vercel-labs/ai) which is configured to call the `/api/chat` route by default. (this can be changed by modifying the value for `api` when calling this route)

#### **Prompting**

The `prompt.ts` file contains all the content relating to the initial setup of the model. This includes:

- `systemMessage`: the initial message used to [give a persona to the model](https://platform.openai.com/docs/guides/gpt-best-practices/tactic-ask-the-model-to-adopt-a-persona). The system message is crucial to the model's ability to return relevant responses and consistent data (to the best of its ability), so be mindful when modifying it.
- `promptExamples`: some initial prompt examples to get the player inspired before they start playing
- helpers for generating the initial prompt and for some type safety

#### **Round**

A "round" refers to an interaction between the player and the model and is captured in the [`Round` type](./app/components/Round.tsx). An example round (`typicalRound`) is provided to the model in the `systemMessage` (see [prompting](#prompting)) as context for what is expected from it.

## Notes, learnings and findings

To capture or read up on any project-related notes, learnings or findings, please see the [notes.md](./notes.md) file.
