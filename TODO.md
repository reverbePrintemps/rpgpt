# TODO

## Ongoing

## Backlog

### Features

- [ ] Sometimes, the openai API responds with simple text before proceeding with the requested JSON. Handle this case.

### Bugs

- [ ] When loading, the previous (or current) round's input shows a spinner after submission.
- [ ] Model doesn't seem to reliably understand that options and prompt examples need to be different.

### Tech debt

- [ ] Refactor/improve Round component by extracting components, state and logic where relevant.

## Done

- [x] Also handle when to show the text input following a prompt better.
- [x] Autogrowing textarea (cf. Spork)
- [x] Rotating placeholder text (cf. Spork)
- [x] Show prompt options (ie buttons) as they are received
- [x] Throw JSON parsing errors to be able to improve completeJSON function
- [x] Append latest round to the rest of the rounds
