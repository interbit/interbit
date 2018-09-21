const path = require('path')

const createCoverageReportFromTemplate = coverageReportSummary => {
  const { totalledSummary, summaries } = coverageReportSummary
  return `<!doctype html>
<html lang="en">
<head>
    <title>Code coverage report for All files</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="prettify.css" />
    <link rel="stylesheet" href="base.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type='text/css'>
        .coverage-summary .sorter {
            background-image: url(sort-arrow-sprite.png);
        }
    </style>
</head>
<body>
<div class='wrapper'>
  <div class='pad1'>
    <h1>
      All Packages
    </h1>
    <div class='clearfix'>
      <div class='fl pad1y space-right2'>
        <span class="strong">${totalledSummary.Statements.percent}% </span>
        <span class="quiet">Statements</span>
        <span class='fraction'>${totalledSummary.Statements.numerator}/${
    totalledSummary.Statements.denominator
  }</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">${totalledSummary.Branches.percent}% </span>
        <span class="quiet">Branches</span>
        <span class='fraction'>${totalledSummary.Branches.numerator}/${
    totalledSummary.Branches.denominator
  }</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">${totalledSummary.Functions.percent}% </span>
        <span class="quiet">Functions</span>
        <span class='fraction'>${totalledSummary.Functions.numerator}/${
    totalledSummary.Functions.denominator
  }</span>
      </div>
      <div class='fl pad1y space-right2'>
        <span class="strong">${totalledSummary.Lines.percent}% </span>
        <span class="quiet">Lines</span>
        <span class='fraction'>${totalledSummary.Lines.numerator}/${
    totalledSummary.Lines.denominator
  }</span>
      </div>
    </div>
    <p class="quiet">
      Press <em>n</em> or <em>j</em> to go to the next uncovered block, <em>b</em>, <em>p</em> or <em>k</em> for the previous block.
    </p>
  </div>
  <div class='status-line high'></div>
<div class="pad1">
<table class="coverage-summary">
<thead>
<tr>
   <th data-col="file" data-fmt="html" data-html="true" class="file">File</th>
   <th data-col="pic" data-type="number" data-fmt="html" data-html="true" class="pic"></th>
   <th data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>
   <th data-col="statements_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>
   <th data-col="branches_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>
   <th data-col="functions_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>
   <th data-col="lines_raw" data-type="number" data-fmt="html" class="abs"></th>
</tr>
</thead>
<tbody>
${createTableEntries(summaries)}
</tbody>
</table>
</div><div class='push'></div><!-- for sticky footer -->
</div><!-- /wrapper -->
<div class='footer quiet pad2 space-top1 center small'>
  Code coverage
</div>
</div>
<script src="prettify.js"></script>
<script>
window.onload = function () {
        if (typeof prettyPrint === 'function') {
            prettyPrint();
        }
};
</script>
<script src="sorter.js"></script>
<script src="block-navigation.js"></script>
</body>
</html>
`
}

const createTableEntries = summaries => {
  let tableEntries = ''

  for (const summary of summaries) {
    const { Statements, Branches, Functions, Lines } = summary.summary
    tableEntries += `
<tr>
    <td class="file ${coverageStyle(
      Statements.percent
    )}" data-value="src"><a href="${path.resolve(
      summary.filepath
    )}">${parsePackageName(summary.filepath)}</a></td>
    <td data-value="${Statements.percent}" class="pic ${coverageStyle(
      Statements.percent
    )}"><div class="chart"><div class="cover-fill cover-full" style="width: ${
      Statements.percent
    }%;"></div><div class="cover-empty" style="width:${100 -
      Statements.percent}%;"></div></div></td>
    <td data-value="${Statements.percent}" class="pct ${coverageStyle(
      Statements.percent
    )}">${Statements.percent}</td>
    <td data-value="${Statements.denominator}" class="abs ${coverageStyle(
      Statements.percent
    )}">${Statements.numerator}/${Statements.denominator}</td>
    <td data-value="${Branches.percent}" class="pct ${coverageStyle(
      Branches.percent
    )}">${Branches.percent}</td>
    <td data-value="${Branches.denominator}" class="abs ${coverageStyle(
      Branches.percent
    )}">${Branches.numerator}/${Branches.denominator}</td>
    <td data-value="${Functions.percent}" class="pct ${coverageStyle(
      Functions.percent
    )}">${Functions.percent}</td>
    <td data-value="${Functions.denominator}" class="abs ${coverageStyle(
      Functions.percent
    )}">${Functions.numerator}/${Functions.denominator}</td>
    <td data-value="${Lines.percent}" class="pct ${coverageStyle(
      Lines.percent
    )}">${Lines.percent}</td>
    <td data-value="${Lines.denominator}" class="abs ${coverageStyle(
      Lines.percent
    )}">${Lines.numerator}/${Lines.denominator}</td>
</tr>
  `
  }

  return tableEntries
}

const parsePackageName = filepath => filepath.split('/')[1]

const coverageStyle = percentCoverage => {
  if (percentCoverage >= 80) {
    return 'high'
  }
  if (percentCoverage >= 50) {
    return 'medium'
  }
  return 'low'
}

module.exports = createCoverageReportFromTemplate
