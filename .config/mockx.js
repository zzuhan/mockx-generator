module.exports = {
	"domains": [],
	// 将来对接mock平台的项目id, 暂时未开放
	"mockIds": [],
	"projectId": 4,
	"rules": [{
		route: '/mockJSON',
		json: 'jsonfile.json'
	}, {
		route: '/mockFile',
		file: 'file.html'
	}, {
		route: '/mockJsData',
		jsdata: 'jsdata.js'
	}],
	// "compare": true,
	"mockDir": "../mock"
}
