#!/usr/bin/env node

/*
1 生成flex-hosts.json文件
2 编写启动clam的工具

这些相对位置，应该都是当前的执行命令行所在的位置

1 先查80端口占用
2 关闭80端口占用应用
3 启动应用
*/

'use strict'
const fs = require('fs')
const path = require('path')

class Init {
  constructor () {
    this.mockx = require('mockx')
    this.mockxFile = path.resolve(__dirname, '.config')
    this.config = require(`${this.mockxFile}/mockx`)
    this.server = require('plug-base')
  }

  run () {
    if (process.getuid() !== 0) {
      throw new Error('请使用 sudo 权限运行！')
    }
    this.genHosts(this.config.domains)
    this.runServer()
  }

  genHosts (domains) {
    domains = domains || []
    const hostsCode = {
      '127.0.0.1': domains
    }

    fs.writeFileSync(`${this.mockxFile}/flex-hosts.json`, JSON.stringify(hostsCode))
  }

  runServer () {
    this.server.root('src')
    this.server.config(this.mockxFile)
    this.server.plug(this.mockx).listen(80, 443)
  }
}

new Init().run()
