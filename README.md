# react-edgee Component

`react-edgee` is a React component that injects the Edgee SDK script into a React application.

It also sets up listeners to track page navigations via `history.pushState` and `history.replaceState`
to automatically call the `edgee.page` method, ensuring page views are tracked during SPA navigations.

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/react-edgee)
[![NPM Downloads](https://img.shields.io/npm/dm/react-edgee?&style=flat-square)](https://www.npmjs.com/package/react-edgee)

## Install

using npm:

```bash
npm install react-edgee
```

using yarn:

```bash
yarn add react-edgee
```

## Usage

import using:

```js
import EdgeeSdk from 'react-edgee';
```

### Usage with `app/layout.js` for `app` folder structure

For rendering add `<EdgeeSdk />` to your `return()` inside the `<body></body>` of `RootLayout()`:

```js
import EdgeeSdk from "react-edgee";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <EdgeeSdk src={"https://yourdomain.com/_edgee/sdk.js"} />
      </body>
    </html>
  );
}
```

### Usage with `pages/_app.js` for `pages` folder structure

For rendering add `<EdgeeSdk />` to your `return()` in `MyApp()`:

```js
import EdgeeSdk from 'react-edgee';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <EdgeeSdk src="https://yourdomain.com/_edgee/sdk.js" />
    </>
  );
}
```

### Usage with React, Vite React or any other React Based Framework

For rendering add `<EdgeeSdk />` to your `return()` inside the <Router><Router/> component in `App()` in your App.js:

```js
import EdgeeSdk from 'nextjsedgee';
const App = () => {
  return (
    <div>
    <Router>
      <EdgeeSdk src="https://yourdomain.com/_edgee/sdk.js" />
    <Routes>
    {/* Your Routes Here */}
    </Routes>
    </Router>
    </div>
  )
}

export default App;
```

## Edgee Context Payload Usage

import using:

```js
import { EdgeeSdk, EdgeeContextPayload, EdgeeContextObject } from "react-edgee";
```

### Usage with `app/layout.js` for `app` folder structure

```js
import { EdgeeSdk, EdgeeContextPayload, EdgeeContextObject } from "react-edgee";

export default function RootLayout({ children }) {
  const edgeeContextPayload: EdgeeContextObject = {
    page: {
      name: "With Edgee",
      category: "demo",
      title: "With Edgee",
      url: "https://mysite.com/my/path",
      path: "/my/path",
      search: "?ok",
      keywords: ["demo", "edgee"],
      properties: {
        section: "edge computing",
        order: 6
      }
    },
    identify: {
      userId: "12345",
      anonymousId: "12345",
      properties: {
        email: "me@example.com",
        name: "John Doe",
        age: 32
      }
    },
    destinations: {
      all: true,
      google_analytics: true,
      amplitude: true,
      facebook_capi: true
    }
  };

  return (
    <html lang="en">
      <body>
        {children}
        <EdgeeSdk src={"https://yourdomain.com/_edgee/sdk.js"} />
      </body>
    </html>
  );
}
```

To know more about the Edgee SDK, visit the [Edgee SDK documentation](https://docs.edgee.cloud/getting-started/reactjs-sdk).
