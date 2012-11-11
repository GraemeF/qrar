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
  var png = this.client.createPngStream();

  var self = this;
  var decoder = new QRcodes(png);
  decoder.on('qrcode', function (code) {
    self.emit('qrcode', code);
  });

  png.on('data', function (image) {
    self.emit('image', image);
  });

  decoder.start();
};

module.exports = QRAR;