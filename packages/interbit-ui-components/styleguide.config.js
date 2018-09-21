const path = require('path')

module.exports = {
  components: 'src/components/**/[A-Z]*.js',
  require: [path.join(__dirname, '/dist/css/interbit.css')],
  assetsDir: path.join(__dirname, '/src/assets'),
  template: 'styleguide/template.html',
  ignore: [
    '**/src/components/Welcome.js',
    '**/src/components/BlockExplorer/**',
    '**/src/components/Covenant/**',
    '**/src/components/FormTable/**',
    '**/src/components/LinkedCovenant/**',
    '**/src/components/ReduxForm/**'
  ]
}
