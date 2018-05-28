import request from 'request'

// Get some truly random number from random.org, which sources their randomness 
// from atmospheric data
const randomURL = 'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new'

export default () => {
  return new Promise((resolve, reject) => {
    request.get(randomURL, (error, response, body) => {
      if (error) {
        reject(error)
      }
      resolve(body)
    })
  })
}
