import cjs from '@rollup/plugin-commonjs'
import autoprefixer from 'autoprefixer'
import alias from 'rollup-plugin-alias'
import filesize from 'rollup-plugin-filesize'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

import babel from './build/babel'
import nodeResolve from './build/resolve'
import ts from './build/ts'
import pkg from './package.json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const createConfig = format => {
  const input = 'packages/index.ts'
  let output = {
    format: format,
    file: `dist/${pkg.name}.${format}.js`,
    exports: 'named',
  }
  const isUmd = format === 'umd'
  const babelPlugin = isUmd ? babel(false, false) : babel()
  const external = isUmd ? [] : ['ok-lit']
  const plugins = [
    alias(),
    nodeResolve(),
    json(),
    postcss({
      extract: false,
      inject: false,
      extensions: ['css', 'less'],
      minimize: true,
      plugins: [autoprefixer],
    }),
    cjs(),
    ts(),
    babelPlugin,
    filesize({ showBrotliSize: true }),
  ]

  if (isUmd) {
    output = {
      ...output,
      name: pkg.name,
      // 只有umd需要压缩
      plugins: [terser()],
    }
  }

  // 开发模式
  if (process.env.NODE_ENV === 'development') {
    plugins.push(
      serve({
        open: true,
        port: 8001,
        openPage: './example/index.html',
      }),
      livereload()
    )
  }

  return {
    input,
    output,
    external,
    plugins,
  }
}

export default () => ['esm', 'cjs', 'umd'].map(createConfig)
