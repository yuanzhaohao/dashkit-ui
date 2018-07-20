'use strict'
const path = require('path')
const glob = require('glob')

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir || '')
}

exports.getEntry = function(globPath) {
  const files = glob.sync(path.join(globPath, './*.js'))
  const entries = {}

  files.forEach(filepath => {
    const name = filepath.replace(/(.*\/)*([^.]+).*/ig, '$2')
    if (name && !entries[name]) {
      entries[name] = filepath
    }
  })

  return entries
}
