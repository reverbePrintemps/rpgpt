import { forceParse } from "../utils/parsing";

describe("forceParse", () => {
  describe("incomplete JSON string", () => {
    it("should return valid JSON", () => {
      const badJSON = `{"prompt": "Hello world","options": [{"id": 0,"text": "Go left"}, {"id": 1,"text": "Go right`;
      const goodJSON = `{"prompt": "Hello world","options": [{"id": 0,"text": "Go left"}, {"id": 1,"text": "Go right"}]}`;
      expect(forceParse(badJSON)).toEqual(JSON.parse(goodJSON));
    });
  });
  describe("JSON string includes escaped newlines and double quotes", () => {
    it("should return valid JSON", () => {
      // ! Use String.raw to treat template literal as raw string, the way we get it from the model
      const JSONwithEscapedCharacters = String.raw`{"id":4,"ui_theme":"forest","prompt":"You join a group of hobbits in a lively game of riddles. The first riddle is proposed:\n\n\"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?\"\n\nWhat is your answer?","options":null,"prompt_examples":["I think for a moment and answer: \"An echo.\""],"game_over":null}`;
      const JSONwithEscapedCharactersParsed = JSON.parse(
        `{"id":4,"ui_theme":"forest","prompt":"You join a group of hobbits in a lively game of riddles. The first riddle is proposed:'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?'What is your answer?","options":null,"prompt_examples":["I think for a moment and answer: 'An echo.'"],"game_over":null}`
      );
      expect(forceParse(JSONwithEscapedCharacters)).toEqual(
        JSONwithEscapedCharactersParsed
      );
    });
  });
});

/*
{"id":4,"ui_theme":"forest","prompt":"You join a group of hobbits in a lively game of riddles. The first riddle is proposed:\n\n\"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?\"\n\nWhat is your answer?","options":null,"prompt_examples":["I think for a moment and answer: \"An echo.\""],"game_over":null}
*/
