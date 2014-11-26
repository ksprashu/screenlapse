var webshot = require('webshot');
var path = require('path');

var options = {
  renderDelay: 10000,
  phantomPath : path.join(__dirname, 'vendor/phantomjs/bin/phantomjs')
};

var URL = "https://cryptic-headland-4007.herokuapp.com/trafficmap_graphite.html";
var INTERVAL = 10000;

setInterval(function () {
  var fileName = 'traffic_' + Date.now() + '.png';
  webshot(URL, fileName, options,
    function (err) {
      if (err) console.log(err);
      console.log(fileName + ' ...saved!');
    });
}, INTERVAL);
