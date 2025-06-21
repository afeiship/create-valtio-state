import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import rollupBanner from '@jswork/rollup-banner';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

const banner = rollupBanner();
const commonOutputConfig = {
  name: 'createValtioState',
  banner,
  sourcemap: true
};

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        ...commonOutputConfig,
        file: 'dist/index.cjs.js',
        format: 'cjs'
      },
      {
        ...commonOutputConfig,
        file: 'dist/index.esm.js',
        format: 'esm'
      },
      {
        ...commonOutputConfig,
        file: 'dist/index.umd.js',
        format: 'umd',
        globals: {}
      },
      {
        ...commonOutputConfig,
        file: 'dist/index.umd.min.js',
        format: 'umd',
        plugins: [terser()]
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      // json(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: false
      })
    ],
    external: ['tslib']
  },
  // 生成类型声明文件
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
