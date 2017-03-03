var Sudoer = require('electron-sudo').default;
var sudoer = new Sudoer();

var child = null;
var siteSockets = [];

var socketRunning = false;
var mockxRunning = false;

var pathLib = require('path');

// 启动一个socket服务器，面向前端发送信息
function startSocketServer(){
    // if(socketRunning) return;
    // socketRunning = true;

    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    io.on('connection', function(socket){
        siteSockets.push(socket);
        console.log('connected');
    });

    http.listen(3333, function(){
        console.log('listening on *:3333');
    }); 
}

exports.startSocketServer = startSocketServer;

function startMockx(){
    // 启动子服务
    sudoer.spawn('node', [pathLib.join(__dirname, './serve.js')]).then(function (cp) {
        child = cp;

        console.log('start a process ' + cp.pid);

        cp.stdout.on('data', function(data) {
            var outMessage = data.toString();

            // 去除[0m [33m 这些带颜色的标记
            outMessage = outMessage.replace(/\[\d+m/g, '');

            // 如果有连接则输出，否则输出到命令行
            console.log(outMessage);
            
            if(siteSockets.length) {
                siteSockets.forEach(function(socket) {
                    socket.emit('message', {
                        message: outMessage
                    });
                })
            } else {
                
            }
        })

        cp.stderr.on('data', function(data) {
            var outMessage = data.toString();
            console.log(outMessage);
        })

        cp.on('close', function() {
            console.log(arguments);
        })
    });

    // 执行的退出函数
    function exit(){
        console.log('kill child ' + child.pid + ' and it`s child');

        sudoer.spawn('node', [pathLib.join(__dirname, './kill.js'), child.pid]).then(function (cp) {
            process.exit(0);
        });

        child.kill('SIGINT');
    }

    // process.on('SIGINT', exit);
    // process.on('exit', exit);
}

exports.startMockx = startMockx;
// startMockx();
// 
function stop(){
    console.log('kill child ' + child.pid + ' and it`s child');

    sudoer.spawn('node', ['./kill.js', child.pid, 'SIGINT']).then(function (cp) {
        console.log('run done');

        // cp.stdout.pipe(process.stdout);
    });

    // child.kill('SIGINT');
}
exports.stop = stop;

// startMockx();

// setTimeout(function() {
//     stop();  
// }, 10000);