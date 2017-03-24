module.exports = {
  domains: ['g.alicdn.com'],
  mockIds: [],
  projectIds: ['4', '6', '7'],
  rules: [{
    route: '/mockJSON',
    json: 'jsonfile.json'
  }, {
    route: '/mockFile',
    file: 'file.html'
  }, {
    route: '/mockJsData',
    jsdata: 'jsdata.js'
  }],
  mockDir: '../mock'
}
