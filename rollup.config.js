import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from 'rollup-plugin-node-resolve';

const packages = require('./package.json');
const fileName = process.env.NODE_ENV === 'development' ? `colority` : `colority.min`;
const configure = {
    entry: `src/index.js`,
    moduleName: packages.moduleName,
    moduleId: packages.moduleName,
    sourceMap: true,
    targets: [{
        dest: `dist/${fileName}.js`,
        format: 'umd',
    }],
    plugins: [
        babel(),
        sourcemaps(),
        resolve(),
    ],
};

if (process.env.NODE_ENV === 'production') configure.plugins.push(uglify());

export default configure;
