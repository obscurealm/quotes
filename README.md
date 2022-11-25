![CI/CD](https://github.com/yusufsheiqh/quotes/workflows/CI/CD/badge.svg)

# Quotes

A [Next.js](https://nextjs.org/) application serving a list of quotes using the [Notion](https://www.notion.so) 
[API](https://developers.notion.com). 

## Contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the application](#running-the-application)
  - [Running the tests](#running-the-tests)
  - [Formatting the code](#formatting-the-code)
  - [Linting the code](#linting-the-code)

## Getting started

### Prerequisites

- [Docker](https://www.docker.com/get-started) (optional)
- [NodeJS](https://nodejs.org/en)
  - run `nvm install` if using [NVM](https://github.com/nvm-sh/nvm)
- [NPM](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repo

```sh
git clone git@github.com:yusufsheiqh/quotes.git
```

2. Install packages in `quotes` directory

```sh
npm i
```

## Usage

### Running the application

To run the application for local development:

```sh
npm run dev
npm run dev:docker # using Docker
```

Then visit [http://localhost:3000](http://localhost:3000).

### Running the tests

To run all the tests:

```sh
npm run test
```

To run unit tests:

```sh
npm run test:unit
```

To run acceptance tests:

```sh
npm run test:acceptance
```

To run journey tests:

```sh
npm run test:journey # to automatically run the tests in headless mode
npm run test:journey:open # to interactively run the tests in a browser
```

### Formatting the code

To run the formatter (using [Prettier](https://prettier.io)):

```sh
npm run format
```

### Linting the code

To run the linter (using [ESLint](https://eslint.org/)):

```sh
npm run lint
```
