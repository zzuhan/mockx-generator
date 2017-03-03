process.stdin.resume();
process.on('SIGINT', function() {
  console.log('Got SIGINT. Press Control-D to exit.');
});
process.on('exit', function() {
	console.log('exit');
})

console.log(process.pid);

setInterval(function() {
	console.log(1000);
}, 500);