const express = require('express');
const httpProxy = require('http-proxy');

// Create a proxy and listen on port 3000
const proxy = httpProxy.createProxyServer();
const app = express();
app.get('*', function (req, res) {
	console.log('Request', req.method, req.url, req.protocol);
	proxy.web(req, res, { target: `http://${req.hostname}` });
});
app.listen(3000);

const axios = require('axios');
axios
	.get('https://api2.splinterlands.com/players/details?name=altryx', {
		// `proxy` means the request actually goes to the server listening
		// on localhost:3000, but the request says it is meant for
		// 'http://httpbin.org/get?answer=42'
		proxy: {
			host: 'localhost',
			port: 3000,
		},
	})
	.then((x) => console.log(x.data))
	.catch((e) => console.log(e.message));

// var http = require('http');

// http.createServer(onRequest).listen(3000);

// function onRequest(client_req, client_res) {
// 	console.log('url: ', client_req.url);

// 	var options = {
// 		hostname: 'api2.splinterlands.com',
// 		port: 80,
// 		path: client_req.url,
// 		method: client_req.method,
// 		headers: client_req.headers,
// 	};

// 	var proxy = http.request(options, function (res) {
// 		client_res.writeHead(res.statusCode, res.headers);
// 		res.pipe(client_res, {
// 			end: true,
// 		});
// 	});

// 	client_req.pipe(proxy, {
// 		end: true,
// 	});
// }
