# Theme Generator

This is a work-in-progress site project aimed at helping to generate color palettes and accessible text text colors for use on each palette color

## Live demo

Available live on GitHub Pages here: https://danielpickett.github.io/theme-generator/k

## Running the project

This is a monorepo using Nx and Parcel.

To get it running locally, just run...

```bash
yarn
yarn start
```

Nx will take care of building the workspace dependencies and will launch the primary demo app for the theme-generator package.

Note: This doesn't currently build types. Until this is fixed, you will need to also run `yarn build` to prevent TypeScript errors from showing up in your IDE. And you'll need to repeat this any time you change types in a workspace dependency.
