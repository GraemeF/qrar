# qrar

You can use this package to decode any QR codes spotted by your [Parrot AR.Drone](http://ardrone2.parrot.com/)'s camera.

## Example

This program outputs all of the decoded QR codes to the console:

```javascript
var QRAR = require('qrar');
var drone = require('ar-drone');

var codes = new QRAR(drone);

codes.on('qrcode', function (code) {
  console.log(code);
});

codes.start();
```

This program starts an ar-drone REPL:

```javascript
var arDrone = require('ar-drone');
arDrone.createClient().createRepl();
```

So if you pipe the output of the first program (decode.js) to the second (repl.js):

```bash
node decode.js | node repl.js
```

Then you can show QR codes like these to your drone and it will obey!

### takeoff()
![takeoff()](http://api.qrserver.com/v1/create-qr-code/?data=takeoff\(\)&size=250x250)

### land()
![land()](http://api.qrserver.com/v1/create-qr-code/?data=landi\(\)&size=250x250)

See felixge/node-ar-drone for the available commands. There are lots of free QR code generators online that work from a smartphone (in fact you can just tweak the above image URLs to get started).
