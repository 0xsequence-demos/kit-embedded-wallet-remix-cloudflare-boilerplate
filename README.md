# Sequence Kit Embedded Wallet Remix Cloudflare Starter Boilerplate

> [!WARNING]  
> This repo is deprecated as part of the evolution of Remix to React Router 7.
> Please check out [this boilerplate](https://github.com/0xsequence-demos/web-sdk-embedded-wallet-rr7-cloudflare-boilerplate) instead!



Starter Sequence Embedded Wallet boilerplate that uses [Sequence Kit](https://github.com/0xsequence/kit) with Remix & Cloudflare.

## Quickstart

Copy `.dev.vars.example` to `.dev.vars` and fill with your project information. To test things out, you can use the pre-provided keys in the `.dev.vars.example` file:

```js
cp .dev.vars.example .dev.vars
```

Then install and run:

```js
npm install && npm run dev
```

> [!WARNING]
> This project is using `npm` for the package manager. In our experience, we recommend avoiding pnpm on remix projects on cloudflare, until further notice.

The app will start on `localhost:4444`

To provide your own keys from [Sequence Builder](https://sequence.build/), simply edit the `.dev.vars` file accordingly.
