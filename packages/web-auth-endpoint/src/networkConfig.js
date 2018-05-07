const DEFAULT_PORT = 8888

const PORT = process.env.PORT || DEFAULT_PORT

module.exports = {
  PORT,
  AUTH_PORT: PORT,
  NODE_PORT: undefined, // Don't bind to a port for incoming requests
  NODE_HOST: `ws://localhost`,
  AUTH_HOST: `http://localhost`
}
