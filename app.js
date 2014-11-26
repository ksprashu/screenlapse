var webshot = require('webshot');
var path = require('path');
//var mkdirp = require('mkdirp');

var options = {
  renderDelay: 10000,
  timeout: 20000,
  phantomPath: path.join(__dirname, 'vendor/phantomjs/bin/phantomjs')
};

var URL = "http://cryptic-headland-4007.herokuapp.com/trafficmap_graphite.html";
var INTERVAL = 60000;

console.log('starting screenlapse...');

setInterval(function () {
  var d = Date.now();

  // create a new folder every day 3am IST == 9:30pm UTC

  //var dirName = d.getUTCFullYear() + '-' + d.getUTCMonth() + '-' + d.getUTCDate();
  var fileName = 'traffic_' + d + '.png';


  webshot(URL, fileName, options, function (err) {
      if (err) console.log(err);
      console.log(fileName + ' ...saved!');
    });
}, INTERVAL);
