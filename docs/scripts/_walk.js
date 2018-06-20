// A customized version of the walk-folder-tree module
// that includes the ability to skip paths

var pathModule = require('path')
var Promise = require('bluebird')
var promisify = require('promisify-any')
var fs = require('fs-extra-promise')
var _ = require('lodash')

module.exports = function(path, options, fn) {
  // conform arguments
  // allow ({path: [path]}, fn)
  if (typeof path != 'string') {
    fn      = options
    options = path
    path    = undefined
  }

  // allow (path, fn, options) for backward-compatibility
  if (typeof options == 'function') {
    var tmp = fn
    fn      = options

    if (tmp) {
      console.log('WARNING: walk-folder-tree module: walk(path, fn, options) argument order is deprecated. Support may be removed in later versions. Use (path, options, fn) instead')
      options = tmp
    }
  }

  // allow ({path: [path], fn: [fn]})
  if (!options) options = {}
  if (!path) {
    path = options.path
    if (!path) throw new Error('`path` must be provided')
  }
  if (!fn) fn = options.fn

  // conform options
  options = _.extend({
    recurse: true,
    filterFiles: /^[^.]/,
    skip: /.^/,
    "return": false
    //sort: undefined
  }, options)

  if (!options.filterFolders) options.filterFolders = options.filterFiles

  // convert fn to promise-returning function
  if (fn) fn = promisify(fn, 1)

  // process directory's contents
  var files
  if (options.return) files = []

  return processFiles('')
  .then(function() {
    return files
  })

  function processFiles(folderPath) {
    var folders = []

    // iterate through directory contents
    return fs.readdirAsync(pathModule.join(path, folderPath))
    .then(function(files) {
      return files.sort(options.sort)
    })
    .each(function(filename) {
      var filePath = pathModule.join(folderPath, filename)
      var fullPath = pathModule.join(path, filePath)

      return fs.statAsync(fullPath)
      .then(function(stat) {
        // process file/folder
        var isDir  = stat.isDirectory()
        var filter = isDir ? options.filterFolders : options.filterFiles
        var skip   = options.skip ? options.skip : /.^/

        if (!filename.match(filter)) return
        if (filename.match(skip)) return

        if (isDir && options.recurse) folders.push(filePath)

        var params = {
          path:       filePath,
          fullPath:   fullPath,
          name:       filename,
          directory:  isDir,
          stat:       stat
        }

        if (options.return) files.push(params)

        if (fn) return fn(params)
      })
    })
    .then(function() {
      // process folders
      return Promise.each(folders, processFiles)
    })
  }
}
