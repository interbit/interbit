#!/usr/bin/env node

// check spelling
const fs      = require('fs')
const path    = require('path')
const nspell  = require('nspell')
const ansi    = require('ansi-escape-sequences')
const color   = ansi.style
const debug   = require('../_debug')

const dictPath = path.join(__dirname, '..', '..', 'dictionaries')
// prepare the spell contexts
var dictionaries = {
  "interbit": {
    "aff":  fs.readFileSync(
              path.join(dictPath, 'interbit.aff'),
              { encoding: 'utf8' }
            ),
    "dic":  fs.readFileSync(
              path.join(dictPath, 'interbit.dic'),
              { encoding: 'utf8' }
            )
  },
  "english": {
    "aff":  fs.readFileSync(
              path.join(dictPath, 'en_US-large.aff'),
              { encoding: 'utf8' }
            ),
    "dic":  fs.readFileSync(
              path.join(dictPath, 'en_US-large.dic'),
              { encoding: 'utf8' }
            )
  }
}

// create a string left-padded with spaces to match the specified length
function pad (str, chars) {
  if (str.length >= chars) return str
  return str + " ".repeat(chars - str.length)
}

// scan the lines in a file
const scan = (lines) => {
  var results = {}
  var counter = 0
  var spellInterbit = nspell(dictionaries["interbit"])
  var spellEnglish  = nspell(dictionaries["english"])

  debug.PREFIX = 'RW'

  lines.forEach((aline) => {
    counter++

    debug.out(`${counter}: ${aline}`)
    // don't check URLs
    var line = aline.replace(/(ht|f)tps?:\/\/[^ )]+/, '')
    line.split(/[”“’— -\/:-@[-`{-~]+/).map((word) => {
      if (!word || word.match(/^([0-9]+)?$/)) return
      if (!spellEnglish.correct(word)) {
        if (!spellInterbit.correct(word)) {
          debug.out(`'${word}' is misspelled`)
          if (!(word in results)) results[word] = {}
          if (!(counter in results[word])) results[word][counter] = 0
          results[word][counter]++
        }
      }
    })
  })

  return Object.keys(results).length ? [ results ] : []
}

// provide a report for any results found per file
const report = (results) => {
  // gather global results
  var words = {}
  var files = {}

  Object.keys(results).map((file) => {
    var hash = results[file][0]
    Object.keys(hash).map((word) => {
      if (word.match(/^\s*$/)) return

      var subtotal = 0
      Object.keys(hash[word]).map((line) => {
        subtotal += hash[word][line]
      })

      if (!(word in words)) words[word] = {}
      if (!(file in words[word])) words[word][file] = 0
      words[word][file] += subtotal


      if (!(file in files)) files[file] = {}
      if (!(word in files[file])) files[file][word] = 0
      files[file][word] += subtotal
    })
  })

  const wordCount = Object.keys(words).length
  console.log(`${color.red}${color.bold}${wordCount} misspelled words found!${color.reset}`)

  // find max word length
  var maxw = 0
  Object.keys(words).forEach(function (word) {
    var l = word.length
    if (l > maxw) maxw = l
  })
  var indentw = pad(" ", maxw)

  // find max filename length
  var maxf = 0
  Object.keys(files).forEach(function (file) {
    var l = file.length
    if (l > maxf) maxf = l
  })
  var indentf = pad(" ", maxf)

  Object.keys(words).sort().forEach(function (word) {
    var label = pad(word, maxw)
    var fileList = words[word]
    Object.keys(fileList).sort().forEach(function (file) {
      console.log(`${color.red}${label}${color.reset}  ${fileList[file]}x  ${color.magenta}${file}${color.reset}`)
      label = indentw
    })
  })

  console.log(`\n${Object.keys(files).length} file(s) contain misspellings...`)
  Object.keys(files).sort().forEach(function (file) {
    var label = pad(file, maxf)
    var wordList = files[file]
    Object.keys(wordList).sort().forEach(function (word) {
      console.log(`${color.red}${label}${color.reset}  ${wordList[word]}x  ${color.magenta}${word}${color.reset}`)
      label = indentf
    })
  })
}

// Demonstrate this check during direct execution
if (require.main === module) {
  debug.DEBUG = true
  const entries = scan([
    'This is a test. No misspellings here.',
    'wrang wrong wrang wrong',
    'Interbit blockchain should be correct.'
  ])
  const results = {}
  results[path.relative(process.cwd(), __filename)] = entries
  report( results )
}

module.exports = { name: "spelling", scan, report }
