This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Using `RTK Query` and `async-mutex`

This web app leverages `RTK Query`'s re-authorization feature.
That means, every time a user hits a 401-unauthorized response, it will automatically trigger the refresh endpoint that should provide a new access token (as long as the refresh token has not expired) and retry the previous request to which the 401 response was returned.
It will also be using `async-mutex` to prevent multiple calls to refresh when they fail.
For more details, see [RTK Query Overview](https://redux-toolkit.js.org/rtk-query/overview) and search for 're-authorization'.

