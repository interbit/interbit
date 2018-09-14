// find all of the coverage reports in /packages/*
// Open each's index.html as a dom object respectively
// parse out the summary line into JSON
// reduce the summary line to create a new totals line based on the sum of the summary fractions and calculated percentages
// get/create a total coverage report template as a DOM
// convert the summary lines into a table of data...
// ... formatted as pass, ok, and fail colours (a la clover)
// ... with a link to each individual coverage report
// ... headings: statements % + fraction, branches, functions, lines
// Insert the totals and the table into the new DOM template
// Write the DOM to index.html file for the final total coverage report

console.log('Generating coverage report...')
