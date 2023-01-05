import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import externalGlobals from 'rollup-plugin-external-globals'

export default {
    input: 'src/index.tsx',
    output: [{
        file: 'web/index.js',
        format: 'esm'
    }],
    plugins: [
        resolve(),
        commonjs(),
        typescript() /*,
        externalGlobals({
            'react': 'React',
            'react-dom': 'ReactDOM'
        })
        */
    ]
}
