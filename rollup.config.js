import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import copy from 'rollup-plugin-cpy'
import html from 'rollup-plugin-html2'
import serve from 'rollup-plugin-serve'

const isWatch = process.argv.includes('-w') || process.argv.includes('--watch')
const isProduction = process.env.NODE_ENV !== 'development'

const config = ({
  format,
  file,
  minify,
  useServer = false,
  useHtml = false,
}) => ({
  input: './ts/fireworks.ts',
  output: {
    name: 'Fireworks',
    file,
    format,
    amd: { id: 'Fireworks' },
  },
  plugins: [
    typescript({ target: format === 'umd' ? 'es3' : 'es6' }),
    copy({
      files: ['./fireworks.d.ts'].concat(
        isProduction ? [] : ['./examples/example.css', './examples/example.js']
      ),
      dest: './dist/',
    }),
    useHtml &&
      html({
        template: './html/index.html',
        fileName: 'index.html',
        inject: 'head',
      }),
    resolve({
      extensions: ['.js', '.mjs'],
    }),
    minify && terser(),
    useServer &&
      serve({
        port: 8001,
        host: '0.0.0.0',
        path: 'examples/index.html',
        contentBase: ['dist', 'examples'],
        open: false,
        wait: 500,
      }),
  ],
})

export default [
  config({
    format: 'umd',
    file: './dist/fireworks.js',
    minify: false,
    useServer: !isProduction && isWatch,
  }),
  config({
    format: 'umd',
    file: './dist/fireworks.min.js',
    minify: true,
    useHtml: true,
  }),
  config({ format: 'module', file: './dist/fireworks.mjs', minify: false }),
  config({ format: 'cjs', file: './dist/fireworks.node.js', minify: false }),
]
