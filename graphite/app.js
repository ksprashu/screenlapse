var http = require('http');
var webshot = require('webshot');
var path = require('path');
var fs = require('fs');
var Dropbox = require('dropbox');
var moment = require('moment');

var location = "graphite";
var dir = location;
var time;

var URL = "http://cryptic-headland-4007.herokuapp.com/trafficmap_graphite.html";
var INTERVAL = 30000;

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
    case Dropbox.ApiError.INVALID_TOKEN:
      // If you're using dropbox.js, the only cause behind this error is that
      // the user token expired.
      // Get the user through the authentication flow again.
      break;

    case Dropbox.ApiError.NOT_FOUND:
      // The file or folder you tried to access is not in the user's Dropbox.
      // Handling this error is specific to your application.
      break;

    case Dropbox.ApiError.OVER_QUOTA:
      // The user is over their Dropbox quota.
      // Tell them their Dropbox is full. Refreshing the page won't help.
      break;

    case Dropbox.ApiError.RATE_LIMITED:
      // Too many API requests. Tell the user to try again later.
      // Long-term, optimize your code to use fewer API calls.
      break;

    case Dropbox.ApiError.NETWORK_ERROR:
      // An error occurred at the XMLHttpRequest layer.
      // Most likely, the user's network connection is down.
      // API calls will not succeed until the user gets back online.
      break;

    case Dropbox.ApiError.INVALID_PARAM:
    case Dropbox.ApiError.OAUTH_ERROR:
    case Dropbox.ApiError.INVALID_METHOD:
    default:
    // Caused by a bug in dropbox.js, in your application, or in Dropbox.
    // Tell the user an error occurred, ask them to refresh the page.
  }
};

var prepareDirectory = function () {
  time = moment.utc().add({hours:5,minutes:30});
  dir = location + '_' + time.format('YYYY-MM-');
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

var startScreenLapse = function () {
  console.log('Screenlapse: starting...');

  setInterval(function () {
    // create a new folder every day 3am IST == 9:30pm UTC
    prepareDirectory();
    captureScreenShot();
  }, INTERVAL);
};

prepareDropbox();
startScreenLapse();
