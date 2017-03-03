#!/usr/bin/env node

// 1 生成flex-hosts.json文件
// 2 编写启动clam的工具

// 这些相对位置，应该都是当前的执行命令行所在的位置

// 1 先查80端口占用
// 2 关闭80端口占用应用
// 3 启动应用


var cwd = process.cwd();
var path = require('path');
const exec = require('child_process').exec;

var config = require(path.join(__dirname, 'config/mockx.js'));

var fs = require('fs');

// 1 生成一份flex-hosts写入
// 2 生成一份脚本
// exec('sudo lsof -i:80');

function run(){
	genHosts(config.domains);
	runServer();
}

function genHosts(domains){
	domains = domains || [];

	var hostsCode = '{"127.0.0.1": ["' +  domains.join('","') + '"] }';

	fs.writeFileSync(path.join(__dirname, 'config/flex-hosts.json'), hostsCode);
}

function runServer(){
	// var serverProcess = exec('sudo node serve.js');
	// serverProcess.stdout.pipe(process.stdout);
	var config_dir = path.join(__dirname, "./config");

	var server = require("plug-base");
	server.root("src"); server.config(config_dir);

	var mockx = require("mockx");
	server.plug(mockx).listen(80, 443);
}

run();

process.stdin.resume();
process.on('exit', function(code, signal) {
	console.log('something');
	console.log(signal);
});
process.on('SIGINT', function() {
  console.log('Got SIGINT. Press Control-D to exit.');
});