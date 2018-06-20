#!/usr/bin/env node

// check for repeated words
const path    = require('path')
const ansi    = require('ansi-escape-sequences')
const color   = ansi.style
const debug   = require('../_debug')
const pattern = new RegExp(/(\b\S+\b)\s+(\b\1\b(?!-))/, "g")

// scan the lines in a file
const scan = (lines) => {
  var results = []
  var counter = 0

  debug.PREFIX = 'RW'

  lines.forEach((line) => {
    counter++

    debug.out(`${counter}: ${line}`)
    if (line.match(pattern)) {
      debug.out(`Repeated word found`)
      var text = line.replace(pattern, (match, p1, p2, offset, string) =>
        `${p1} ${ansi.style.red}${p2}${ansi.style.reset}`
      )

      results.push({ line: counter, text: text })
    }
  })

  return results
}

// provide a report for any results found per file
const report = (results) => {
  Object.keys(results).map((file) => {
    console.log(`${ansi.style.magenta}${file}${ansi.style.reset}`)
    results[file].map((entry) => {
      console.log(`${entry.line}: ${entry.text}`)
    })
  })
}

// Demonstrate this check during direct execution
if (require.main === module) {
  const entries = scan([
    'This is a test test of dupe dupe words',
    'No repeats on this line',
    'One-one two two'
  ])
  const results = {}
  results[path.relative(process.cwd(), __filename)] = entries
  report( results )
}

module.exports = { name: "repeated words", scan, report }
