import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import copy from 'rollup-plugin-cpy'
import html from 'rollup-plugin-bundle-html'
import serve from 'rollup-plugin-serve'

const isWatch = process.argv.includes('-w') || process.argv.includes('--watch')
const isProduction = process.env.NODE_ENV === 'production'

const config = (format, file, minify, server = false) => ({
  input: './ts/fireworks.ts',
  output: {
    name: 'Fireworks',
    file,
    format,
    amd: { id: 'Fireworks' }
  },
  plugins: [
    typescript({ target: format === 'umd' ? 'es3' : 'es6' }),
    copy({
      files: ['./fireworks.d.ts'],
      dest: './dist/'
    }),
    html({
      template: './html/index.html',
      filename: 'index.html',
      dest: './dist/',
      inject: 'head',
      ignore: /min|node/g,
      externals: [
        {
          file: './dist/example.css',
          type: 'css'
        },
        {
          file: './dist/example.js',
          type: 'js',
          pos: 'after'
        }
      ]
    }),
    resolve({
      extensions: ['.js', '.mjs']
    }),
    minify && terser(),
    server &&
      serve({
        port: 8001,
        host: '0.0.0.0',
        path: 'examples/index.html',
        contentBase: ['dist', 'examples'],
        open: false,
        wait: 500
      })
  ]
})

export default [
  config('umd', './dist/fireworks.js', false, !isProduction && isWatch),
  config('umd', './dist/fireworks.min.js', true),
  config('module', './dist/fireworks.mjs', false),
  config('cjs', './dist/fireworks.node.js', false)
]
