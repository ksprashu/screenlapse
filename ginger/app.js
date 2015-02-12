var http = require('http');
var webshot = require('webshot');
var path = require('path');
var fs = require('fs');
var Dropbox = require('dropbox');
var moment = require('moment');

var dir = "ginger";
var time;

var URL = "http://cryptic-headland-4007.herokuapp.com/trafficmap_ginger.html";
var INTERVAL = 30000;

var START_HOUR = "07";
var END_HOUR = "23";

var options = {
  //streamType: 'png',
  windowSize: { width: 1440, height: 900 },
  renderDelay: 10000,
  //timeout: 5000,
  phantomPath: path.join(__dirname, 'vendor/phantomjs/bin/phantomjs')
};

var isAuthenticated = false;
var client;

var boxapp = {
  key: 'kgjf2o30gx84z0o',
  secret: 'ghfz9vobw03wo3g',
  token: 'ORJ9RUVuXEwAAAAAAAADJ94YcEAN4-pXEwAG1gOnWzGXKH9AMNZNHbuKyHago-W4',
  sandbox: false
};

var prepareDropbox = function() {
  client = new Dropbox.Client({
    key: boxapp.key,
    secret: boxapp.secret,
    token: boxapp.token,
    sandbox: boxapp.sandbox
  });

  client.authenticate(function(error, client) {
    console.log('Dropbox: Trying to authenticate...');

    if (error) {
      console.log('Dropbox: Authentication failed!');
      return showError(error);
    }

    if (client.isAuthenticated()) {
      console.log('Dropbox: Authentication success!');
      isAuthenticated = true;
    } else {
      console.log('Dropbox: Please re-authenticate!');
    }
  });
};

var showError = function(error) {
  switch (error.status) {
    console.log('Dropbox: Error with status = ' + error.status);
  }
};

var prepareDirectory = function () {
  time = moment.utc().add({hours:5,minutes:30});
  dir = dir + '_' + time.format('YYYY-MM-');
  if (time.hour() < 3)
    dir = dir + (time.date() - 1);
  else
    dir = dir + time.date();

  //fs.exists(dir, function(exists) {
  //  if (!exists) {
  //    fs.mkdir(dir, function() {
  //      console.log('using dir ' + dir + '.');
  //    });
  //  }
  //});
};

var captureScreenShot = function () {
  var fileName = dir + '/' + time.format('YYYYMMDD_HHmmss') + '.png';

  webshot(URL, options, function (err, renderStream) {
    if (err) console.log(err);

    //var file = fs.createWriteStream(fileName, {encoding: 'binary'});
    var fileData = [];

    renderStream.on('data', function (chunk) {
      //file.write(chunk.toString('binary'), 'binary');
      fileData.push(chunk);
    });

    renderStream.on('end', function () {
      console.log("Screenlapse: " + fileName + ' ...downloaded!');

      client.writeFile(fileName, Buffer.concat(fileData), function (error, stat) {
        if (error)
          console.log("Dropbox: error writing file with status -> " + error.status);
        else
          console.log("DropBox: " + fileName + ' ...written!');
      });

      fileData = [];
    });
  });
};

var isTimeForCapture = function () {
  time = moment.utc().add({hours: 5, minutes: 30});

  if (time.hour() > START_HOUR && time.hour() < END_HOUR)
    return true;
  else
    return false;
}

var startScreenLapse = function () {
  console.log('Screenlapse: starting...');

  setInterval(function () {
    // create a new folder every day 3am IST == 9:30pm UTC
    if (isTimeForCapture()) {
      prepareDirectory();
      captureScreenShot();
    }
  }, INTERVAL);
};

prepareDropbox();
startScreenLapse();
