import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import copy from 'rollup-plugin-copy'
import html from 'rollup-plugin-html2'
import serve from 'rollup-plugin-serve'

const isWatch = process.argv.includes('-w') || process.argv.includes('--watch')
const isProduction = process.env.NODE_ENV !== 'development'

const distFiles = [
  'fireworks.d.ts',
  'package.json',
  'package-lock.json',
  'LICENSE',
  'README.MD',
  'RELEASE.MD',
  'CHANGES.MD',
  'bower.json',
]

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
    sourcemap: !isProduction,
  },
  plugins: [
    typescript({ target: format === 'umd' ? 'es3' : 'es6' }),
    copy({
      targets: distFiles.map((file) => ({ src: file, dest: './dist/' })),
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
        contentBase: ['dist'],
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
    useHtml: !isProduction,
  }),
  config({
    format: 'umd',
    file: './dist/fireworks.min.js',
    minify: true,
  }),
  config({
    format: 'umd',
    file: './gh-pages/fireworks.min.js',
    minify: true,
    useHtml: true,
  }),
  config({ format: 'module', file: './dist/fireworks.mjs', minify: false }),
  config({ format: 'cjs', file: './dist/fireworks.node.js', minify: false }),
]
