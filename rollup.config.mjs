import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './main.ts',
  output: {
    file: 'index.js',
    format: 'cjs',
    strict: true,
    banner: '#! /usr/bin/env node\n',
  },
  plugins: [resolve(),commonjs(),typescript()]
}
