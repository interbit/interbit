const DEFAULT_PORT = 8888

const PORT = process.env.PORT || DEFAULT_PORT

module.exports = {
  PORT,
  AUTH_PORT: PORT,
  NODE_PORT: PORT + 1 > 65535 ? 5 : PORT + 1,
  NODE_HOST: `ws://localhost`,
  AUTH_HOST: `http://localhost`
}
