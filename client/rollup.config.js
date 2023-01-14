import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'

export default {
    input: 'src/index.tsx',
    output: [{
        file: 'web/index.js',
        format: 'iife'
    }],
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        postcss()
    ]
}
