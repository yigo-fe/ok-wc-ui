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
import replace from 'rollup-plugin-replace'


const isPrd = process.env.NODE_ENV === 'production'

const createConfig = format => {
  const input = 'packages/index.ts'
  let output = {
    format: format,
    file: `dist/${pkg.name}.${format}.js`,
    exports: 'named',
  }
  const isUmd = format === 'umd'
  const babelPlugin = isUmd ? babel(false, false) : babel()

  const plugins = [
    alias(),
    nodeResolve(),
    json(),
    postcss({
      extract: `css/${pkg.name}.css`,
      extensions: ['css', 'less'],
      minimize: true,
      plugins: [autoprefixer],
    }),
    cjs(),
    ts(),
    babelPlugin,
    filesize({ showBrotliSize: true }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(isPrd ? 'production':'development'),
    }),
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
  if(!isPrd) {
    plugins.push(
      serve({
        open: true,
        port: 8001,
        openPage: '/example/index.html',
      }),
      livereload()
    )
  }

  return {
    input,
    output,
    plugins,
  }
}

const formats = isPrd ? ['esm', 'cjs', 'umd'] : ['umd']

export default () => formats.map(createConfig)
