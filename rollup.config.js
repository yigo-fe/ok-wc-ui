import cjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import autoprefixer from 'autoprefixer'
import rimraf from 'rimraf'
import alias from 'rollup-plugin-alias'
import copy from 'rollup-plugin-copy'
import filesize from 'rollup-plugin-filesize'
import json from 'rollup-plugin-json'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

import babel from './build/babel'
import nodeResolve from './build/resolve'
import ts from './build/ts'
import pkg from './package.json'

const isPrd = process.env.NODE_ENV === 'production'
if (!isPrd) {
  // 本地运行之前先清除node_modules下的缓存，否则typescript二次编译时会报错
  rimraf('./node_modules/.cache', err => err && console.log(err))
}
const createConfig = format => {
  const input = 'packages/index.ts'
  let output = {
    format: format,
    file: `dist/${pkg.name}.${format}.js`,
    exports: 'named',
  }
  const isUmd = format === 'umd'
  const babelPlugin = babel(false, false)
  const external = isUmd ? [] : ['ok-lit']
  const plugins = [
    alias(),
    nodeResolve(),
    json(),
    postcss({
      extract: false,
      inject: false,
      extensions: ['css', 'less', '.css'],
      minimize: true,
      plugins: [autoprefixer],
    }),
    cjs(),
    ts(),
    image(),
    babelPlugin,
    filesize({ showBrotliSize: true }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isPrd ? 'production' : 'development'
      ),
    }),
    // copy 静态资源
    copy({
      targets: [
        { src: 'public/common.css', dest: 'dist' },
        { src: 'public/antd.min.css', dest: 'dist' },
      ],
    }),
  ]

  if (isUmd) {
    output = {
      ...output,
      name: pkg.name,
      // 只有umd需要压缩
      plugins: [
        terser({
          output: { comments: false },
          compress: { drop_debugger: isPrd },
        }),
      ],
    }
  }

  // 开发模式
  if (!isPrd) {
    plugins.push(
      serve({
        open: true,
        port: 8000,
        openPage: '/public/index.html',
      }),
      livereload()
    )
  }

  return {
    input,
    output,
    external,
    plugins,
    onwarn: function (warning) {
      // Skip certain warnings

      // should intercept ... but doesn't in some rollup versions
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return
      }

      // console.warn everything else
      console.warn(warning.message)
    },
  }
}

const formats = isPrd ? ['esm', 'cjs', 'umd'] : ['umd']
export default () => formats.map(createConfig)
