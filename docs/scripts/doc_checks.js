#!/usr/bin/env node
// check repeated words
// - walks the specified directory tree to find doc source files
// - investigates the contents of each file for repeated words on a line

const fs         = require('fs-extra-promise')
const path       = require('path')
const walk       = require('./_walk')
const ansi       = require('ansi-escape-sequences')
const color      = ansi.style

// load foc checks
const checkPath = path.join(__dirname, 'checks')
const checks    = {}
fs.readdirSync(checkPath).forEach((check) => {
  checks[check] = require(path.join(checkPath, check))
})

// process arguments
var argv = require('minimist')(process.argv.slice(2))
var docPath = path.join(__dirname, '..', 'gitbook')
if ('d' in argv) docPath = argv['d']
if ('docPath' in argv) docPath = argv['docPath']

if (!fs.existsSync(docPath)) {
  console.log(`${docPath} does not exist!`)
  process.exit(1)
}

if (!fs.statSync(docPath).isDirectory()) {
  console.log(`${docPath} is not a directory!`)
  process.exit(1)
}

var find = /\.(md|adoc)/
if ('f' in argv) find = new RegExp(argv['f'])
if ('find' in argv) find = new RegExp(argv['find'])

var skip = /(_book|node_modules)/
if ('s' in argv) skip = new RegExp(argv['s'])
if ('skip' in argv) skip = new RegExp(argv['skip'])

const debug = require('./_debug')
if ('v' in argv) debug.DEBUG = true
if ('verbose' in argv) debug.DEBUG = true

var results = {}
var problems = false

console.log(`${color.bold}Checking doc content...${color.reset}`)

walk(docPath,
  {
    filterFiles: find,
    filterFolders: /^[^\.]/,
    skip: skip,
    recurse: true,
    "return": true
  }
)
.then((files) => {
  files.map((file) => {
    if (file.directory) return

    const relPath = path.relative(process.cwd(), file.fullPath)
    debug.PREFIX = 'DC'
    debug.out(`Processing file: ${file.fullPath}`)
    var lines = fs.readFileSync(file.fullPath, { encoding: 'utf8' })
      .split(/\r?\n/)
    Object.keys(checks).map((check) => {
      result = checks[check].scan(lines)
      if (result.length) {
        if (!results[check]) results[check] = {}
        results[check][relPath] = result
        problems = true
      }
    })
  })
})
.catch((err) => {
  console.log("Caught an error! ", err)
})
.finally(() => {
  Object.keys(checks).map((check, index) => {
    console.log(`${color.bold}Checking for ${checks[check].name}...${color.reset}`)
    if (results[check] && Object.keys(results[check]).length) {
      checks[check].report(results[check])
    }
    else {
      console.log(`${color.green}${color.bold}No ${checks[check].name} problems found!${color.reset}`)
    }
    console.log('')
  })

  console.log(`${color.bold}Checks complete`)
  if (problems) {
    console.log(`${color.red}Problems detected! Aborting.${color.reset}`)
    process.exit(1)
  }
  console.log(`${color.green}No problems detected!${color.reset}`)
})

