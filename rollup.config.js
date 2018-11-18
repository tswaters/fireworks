
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import copy from 'rollup-plugin-cpy'

const config = (browser, minify) => {

  const plugins = [
    typescript({target: browser ? 'es3': 'es6'}),
    copy({
      files: ['./fireworks.d.ts'],
      dest: 'dist'
    })
  ]

  if (browser) {
    plugins.push(
      resolve({
        module: true,
        extensions: ['.js', '.mjs']
      })
    )
  }

  if (minify) {
    plugins.push(terser())
  }

  return {
    input: './ts/fireworks.ts',
    output: browser ? {
      file: `dist/fireworks${minify ? '.min' : ''}.js`,
      name: 'Fireworks',
      format: 'umd',
      amd: {id: 'Fireworks'}
    } : [{
      file: './dist/fireworks.mjs',
      format: 'es'
    }, {
      file: './dist/fireworks.node.js',
      format: 'cjs'
    }],
    plugins
  }
}

export default [
  config(true, false),  // browser.unmin
  config(true, true),   // browser.min
  config(false)         // nodejs (mjs, cjs)
]
