# The Arcade

My personal website and arcade, built with SvelteKit and Svelte 5.

**Live site:** [https://ethan-cs5610-arcade.vercel.app/]

## Features

- **Home, About, Contact** pages ported from my original HTML/CSS site
- **Crossword**: a crossword built with only HTML and CSS
- **2048**: slide and merge tiles with arrow keys, swipe, or on-screen buttons
  - Tiles animate as they move (keyed each block with stable tile ids)
  - Current score and best score, which persists across pages and reloads
  - Win at 2048 and keep playing; game over when no moves remain

## Tech stack

- SvelteKit, Svelte 5
- [@ethanhua/arcade-core](https://www.npmjs.com/package/@ethanhua/arcade-core): my own npm package containing the 2048 game logic
- Deployed on Vercel

## Running locally

```bash
git clone https://github.com/Hcckii/ethan_cs5610_arcade
cd arcade
npm install
npm run dev
```

Then open http://localhost:5173.

To test on a phone on the same Wi-Fi:

```bash
npm run dev -- --host
```

## Project structure

```
src/
  app.css                      Global styles and design tokens (colours, fonts)
  lib/
    components/
      NavBar.svelte            Site navigation
      NavLink.svelte           A nav link that highlights the current page
      Controls.svelte          On-screen arrow buttons for touch devices
      GameCard.svelte          Game card on the home page
    state/
      scores.svelte.js         Best score, shared across pages and saved to localStorage
  routes/
    +layout.svelte             Shared layout with the nav bar
    +page.svelte               Home
    about/                     About
    contact/                   Contact
    games/crossword/           Crossword
    games/2048/                2048 (client-only rendering, see +page.js)
```

## Package vs. app

All 2048 rules live in `arcade-core`: moving and merging tiles, spawning, scoring, and detecting wins and game over. These are pure functions that don't touch the DOM.

This app handles everything about presentation and input: rendering the board, keyboard, touch and button controls, animations, saving to localStorage, and accessibility.

## Svelte features used

| Feature | Where |
|---|---|
| `$state`, `$derived` | `games/2048/+page.svelte` |
| `$props` | `NavLink`, `Controls`, `GameCard` |
| Keyed each block | Tiles in `games/2048/+page.svelte`, links in `NavBar` |
| Callback props | `Controls` calls `onmove` from the 2048 page |
| `class:` / `style:` directives | Current-page highlight in `NavLink`, tile colours and positions in 2048 |
| Transitions | Game over / win messages, new tile spawn |
| Shared state | `lib/state/scores.svelte.js` |

## Accessibility

- Fully keyboard navigable with visible focus styles
- Score and game status announced with `aria-live` regions
- Text and tile colours meet WCAG AA (4.5:1) contrast
- Respects `prefers-reduced-motion`
- Responsive from 320px to wide screens
- Lighthouse accessibility: 95+ on every route

## Credits
- logo: Hanma Yujiro from Baki
- Photos are my own