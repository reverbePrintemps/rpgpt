# TODO

## Ongoing

- [ ] Revamp README with documentation

## Backlog

### Features

- [ ] More comprehensive firebase error messages. Currently we're just passing the error message, such as: "Firebase: Error (auth/user-not-found)."
- [ ] Add delimiter around property names in system message to see if it helps the model understand instructions better
- [ ] Improve model persona in system message (Rocco was told he couldn't rob a bank. This shows model isn't fully aware that they are a game master)
- [ ] Sometimes, the openai API responds with simple text before proceeding with the requested JSON. Handle this case.

### Bugs

- [ ] Firefox mobile seems to zoom in on input focus (https://stackoverflow.com/questions/69495070/prevent-zooming-in-after-input-field-focus-in-firefox-on-mobile)
- [ ] Disable choice buttons when loading.
- [ ] When loading, the previous (or current) round's input shows a spinner after submission.
- [ ] Model doesn't seem to reliably understand that options and prompt examples need to be different.

### Tech debt

- [ ] Refactor the logic to update token usage. Currently we get last 2 messages on a response. Better would be to update usage on a per-message basis.
- [ ] Refactor/improve Round component by extracting components, state and logic where relevant.

## Done

- [x] Option buttons don't wrap, causing longer options to extend the width of the screen. 🤦
- [x] Also handle when to show the text input following a prompt better.
- [x] Autogrowing textarea (cf. Spork)
- [x] Rotating placeholder text (cf. Spork)
- [x] Show prompt options (ie buttons) as they are received
- [x] Throw JSON parsing errors to be able to improve completeJSON function
- [x] Append latest round to the rest of the rounds
