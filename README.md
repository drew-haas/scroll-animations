# scroll-animations

Makes adding scroll animations to your website even easier.

## Purpose

The idea behind this code is to quickly and easily add any scroll animations to your html elements. After working on large projects it became apparent that I shouldn't create a javascript or css animation for every element.  I found that using Greensock's GSAP libraries and ScrollMagic made a pretty nice combination.

## Installing / Getting started

This is the bare minimum to get the project running in development mode. For a more detailed explanation, [see below](#development).

```shell
npm install
npm run debug
```

The first command will install all the necessary dependencies for the project. The second command will build your project to the `./dist` directory and display it in the browser in development mode.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) - v7.6.0+

### Running Local Server

Spin up a local development server with Browsersync.

```shell
npm run debug
```

## Deployment

Using NPM scripts, the website can be deployed to GitHub Pages:

```shell
npm run deploy
```

This will push the current `dist` directory to the gh-pages branch.
