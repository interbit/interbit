const cleanEnvVar = s => s.replace(/\\r\\n/g, '\r\n').replace(/\\n/g, '\n')

module.exports = {
  publicKey: cleanEnvVar(process.env.PUBLIC_KEY),
  privateKey: cleanEnvVar(process.env.PRIVATE_KEY)
}
