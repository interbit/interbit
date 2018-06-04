const { getArg, keys } = require('interbit')

const run = async () => {
  const options = {
    filename: getArg(process.argv, '--filename')
  }

  if (!options.filename) {
    console.error(
      '"interbit keys" command must be used with a --filename option'
    )
    process.exit(1)
  }

  try {
    await keys(options)
  } catch (e) {
    console.error(`interbit keys: ERROR ${e}`)
    process.exit(1)
  }
}

run()
