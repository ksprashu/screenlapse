var webshot = require('webshot');

var options = {
  renderDelay: 10000
};

var TRAFFIC_URL = 'https://rawgit.com/ksprashu/screenlapse/master/trafficmap_graphite.html';
var INTERVAL = 20000;

grabScreen(TRAFFIC_URL, 'traffic01.png');

//setInterval(function () {
//  var filename = 'traffic_' + Date.now() + '.png';
//  grabScreen(TRAFFIC_URL, filename);
//}, INTERVAL);

function grabScreen (url, fileName) {
  webshot(url, fileName, options,
    function (err) {
      if (err) throw err;
      console.log(fileName + ' ...saved!');
    });
}




