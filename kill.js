var pid = process.argv[2];
var signal = process.argv[3];

if(!pid) {
	return console.error('请传输pid')
} 

var psTree = require('ps-tree');

var kill = function (pid, signal, callback) {
    signal   = signal || 'SIGINT';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
        	console.log(children);
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { 
                    // 关两次因为现在有两步确认模式
                    console.log('kill ', tpid, signal);
                    process.kill(tpid, signal)
                    process.kill(tpid, signal)
                    process.kill(tpid, 'SIGKILL');
                }
                catch (ex) {
                	console.log(ex);
                }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};

kill(pid, signal);