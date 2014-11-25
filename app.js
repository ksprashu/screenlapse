var webshot = require('webshot');

var options = {
  renderDelay: 10000
};

var TRAFFIC_URL = 'http://localhost:8000/trafficmap.html';
var INTERVAL = 1000;

//grabScreen(TRAFFIC_URL, 'traffic01.png');

setInterval(function () {
  var filename = 'traffic_' + Date.now() + '.png';
  grabScreen(TRAFFIC_URL, filename);
}, INTERVAL);

//fs.readFile('trafficmap.html', {encoding: 'utf-8'}, function (err, data) {
//  if (err) throw err;
//  trafficHTML = data;
//  console.log(trafficHTML);
//
//  webshot(trafficHTML, 'traffic.png', options,
//    function (err) {
//      if (err) throw err;
//    });
//});

function grabScreen (url, fileName) {
  webshot(url, fileName, options,
    function (err) {
      if (err) throw err;
      console.log(fileName + ' ...saved!');
    });
}




