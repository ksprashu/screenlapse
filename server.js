/**
 * Created by i031007 on 30/11/14.
 */

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Nothing here!')
});

app.listen(app.get('port'), function() {
  console.log("Trafficmap server is running on port : " + app.get('port'));
});
