const { create, getArg } = require('interbit')

const run = async () => {
  const options = {
    appName: getArg(process.argv, '--name'),
    location: process.cwd()
  }

  if (!options.appName) {
    console.error('interbit create: --name option must be provided')
    process.exit(1)
  }

  try {
    await create(options)
    console.log(
      `interbit create: Successfully created new Interbit app ${
        options.appName
      }!`
    )
  } catch (e) {
    console.error(`interbit create: ERROR ${e}`)
    process.exit(1)
  }
}

run()
