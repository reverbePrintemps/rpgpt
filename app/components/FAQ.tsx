import Link from "next/link";
import { Card, Collapse, Divider } from "react-daisyui";

export const FAQ = () => {
  return (
    <div className="mt-16 w-full">
      <h2>Frequently Asked Questions</h2>
      <Card className="shadow-2xl mt-8 bg-base-content text-base-100">
        <Card.Body>
          <Collapse className="collapse-arrow">
            <Collapse.Title className="text-xl font-medium">
              What is rpgpt?
            </Collapse.Title>
            <Collapse.Content className="text-base-200">
              <strong>rpgpt</strong> is an AI-driven text adventure game. It's a
              bit like a "choose your own adventure" book, but with a lot more
              freedom. You can be anyone, in any universe, doing anything. The
              only limit is your imagination.
            </Collapse.Content>
          </Collapse>
          <Divider className="m-0 before:bg-base-300 after:bg-base-300" />
          <Collapse className="collapse-arrow">
            <Collapse.Title className="text-xl font-medium">
              What are tokens and how are they calculated?
            </Collapse.Title>
            <Collapse.Content>
              <p>
                Tokens are{" "}
                <i>"pieces of words used for natural language processing"</i>.
                As a rule of thumb,{" "}
                <Link
                  href="https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them"
                  target="_blank"
                  className="link"
                >
                  4 characters typically correspond to one token
                </Link>
                . For example: for the sentence "I drink a potion", the 16
                correspond to 4 tokens.
              </p>
              <p className="mt-4">
                However, when using <strong>rpgpt</strong>, bear in mind that we
                have to wrap your input as well as the model's response in some
                additional data. This is why the number of tokens you use is not
                simply the number of characters you type.
              </p>
              <p className="mt-4">
                We've done our best to make this as transparent as possible by
                showing you the number of tokens you've used in the{" "}
                <Link
                  href="/auth/account#usage"
                  target="_blank"
                  className="link"
                >
                  usage section of your account
                </Link>
                .
              </p>
            </Collapse.Content>
          </Collapse>
          <Divider className="m-0 before:bg-base-300 after:bg-base-300" />
          <Collapse className="collapse-arrow">
            <Collapse.Title className="text-xl font-medium">
              What language model does rpgpt use?
            </Collapse.Title>
            <Collapse.Content>
              Currently, <strong>rpgpt</strong> is based on{" "}
              <Link
                href="https://platform.openai.com/docs/models/gpt-3-5"
                target="_blank"
                className="link"
              >
                OpenAI's "gpt-3.5-turbo" model
              </Link>{" "}
              as it is very fast, creative and reasonably priced.
            </Collapse.Content>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
};
