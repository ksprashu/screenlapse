var webshot = require('webshot');
var path = require('path');

var options = {
  renderDelay: 10000,
  phantomPath : path.join(__dirname, 'vendor/phantomjs/bin/phantomjs')
};

var TRAFFIC_URL = "https://cryptic-headland-4007.herokuapp.com/trafficmap_graphite.html";
//var TRAFFIC_URL = 'public/trafficmap_graphite.html';
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
      if (err) console.log(err);
      console.log(fileName + ' ...saved!');
    });
}

grabScreen(TRAFFIC_URL, 'traffic01.png');
//screenLapse();
