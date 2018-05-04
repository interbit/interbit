const DEFAULT_PORT = 8888

const port = process.env.PORT || DEFAULT_PORT
const nodePort = port + 10
// const authServerPort = port + 20

module.exports = {
  PORT: port,
  AUTH_PORT: port,
  NODE_PORT: nodePort,
  NODE_HOST: `ws://localhost`,
  AUTH_HOST: `http://localhost`
}
