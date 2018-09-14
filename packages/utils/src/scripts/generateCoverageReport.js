const glob = require('glob')
const fs = require('fs-extra')
const cheerio = require('cheerio')

// get/create a total coverage report template as a DOM
// convert the summary lines into a table of data...
// ... formatted as pass, ok, and fail colours (a la clover)
// ... with a link to each individual coverage report
// ... headings: statements % + fraction, branches, functions, lines
// Insert the totals and the table into the new DOM template
// Write the DOM to index.html file for the final total coverage report

console.log('Generating coverage report...')

// find all of the coverage reports in /packages/*
// Open each's index.html
const getSummaries = async () => {
  const filepaths = glob.sync('../!(utils)*/coverage/lcov-report/index.html')
  console.log(filepaths)
  const readPromises = []
  for (const filepath of filepaths) {
    readPromises.push(fs.readFile(filepath, { encoding: 'utf8' }))
  }

  const files = await Promise.all(readPromises)
  // console.log(files[0])

  const summaries = parseSummaries(files)

  console.log('summary')
  console.log(JSON.stringify(summaries, null, 2))

  return files
}

// parse out the summary line into JSON
// reduce the summary line to create a new totals line based on the sum of the summary fractions and calculated percentages
const parseSummaries = indices => {
  const summaries = []
  for (const index of indices) {
    const domIndex = cheerio.load(index)

    // get the clearfix element with summary data from inside wrapper
    // parse out span values
    // index spans by type and keep numerator, denomenator, and percent values

    const summary = {}
    let tmp = {}
    domIndex('.wrapper .clearfix')
      .find('div > span')
      .each((i, element) => {
        const domElement = cheerio(element)
        const domData = domElement.html().toString()

        switch ((i + 1) % 3) {
          case 0: {
            const fraction = domData.split('/')
            tmp.numerator = fraction[0]
            tmp.denominator = fraction[1]
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
    summaries.push(summary)
  }
  return summaries
}

getSummaries()
