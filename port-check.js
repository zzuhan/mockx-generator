var isPortTaken = function(port, fn) {
  var net = require('net')
  var tester = net.createServer()
  .once('error', function (err) {
    if (err.code != 'EADDRINUSE') return fn(err)
    fn(null, true)
  })
  .once('listening', function() {
    tester.once('close', function() { fn(null, false) })
    .close()
  })
  .listen(port)
}

isPortTaken(80, function(inUse) {
  if(inUse) {
    console.log('端口被占用');
  } else {
    console.log('未被占用');
  }
})