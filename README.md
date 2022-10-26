![CI/CD](https://github.com/yusufsheiqh/quotes/workflows/CI/CD/badge.svg)

# Quotes

## Contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the application](#running-the-application)
  - [Running the tests](#running-the-tests)

## Getting started

### Prerequisites

- [Docker](https://www.docker.com/get-started) (optional)
- [NodeJS](https://nodejs.org/en/)
  - run `nvm install` if using [NVM](https://github.com/nvm-sh/nvm)
- [NPM](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repo

```sh
$ git clone git@github.com:yusufsheiqh/quotes.git
```

2. Install packages in `quotes` directory

```sh
$ npm i
```

## Usage

### Running the application

To run the application for local development:

```sh
$ npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

### Formatting the application

To run the formatter (using [Prettier](https://prettier.io/)):

```sh
$ npm run format
```

### Running the tests

To run all the tests:

```sh
$ npm run test
```

To run journey, or unit tests:

```sh
$ npm run test:[journey/unit] # for example, npm run test:unit to run unit tests
```

## Docker

### Running the application

```sh
$ npm run dev:docker
```

Then visit [http://localhost:3000](http://localhost:3000).
