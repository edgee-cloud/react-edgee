# nextjs-edgee Component

`NextEdgee` is a React component that injects the Edgee SDK script into the application.
It also sets up listeners to track page navigations via `history.pushState` and `history.replaceState`
to automatically call the `edgee.page` method, ensuring page views are tracked during SPA navigations.

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/nextjs-edgee)
[![NPM Downloads](https://img.shields.io/npm/dm/nextjs-toploader?&style=flat-square)](https://www.npmjs.com/package/nextjs-edgee)

## Install

using npm:

```bash
npm install nextjs-edgee
```

using yarn:

```bash
yarn add nextjs-edgee
```

## Usage

import using:

```js
import NextEdgee from 'nextjs-edgee';
```

### Usage with `app/layout.js` for `app` folder structure

For rendering add `<NextEdgee />` to your `return()` inside the `<body></body>` of `RootLayout()`:

```js
import NextEdgee from 'nextjs-edgee';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextEdgee src={"https://yourdomain.com/_edgee/sdk.js"} />
        {children}
      </body>
    </html>
  );
}
```

### Usage with `pages/_app.js` for `pages` folder structure

For rendering add `<NextEdgee />` to your `return()` in `MyApp()`:

```js
import NextEdgee from 'nextjs-edgee';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextEdgee src="https://yourdomain.com/_edgee/sdk.js" />
      <Component {...pageProps} />;
    </>
  );
}
```

### Usage with React, Vite React or any other React Based Framework

For rendering add `<NextEdgee />` to your `return()` inside the <Router><Router/> component in `App()` in your App.js:

```js
import NextEdgee from 'nextjsedgee';
const App = () => {
  return (
    <div>
    <Router>
      <NextEdgee src="https://yourdomain.com/_edgee/sdk.js" />
    <Routes>
    {/* Your Routes Here */}
    </Routes>
    </Router>
    </div>
  )
}

export default App;
```