var Canvas = require('canvas');
var Image = Canvas.Image;
var qrcode = require('jsqrcode')(Canvas);
var http = require('http');
var client = require('ar-drone');

var png = null;

opts = {};

var server = http.createServer(function(req, res) {

  if (!png) {
    png = client.createPngStream({
      log: process.stderr
    });
    png.on('error', function(err) {
      console.error('png stream ERROR: ' + err);
    });
  }

  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=--daboundary'
  });

  png.on('data', sendPng);
  png.on('data', scanForCode);

  function sendPng(buffer) {
    console.log(buffer.length);
    res.write('--daboundary\nContent-Type: image/png\nContent-length: ' + buffer.length + '\n\n');
    res.write(buffer);
  }

  function scanForCode(image) {
    try {
      var result = qrcode.decode(image);
      console.log('result of qr code: ' + result);
    } catch (e) {
      console.log('qr error:', e);
    }
  }

});

server.listen(opts.port || 8000);
