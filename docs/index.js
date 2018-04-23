var express = require('express')
var sslRedirect = require('heroku-ssl-redirect')

var app = express()
app.set('port', (process.env.PORT || 4000))

// Handles HTTP to HTTPS redirection (Heroku only, not for local)
app.use(sslRedirect(['production']))

app.use(express.static(__dirname + '/gitbook/_book'))

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
