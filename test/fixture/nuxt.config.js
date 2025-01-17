const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    ['@@', [{
      pixelId: 'PIXEL_CODE'
    }, {
      pixelId: 'PIXEL_CODE2'
    }]]
  ],
  babel: {
    presets: [
      'es2015',
      'stage-0'
    ],
    plugins: [
      'transform-runtime'
    ]
  }
}
