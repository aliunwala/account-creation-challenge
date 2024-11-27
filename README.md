# Code Challenge Repository

## Overview

This repository contains boilerplate code you will use to build the create account form.

## Tech used

You have been given a starter repository using TypeScript / React / Vite / Tailwind / Ruby on Rails. You will only need
a basic understanding of these technologies to successfully complete this coding challenge. Refer to the documentation
links below for more information.

### Development

- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [React docs](https://reactjs.org/docs/hello-world.html)
- [Tailwind docs](https://tailwindcss.com/docs/installation)
- [Vite - Getting Started](https://vitejs.dev/guide/)
- [Ruby on Rails - Getting Started](https://guides.rubyonrails.org/getting_started.html)

To run this package you need to do a one time run of:

1. `make -j dev`
2. `npm install`

Then to see your package come up on http://localhost:3000/create-account run:

3. `bin/rails s`

Helpful notes:

1. On a Mac you may need to `chmod u+x bin/rails` to make rails excutable
2. If you are having trouble getting the right version of ruby to show up try:

```
export PATH="$HOME/.rbenv/bin:$PATH"
export PATH="$HOME/.rbenv/shims:$PATH"
rbenv local 3.1.4
```

3. Depeding on the state of the repo you may also want to run: `bin/rails db:migrate RAILS_ENV=development` (You should get a console waring to do this reguardless)

### Testing

- [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- [Testing Rails Applications](https://guides.rubyonrails.org/testing.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro)

<!-- TODO check if this is accurate... I had troble just running this single command -->
<!-- ## Commands -->
<!-- `make -j dev` installs packages and starts the development server. The site exists at `localhost:3000`. -->
<!-- `make -j test` runs the tests. -->

## Versions

```
▶ node -v
v18.17.1

▶ npm -v
10.1.0
```

If NodeJS is not installed on your computer, we recommend using [nvm](https://github.com/nvm-sh/nvm) for version management.

```
▶ ruby -v
ruby 3.1.4p223 (2023-03-30 revision 957bb7cb81) [arm64-darwin22]
```

If Ruby is not installed on your computer, we recommend using [rbenv](https://github.com/rbenv/rbenv) for version management.

**Note:** `[arm64-darwin22]` may be different as it is dependent on your operating system.
