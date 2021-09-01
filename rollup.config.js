import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import fs from 'fs';
import nodePolyfills from 'rollup-plugin-polyfill-node'

const isProd = (process.env.BUILD === 'production');
const buildInfo = JSON.stringify({
  build: isProd ? 'prod' : 'dev',
  date: new Date(),
})
fs.writeFileSync('./src/data/buildInfo.json', buildInfo);

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

export default {
  input: 'src/main.tsx',
  output: {
    file: 'main.js',
    sourcemap: 'inline',
    sourcemapExcludeSources: isProd,
    format: 'cjs',
    exports: 'default',
    banner,
  },
  external: ['obsidian'],
  plugins: [
    typescript(),
    nodeResolve({browser: true}),
    commonjs(),
    json(),
    nodePolyfills(),
  ]
};
