const glob = require('glob')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const path = require('path')

const createCoverageReportFromTemplate = require('./coverageReportFromTemplate')

console.log('Generating coverage report...')

// find all of the coverage reports in /packages/*
// Open each's index.html
const generateCoverageReport = async () => {
  const filepaths = glob.sync(
    '../!(utils|interbit-test|interbit-e2e)*/coverage/lcov-report/index.html'
  )
  console.log(filepaths)

  const readPromises = []
  for (const filepath of filepaths) {
    readPromises.push(readFile(filepath))
  }

  const files = await Promise.all(readPromises)
  // console.log(files[0])

  const summaries = parseSummaries(files)

  console.log('summary')
  console.log(JSON.stringify(summaries, null, 2))

  const coverageReport = createCoverageReportFromTemplate(summaries)

  fs.writeFile('coverage-total/index.html', coverageReport, 'utf8')
  const templatesFilepaths = glob.sync('./src/templates/*')
  const copyPromises = []
  for (const filepath of templatesFilepaths) {
    copyPromises.push(
      fs.copyFile(
        filepath,
        path.join(__dirname, '../../coverage-total', path.parse(filepath).base)
      )
    )
  }

  return summaries
}

const readFile = filepath =>
  new Promise((resolve, reject) => {
    fs.readFile(filepath, { encoding: 'utf8' }, (err, file) => {
      if (err) {
        reject(err)
      }

      resolve({
        filepath,
        file
      })
    })
  })

// parse out the summary line into JSON
// reduce the summaries to create a new totals line based on the sum of the summary fractions and calculated percentages
const parseSummaries = indices => {
  const summaries = []
  for (const index of indices) {
    const summary = {
      filepath: index.filepath,
      summary: parseSummary(index.file)
    }
    summaries.push(summary)
  }

  const totalledSummary = summaries.reduce(
    (accum, summary) => ({
      Statements: total(accum.Statements, summary.summary.Statements),
      Branches: total(accum.Branches, summary.summary.Branches),
      Functions: total(accum.Functions, summary.summary.Functions),
      Lines: total(accum.Lines, summary.summary.Lines)
    }),
    {}
  )

  return {
    totalledSummary,
    summaries
  }
}

const total = (
  accumTotals = { numerator: 0, denominator: 0, percent: 0 },
  thisSummary
) => {
  const numerator = accumTotals.numerator + thisSummary.numerator
  const denominator = accumTotals.denominator + thisSummary.denominator
  const percent = (numerator / denominator) * 100

  return {
    name: thisSummary.name,
    percent: percent.toFixed(2),
    numerator,
    denominator
  }
}

const parseSummary = index => {
  // get the clearfix element with summary data from inside wrapper
  // parse out span values
  // index spans by type and keep numerator, denominator, and percent values
  const summary = {
    filepath: ''
  }
  let tmp = {}

  const domIndex = cheerio.load(index)
  domIndex('.wrapper .clearfix')
    .find('div > span')
    .each((i, element) => {
      const domElement = cheerio(element)
      const domData = domElement.html().toString()

      switch ((i + 1) % 3) {
        case 0: {
          const fraction = domData.split('/')
          tmp.numerator = parseInt(fraction[0], 10)
          tmp.denominator = parseInt(fraction[1], 10)
          summary[tmp.name] = {
            ...tmp
          }
          tmp = {}
          break
        }

        case 1: {
          const percent = parseFloat(domData)
          tmp.percent = percent
          break
        }

        case 2:
          tmp.name = domData
          break

        default:
          break
      }
    })

  return summary
}

generateCoverageReport()
