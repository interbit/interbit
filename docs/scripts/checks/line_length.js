#!/usr/bin/env node

// check for line length; long lines makes for awkward diffs
const path    = require('path')
const ansi    = require('ansi-escape-sequences')
const color   = ansi.style
const debug   = require('../_debug')
const pattern = new RegExp(/(\b\S+\b)\s+(\b\1\b(?!-))/, "g")

const maxLength = 80

// scan the lines in a file
const scan = (lines) => {
  var results   = []
  var counter   = 0
  var inSource  = false
  var inYAML    = false
  var inTable   = false
  var yaml      = []
  var delimiter = ''
  var mg

  debug.PREFIX = 'LL'

  lines.forEach((line) => {
    counter++

    debug.out(`${counter}: ${line}`)
    // identify YAML preamble
    if (counter == 1 && line.match(/^---/)) {
      debug.out(`in YAML`)
      inYAML = true
      return
    }

    // identify source blocks
    if (!inSource && (line.match(/\[source[^\]]*\]/) || line.match(/```/))) {
      debug.out(`in source`)
      inSource = true
      return
    }

    // identify Markdown tables
    if (!inTable && line.match(/-+\s*\|\s*-+$/)) {
      debug.out(`in table`)
      inTable = true
      return
    }

    // process YAML preamble
    if (inYAML) {
      if (line.match(/^---/)) {
        inYAML = false
        // need to convert YAML text to object here
        return
      }

      yaml.push(line)
      return
    }

    // process source blocks
    if (inSource) {
      debug.out(`handling source block`)

      // handle Markdown block delimiter
      if (line.match(/```/)) {
        debug.out(`Markdown source ends`)
        inSource = false
        delimiter = ''
        return
      }

      // handle Asciidoctor block delimiter
      if (mg = line.match(/^(-|=)+$/)) {
        debug.out(`matched an Asciidoctor source delimiter`)
        if (delimiter.length > 0 && delimiter == mg[1]) {
          debug.out(`adoc source ends`)
          delimiter = ''
          inSource = false
          return
        }

        if (delimiter == '') {
          debug.out(`no delimiter, so set to ${mg[1]}`)
          delimiter = mg[1]
          return
        }
      }

      // skip source block content
      return
    }

    // process Markdown tables, which require each row to be on a single
    // line
    if (inTable) {
      if (line.match(/^\s*$/)) {
        inTable = false
      }
      return
    }

    // skip titles, as these need to appear on one line
    if (line.match(/^(#|=)+ /)) return

    // skip Asciidoctor links and images; URLs can be quite long
    if (mg = line.match(/(link|image):[^\[]+\[/)) {
      var type = mg[1]
      var skip = true

      if (line.length > maxLength) {
        var text = line.substr(0, maxLength)
        // complain if there's whitespace where a line split could exist
        if (text.match(/:.* /)) {
          skip = false
        }
      }

      if (skip) return
    }

    // skip Markdown URLs for links+images
    if (mg = line.match(/\]\([^\)]+\)/)) {
      var skip = true

      if (line.length > maxLength) {
        var text = line.substr(0, maxLength)
        // complain if there is whitespace before the URL where we could
        // split the line
        if (text.match(/ [^\(]+$/)) {
          skip = false
        }
      }

      if (skip) return
    }

    // skip bare URLs
    if (line.match(/(ht|f)tps?:\/\//)) {
      return
    }

    // capture length violations
    if (line.length > maxLength) {
      results.push({ line: counter, chars: line.length })
    }
  })

  return results
}

// provide a report for any results found per file
const report = (results) => {
  Object.keys(results).map((file) => {
    console.log(`${color.magenta}${file}${color.reset}`)
    results[file].map((entry) => {
      console.log(`${entry.line}: ${entry.chars}/${maxLength}`)
    })
  })
}

// Demonstrate this check during direct execution
if (require.main === module) {
  const entries = scan([
    'This is a short line',
    'This line is much too long for a single line and should be split into multiple lines at the earliest opportunity.',
    '== This line contains an Asciidoctor title, which is too long, but should not be reported because titles must appear on single lines',
    '## This line contains a Markdown title, which is too long, but should not be reported because titles must appear on single lines',
    'A [short Markdown link](#link)',
    'A [really long Markdown link](#link-that-is-far-too-long-but-nevertheless-needs-to-be-ignored-because-we-cannot-do-much-about-it)',
    'A [short Markdown link with very long label text that should be flagged because we can split the line](#link)',
    'A link:#link["short Asciidoctor link"]',
    'A link:#link-that-is-far-too-long-but-nevertheless-needs-to-be-ignored-because-we-cannot-do-much-about-it["really long Asciidoctor link"]',
    'A link:#link["short Asciidoctor link with very long label text that should be flagged because we can split the line"]'
  ])
  const results = {}
  results[path.relative(process.cwd(), __filename)] = entries
  report( results )
}

module.exports = { name: "line lengths", scan, report }
