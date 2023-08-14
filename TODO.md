# TODO

## Ongoing

- [x] [Implement metered usage billing](https://stripe.com/docs/billing/subscriptions/usage-based)
  - [x] Update user (db) with Stripe customer id and subscription item id
  - [x] Report usage to Stripe
  - [x] Redirect to rpgpt after successful payment
  - [ ] Offer cancelation
  - [x] Before merging, review env keys

## Backlog

### Features

- [ ] Confirmation and redirect after password reset
- [ ] Share button (summary? link to game?)
- [ ] Create action acknowledgement system message (fe. "You have successfully signed up!")
- [ ] Persist form input data across auth pages. (ie. if you're on the sign up page and you switch to the sign in page, the email you entered should still be there)
- [ ] Bottom tabs for navigation on mobile
- [ ] What if no local storage? Use cookies? Or force login?
- [ ] Improve content/styling of home page
- [ ] Improve styling of /account page
- [ ] Improve app metadata (favicon, manifest, social sharing cards, etc.)
- [ ] Add tests for usage calculation (incl. local storage)
- [ ] Handle case when max_tokens are exceeded
- [ ] More comprehensive firebase error messages. Currently we're just passing the error message, such as: "Firebase: Error (auth/user-not-found)."
- [ ] Add delimiter around property names in system message to see if it helps the model understand instructions better
- [ ] Improve model persona in system message (Rocco was told he couldn't rob a bank. This shows model isn't fully aware that they are a game master)
- [ ] Sometimes, the openai API responds with simple text before proceeding with the requested JSON. Handle this case.

### Bugs

- [ ] Fix theme switching
- [ ] Theme picker should always show currently selected theme. (although this sounds like an easy bug it probably isn't as it involves rethinking how we set/get the theme)
  - Currently we only set the theme locally using localStorage. We might want to use cookies instead. Also, theming might even be irrelevant since the game programmatically changes the theme.
- [ ] Firefox mobile seems to zoom in on input focus (https://stackoverflow.com/questions/69495070/prevent-zooming-in-after-input-field-focus-in-firefox-on-mobile)
- [ ] Disable choice buttons when loading.
- [ ] When loading, the previous (or current) round's input shows a spinner after submission.
- [ ] Model doesn't seem to reliably understand that options and prompt examples need to be different.

### Tech debt

- [ ] Probably don't need duplicate env keys for separate environments. Use one key only locally and import them by env into Vercel.
- [ ] Remove all usage of "prose" classNames and uninstall @tailwindcss/typography (doesn't actually make things easy when themes are involved)
- [ ] Unify local/db token usage logic
- [ ] Fix issue with window (or localStorage) not being available even though components are marked as "use client"
- [ ] Create a constant for all routes in the app and use them instead of hardcoding strings
- [ ] Improve accessibility of top level Menu (currently no focus nor focus state) and Theme picker
- [ ] Fetch account info server side when loading /account
- [ ] Refactor the logic to update token usage. Currently we get last 2 messages on a response. Better would be to update usage on a per-message basis.
- [ ] Refactor/improve Round component by extracting components, state and logic where relevant.

## Done

- [x] Theme picker
- [x] Block game when free usage is exceeded
- [x] Make sure token calculation is correct
- [x] Finish FAQ
- [x] Fix local storage/token usage
- [x] Fix game/prompting
- [x] Revamp README with documentation
- [x] Option buttons don't wrap, causing longer options to extend the width of the screen. 🤦
- [x] Also handle when to show the text input following a prompt better.
- [x] Autogrowing textarea (cf. Spork)
- [x] Rotating placeholder text (cf. Spork)
- [x] Show prompt options (ie buttons) as they are received
- [x] Throw JSON parsing errors to be able to improve completeJSON function
- [x] Append latest round to the rest of the rounds
