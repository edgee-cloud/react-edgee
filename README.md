# react-edgee Component

`react-edgee` is a React component that injects the Edgee SDK script into a React application.

It also sets up listeners to track page navigations via `history.pushState` and `history.replaceState`
to automatically call the `edgee.page` method, ensuring page views are tracked during SPA navigations, and provides a **React Hook** (`useEdgeeDataCollection`) to simplify event tracking (`track`, `user`, `page`, `consent`).


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
import { EdgeeSdk, EdgeeDataLayer, EdgeeDataLayerObject } from 'react-edgee';
```


### Edgee Data Layer configuration

The Data Layer provides you with fine-grained control over the data sent to various analytics.
It is a structured data format used to define and send detailed information about user interactions
and page characteristics.
By including a Data Layer, you can instruct Edgee on what data to collect, how to process it, and where to send it.

```js
import { EdgeeDataLayerObject, EdgeeDataLayer } from "react-edgee";

const edgeeDataLayer: EdgeeDataLayerObject = {
  // your Data Layer configuration here
};
```

To learn more about the Data Layer object,
visit the [Edgee Data Layer docs](https://www.edgee.cloud/docs/services/data-collection/data-layer).



### When using `app` folder structure

Add the `EdgeeSdk` and `EdgeeDataLayer` components inside the `<body>` tag of your `RootLayout` component:

```js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <EdgeeDataLayer data={edgeeDataLayer} />
        <EdgeeSdk src={"<YOUR_SDK_URL>"} />
      </body>
    </html>
  );
}
```

### When using `pages` folder structure

Add the `EdgeeSdk` and `EdgeeDataLayer` components in your `MyApp` component:

```js
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <EdgeeDataLayer data={edgeeDataLayer} />
      <EdgeeSdk src="<YOUR_SDK_URL>" />
    </>
  );
}
```

### When using Vite or other frameworks


Add the `EdgeeSdk` and `EdgeeDataLayer` component inside the `<Router>` component in your `App`:

```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <EdgeeDataLayer data={edgeeDataLayer} />
        <EdgeeSdk src="<YOUR_SDK_URL>" />
        <Routes>
          {/* Your Routes Here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```

### 🔥 Using the React Hook (`useEdgeeDataCollection`)

The `useEdgeeDataCollection` hook simplifies event tracking by providing direct access to the Edgee [SDK methods](https://www.edgee.cloud/docs/services/data-collection/overview).

```js
import { useEdgeeDataCollection } from 'react-edgee';

const MyComponent = () => {
  const { track, user, page, consent } = useEdgeeDataCollection();

  return (
    <>
      <button onClick={() => track({ name: 'button_click' })}>Click Me</button>
      <button onClick={() => user({ user_id: '12345', edgee_id: 'edgee-abc' })}>Identify User</button>
      <button onClick={() => page({ name: 'HomePage', url: 'https://example.com' })}>Track Page</button>
      <button onClick={() => consent('granted')}>Accept Consent</button>
    </>
  );
};
```

To learn more about the Edgee SDK, visit the [Edgee SDK documentation](https://www.edgee.cloud/docs/getting-started/sdk).
