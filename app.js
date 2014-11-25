var webshot = require('webshot');
var path = require('path');

var options = {
  renderDelay: 10000,
  phantomPath : path.join(__dirname, 'vendor/phantomjs/bin/phantomjs')
};

//var TRAFFIC_URL = 'https://cdn.rawgit.com/ksprashu/screenlapse/master/trafficmap_graphite.html';
var TRAFFIC_URL = 'http://localhost:8000/trafficmap_graphite.html';
var INTERVAL = 60000;

//grabScreen(TRAFFIC_URL, 'traffic01.png');

setInterval(function () {
  var filename = 'traffic_' + Date.now() + '.png';
  grabScreen(TRAFFIC_URL, filename);
}, INTERVAL);

function grabScreen (url, fileName) {
  console.log('starting...');
  webshot(url, fileName, options,
    function (err) {
      if (err) throw err;
      console.log(fileName + ' ...saved!');
    });
}




