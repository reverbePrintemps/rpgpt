import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(config);

// !IMPORTANT
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  if (["development", "test"].includes(process.env.NODE_ENV)) {
    console.log("messages", messages);
  }

  try {
    const response = await openai.createChatCompletion({
      // ! If/when changing the model, update the FAQ
      model: "gpt-3.5-turbo",
      // max_tokens = "The token count of your prompt plus max_tokens cannot exceed the model's context length."
      // For more info: see https://platform.openai.com/docs/introduction/key-concepts
      // If rounds feel (or are being cut) too short, increase this value.
      max_tokens: 300,
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
