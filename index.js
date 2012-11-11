var http = require('http');
var client = require('ar-drone');
var util = require("util");
var events = require("events");
var QRcodes = require('qrcode-emitter');

var QRAR = function (client) {
  events.EventEmitter.call(this);
  this.client = client;
};

util.inherits(QRAR, events.EventEmitter);

QRAR.prototype.start = function () {
  var self = this;
  var images = this.client.createPngStream();
  var decoder = new QRcodes(images);

  decoder.on('qrcode', function (code) {
    self.emit('qrcode', code);
  });

  images.on('data', function (image) {
    self.emit('image', image);
  });

  decoder.start();
};

module.exports = QRAR;