module.exports = {
	"domains": ["www.baidu.com"],
	"mockIds": [11, 21, 32, 43],
	"rules": [{
		route: '/mockJSON',
		json: 'jsonfile.json'
	}, {
		route: '/mockFile',
		file: 'file.html'
	}, {
		route: '/mockJsData',
		jsdata: 'jsdata.js'
	}, {
		route: '/',
		remote: 'self'
	}, {
		route: '/s',
		remote: 'self',
		host: 'www.baidu.com'
	}, {
		route: '/mockDipIndex',
		remote: 'https://www.baidu.com'
	// 将某个域名全部映射到本地的8000端口
	}, {

	}],
	// "compare": true,
	"mockDir": "../mock"
}
