// @ts-check
const babel = require('@babel/core')
const { createFilter } = require('@rollup/pluginutils')

/**
 *
 * @param {import('@vue/babel-plugin-jsx').VueJSXPluginOptions & CommonOptions} options
 * @returns {import('vite').Plugin}
 */
function svelteJsxPlugin(options = {}) {
  let root = ''
  let needHmr = false
  let needSourceMap = true

  return {
    name: 'svelte-jsx',

    config(config) {
      return {
        // only apply esbuild to ts files
        // since we are handling jsx and tsx now
        esbuild: {
          include: /\.ts$/
        },
        define: config.define
      }
    },

    configResolved(config) {
      needHmr = config.command === 'serve' && !config.isProduction
      needSourceMap = config.command === 'serve' || !!config.build.sourcemap
      root = config.root
    },

    transform(code, id) {
      const {
        include,
        exclude,
        babelPlugins = []
      } = options

      const filter = createFilter(include || /\.[jt]sx$/, exclude)

      if (filter(id)) {
        const plugins = [...babelPlugins]
        if (id.endsWith('.tsx')) {
          // plugins.push([
          //   require('@babel/plugin-transform-typescript'),
          //   // @ts-ignore
          //   { isTSX: true, allowExtensions: true }
          // ])
        }

        plugins.push([
          require('@babel/plugin-transform-react-jsx'),
          // @ts-ignore
          { runtime: 'automatic', importSource: 'svelte-jsx' }
        ])

        const result = babel.transformSync(code, {
          babelrc: false,
          ast: true,
          plugins,
          sourceMaps: needSourceMap,
          sourceFileName: id,
          configFile: false
        })

        return {
          code: result.code,
          map: result.map
        }
      }
    }
  }
}

module.exports = svelteJsxPlugin
svelteJsxPlugin.default = svelteJsxPlugin
