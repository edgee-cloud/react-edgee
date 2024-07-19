# Next Js Edgee Component

- The Edgee SDK for Next.js

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/nextjs-toploader)
[![NPM Downloads](https://img.shields.io/npm/dm/nextjs-toploader?&style=flat-square)](https://www.npmjs.com/package/nextjs-toploader)

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
        <NextEdgee />
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
      <NextEdgee />
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
      <NextEdgee />
    <Routes>
    {/* Your Routes Here */}
    </Routes>
    </Router>
    </div>
  )
}

export default App;
```