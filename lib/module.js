const path = require('path')

module.exports = function facebookPixelModule (moduleOptions) {
  let userOptions = this.options.facebook ? this.options.facebook : moduleOptions

  const defaults = {
    pixelId: null,
    track: 'PageView',
    version: '2.0',
    disabled: false
  }

  if (!Array.isArray(userOptions)) {
    userOptions = [userOptions]
  }

  let options = []
  for (var i = 0; i < userOptions.length; i++) {
    options.push(Object.assign({}, defaults, userOptions[i]))
  }

  for (var i = 0; i < options.length; i++) {
    if (!options[i].pixelId) throw new Error('The `pixelId` option is required in config #' + i + '.')
  }

  this.addPlugin({
    src: path.resolve(__dirname, './templates/plugin.js'),
    ssr: false,
    options
  })
}

module.exports.meta = require('../package.json')
