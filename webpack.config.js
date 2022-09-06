const path = require('path');
const version = require('./package.json').version;
// const CopyPlugin = require('copy-webpack-plugin');
// const { IgnorePlugin } = require('webpack');

// Custom webpack rules
const rules = [
  { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
  // { test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules/ },
  { test: /\.css$/, use: ['style-loader', 'css-loader'] },
];

// Packages that shouldn't be bundled but loaded at runtime
const externals = [
  '@jupyter-widgets/base',      
  //  'assets/rdkit/RDKit_minimal.js',   
];

const resolve = {
  // Add '.ts' and '.tsx' as resolvable extensions.
  extensions: ['.webpack.js', '.web.js', '.ts',  '.tsx'], //'.js',
};

const plugins = [
  // new CopyPlugin({
  //   patterns: [
  //     {
  //       from: path.resolve(__dirname, 'assets', 'rdkit'),
  //       to: ".",
  //     },
  //   ],
  // }),
];
// plugins: [
    //   new IgnorePlugin({
    //     resourceRegExp: /^\.\/rdkit$/,
    //     contextRegExp: /RDKit_minimal$/,
    //   }),
    // ],

module.exports = [
  // {
  //   plugins: [new CopyPlugin({
  //     patterns: [
  //       {
  //         from: path.resolve(__dirname, 'assets', 'rdkit'),
  //         to: path.resolve(__dirname, 'lib'),
  //       },
  //     ],
  //   }),]
  // },
 
  /**
   * Notebook extension
   *
   * This bundle only contains the part of the JavaScript that is run on load of
   * the notebook.
   */
  {
    entry: './src/extension.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'xsmiles', 'nbextension'),
      libraryTarget: 'amd',
      publicPath: '',
    },
    module: {
      rules: rules,
    },
    devtool: 'source-map',
    externals,
    resolve,
    // plugins    
  },

  /**
   * Embeddable xsmiles-ipywidget bundle
   *
   * This bundle is almost identical to the notebook extension bundle. The only
   * difference is in the configuration of the webpack public path for the
   * static assets.
   *
   * The target bundle is always `dist/index.js`, which is the path required by
   * the custom widget embedder.
   */
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'amd',
      library: 'xsmiles-ipywidget',
      publicPath: 'https://unpkg.com/xsmiles-ipywidget@' + version + '/dist/',
    },
    devtool: 'source-map',
    module: {
      rules: rules,
    },
    externals,
    resolve,     
  },

  /**
   * Documentation widget bundle
   *
   * This bundle is used to embed widgets in the package documentation.
   */
  {
    entry: './src/index.ts',
    output: {
      filename: 'embed-bundle.js',
      path: path.resolve(__dirname, 'docs', 'source', '_static'),
      library: 'xsmiles-ipywidget',
      libraryTarget: 'amd',
    },
    module: {
      rules: rules,
    },
    devtool: 'source-map',
    externals,
    resolve,
  },
];
