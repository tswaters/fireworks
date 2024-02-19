import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import html from 'rollup-plugin-html2'
import serve from 'rollup-plugin-serve'

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

const exampleConfig = () => ({
  input: './example/index.ts',
  cache: true,
  output: {
    name: 'Fireworks',
    file: `./gh-pages/fireworks.js`,
    sourcemap: true,
  },
  plugins: [
    typescript({ target: 'es5' }),
    html({
      template: './example/index.html',
      fileName: 'index.html',
    }),
    resolve({
      extensions: ['.js', '.mjs'],
    }),
    isProduction && terser(),
    !isProduction &&
      serve({
        port: 8001,
        host: '0.0.0.0',
        contentBase: ['gh-pages'],
        open: false,
        wait: 500,
      }),
  ].filter(Boolean),
})

const config = ({ format, file, minify }) => ({
  input: './ts/fireworks.ts',
  output: {
    name: 'Fireworks',
    file,
    format,
    amd: { id: 'Fireworks' },
    sourcemap: false,
  },
  plugins: [
    typescript({ target: format === 'umd' ? 'es5' : 'es6' }),
    copy({
      targets: distFiles.map((file) => ({ src: file, dest: './dist/' })),
    }),
    resolve({
      extensions: ['.js', '.mjs'],
    }),
    minify && terser(),
  ],
})

export default isProduction
  ? [
      config({ format: 'umd', file: './dist/fireworks.js', minify: false }),
      config({ format: 'umd', file: './dist/fireworks.min.js', minify: true }),
      config({ format: 'module', file: './dist/fireworks.mjs', minify: false }),
      config({ format: 'cjs', file: './dist/fireworks.cjs.js', minify: false }),
      exampleConfig(),
    ]
  : exampleConfig()
