<p>
  <a href="https://www.npmjs.com/package/dashkit-ui"><img src="https://img.shields.io/npm/dm/dashkit-ui.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/dashkit-ui"><img src="https://img.shields.io/npm/v/dashkit-ui.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/dashkit-ui"><img src="https://img.shields.io/npm/l/dashkit-ui.svg" alt="License"></a>
</p>

## Dashkit UI

> UI Components built on React.

## Docs

[View docs here](http://yuanzhaohao.github.io/dashkit-ui/#/)

## Requirements

```
React >= 16.0.0
```

## Installation

```
yarn add dashkit-ui
// or
npm install dashkit-ui
```

## CDN

```
<link rel="stylesheet" href="https://unpkg.com/dashkit-ui/dist/dashkit.css" />
<script crossorigin src="https://unpkg.com/dashkit-ui/dist/dashkit.min.js"></script>
```

## Usage

#### 1. Import on demand

Use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) to import components on demand.

```js
# Install plugin
npm i babel-plugin-import -D

// set babel config in .babelrc or babel-loader
// Note: Don't set libraryDirectory if you are using webpack 1.
{
  "plugins": [
    ["import", {
      "libraryName": "dashkit-ui",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// For users who use babel7, that can be configured in babel.config.js
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'dashkit-ui',
      libraryDirectory: 'es',
      style: function(stylePath) {
        return `${stylePath}/style.scss`;
      }
    }, 'dashkit-ui']
  ]
};

// Then you can import components from dashkit-ui
import { Button } from 'dashkit-ui'
```

If you are using TypeScript，please use [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) instead

#### 2. Manually import

```javascript
import Button from 'dashkit-ui/lib/button';
import 'dashkit-ui/lib/button/style.css';
```

#### 3. Import all components

```javascript
import React from 'react';
import Dashkit from 'dashkit-ui';
import 'dashkit-ui/lib/style/index.css';
```

You can also view the [quickstart page](https://yuanzhaohao.github.io/dashkit-ui/#/quickstart) for more details.
