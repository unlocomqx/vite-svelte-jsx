# vite-svelte-jsx [![npm](https://img.shields.io/npm/v/vite-svelte-jsx.svg)](https://npmjs.com/package/vite-svelte-jsx)

Provides Svelte JSX & TSX support.

```js
// vite.config.js
import svelteJsx from 'vite-svelte-jsx'

export default {
  plugins: [
    svelteJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ]
}
```

## Options

See [@vue/babel-plugin-jsx](https://github.com/vuejs/jsx-next).

### How to use

This plugin uses [svelte-jsx](https://github.com/kenoxa/svelte-jsx#usage) under the hood.  
Check the svelte-jsx documentation to check how to write svelte jsx code.
