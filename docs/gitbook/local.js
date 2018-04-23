var express = require('express');

var app = express();
app.set('port', 4000);

//Pass through authentication router first, then if successful
//pass through to gitbook static pages
app.use(express.static(__dirname + '/_book'))

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

