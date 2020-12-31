import cjs from '@rollup/plugin-commonjs'
import autoprefixer from 'autoprefixer'
import alias from 'rollup-plugin-alias'
import filesize from 'rollup-plugin-filesize'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import VuePlugin from 'rollup-plugin-vue'

import babel from './build/babel'
import nodeResolve from './build/resolve'
import ts from './build/ts'
import pkg from './package.json'

const createConfig = format => {
  const input = 'packages/index.ts'
  let output = {
    format: format,
    file: `dist/${pkg.name}.${format}.js`,
    exports: 'named',
  }
  const isUmd = format === 'umd'
  const babelPlugin = isUmd ? babel(false, false) : babel()
  const external = isUmd
    ? ['vue']
    : id => {
        return /core|^vue$/.test(id)
      }
  const plugins = [
    alias(),
    nodeResolve(),
    VuePlugin({
      compileTemplate: true,
    }),
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
  ]
  if (isUmd) {
    output = {
      ...output,
      name: pkg.name,
      globals: {
        vue: 'Vue',
      },
      // 只有umd需要压缩
      plugins: [terser()],
    }
  }
  return {
    input,
    output,
    external,
    plugins,
  }
}

export default () => ['esm', 'cjs', 'umd'].map(createConfig)
