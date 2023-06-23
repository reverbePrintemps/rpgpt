import { forceParse } from "../utils/general";

describe("forceParse", () => {
  it("should return valid JSON", () => {
    const badJSON = `{"prompt": "Hello world",
        "options": [{
          "id": 0,
          "text": "Go left"
        }, {
          "id": 1,
          "text": "Go right`;
    const goodJSON = `{"prompt": "Hello world",
        "options": [{
          "id": 0,
          "text": "Go left"
        }, {
          "id": 1,
          "text": "Go right"
        }]}`;
    expect(forceParse(badJSON)).toEqual(JSON.parse(goodJSON));
  });
});
