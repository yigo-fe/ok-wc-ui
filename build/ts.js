import path from 'path'
import ts from 'rollup-plugin-typescript2'

export default () =>
  ts({
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
    tsconfigOverride: {
      compilerOptions: { declaration: true, rootDir: './packages' },
    },
    useTsconfigDeclarationDir: true,
  })
