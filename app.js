var webshot = require('webshot');
var path = require('path');

var express = require('express')
var app = express();

var options = {
  renderDelay: 10000,
  phantomPath : path.join(__dirname, 'vendor/phantomjs/bin/phantomjs')
};

//var TRAFFIC_URL = 'https://cdn.rawgit.com/ksprashu/screenlapse/master/trafficmap_graphite.html';
var TRAFFIC_URL = 'public/trafficmap_graphite.html';
var INTERVAL = 10000;

function screenLapse () {
  setInterval(function () {
    var filename = 'traffic_' + Date.now() + '.png';
    grabScreen(TRAFFIC_URL, filename);
  }, INTERVAL);
}

function grabScreen (url, fileName) {
  console.log('starting...');
  webshot(url, fileName, options,
    function (err) {
      if (err) throw err;
      console.log(fileName + ' ...saved!');
    });
}

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));

  console.log("Starting screenlapse...");
  //grabScreen(TRAFFIC_URL, 'traffic01.png');
  //screenLapse();
});
