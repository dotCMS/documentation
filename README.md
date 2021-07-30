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

## Deploy to S3
We need to keep older versions of the doc, to do this on every DotCMS release we are going to publish two folders:

- `/latest`
- `/XX.XX.XX`

### Docker

1. Build docker image and passing the version as argument from `package.json`

```shell
docker build --build-arg VERSION=$(cat ./package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]') --tag dotcms-docs .
```

2. Run the container to publish

```
docker run --env AWS_ACCESS_KEY_ID=KEY --env AWS_SECRET_ACCESS_KEY=KEY --env AWS_DEFAULT_REGION=REGION dotcms-docs
```

3. That's it, this will publish both folders to the S3 bucket.