const createNwbWebpackConfig = require('create-nwb-webpack-config')
const path = require('path')

module.exports = {
  webpackConfig: createNwbWebpackConfig(),
  components: 'src/components/**/[A-Z]*.js',
  require: [path.join(__dirname, 'src/css/interbit.css')],
  assetsDir: 'src/assets',
  template: 'styleguide/template.html',
  ignore: ['**/src/components/Welcome.js']
}
