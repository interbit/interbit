const getArg = (argv, argName) => {
  const argIndex = argv.indexOf(argName) + 1
  const isArgAvailable = argIndex > 0 && argv.length > argIndex

  return isArgAvailable ? argv[argIndex] : undefined
}

const getArgs = (argv, argName) => {
  const argIndex = argv.indexOf(argName) + 1
  const isArgAvailable = argIndex > 0 && argv.length > argIndex

  if (!isArgAvailable) {
    return []
  }

  const args = []
  for (let i = argIndex; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      break
    }
    args.push(arg)
  }
  return args
}

const isArg = (argv, argName) => {
  const argIndex = argv.indexOf(argName)
  return argIndex > -1
}

module.exports = {
  getArg,
  getArgs,
  isArg
}
