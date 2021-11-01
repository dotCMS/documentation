# DotCMS Documentation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Includes
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)

## Getting Started

1. Edit `package.json` and change the `name`
2. Run `yarn`
3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Versioning

Since we need the current version and keep older versions, we took advantage of [Nextjs static export](https://nextjs.org/docs/advanced-features/static-html-export) and the way it works is:

We have a `/latest` route that will have a server side render version of the last documentation
We kept versions in `/XX.XX.0` but in static HTML.
To achieve this we create have the `/__staticsite_` that holds the pages for the static render and inside `/pages` we have the latest.

## Deploy to S3
We run a Github Action to this deploy and the code lives in the following repo: https://github.com/dotCMS/s3-doc-pusher/
