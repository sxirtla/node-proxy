var http = require('http');

http.createServer(onRequest).listen(3000);

function onRequest(client_req, client_res) {
	console.log('url: ', client_req.url);

	let hostname = 'api2.splinterlands.com';

	if (client_req.url.includes('displayproxies'))
		hostname = 'api.proxyscrape.com';
	else if (client_req.url.includes('battle_tx'))
		hostname = 'battle.splinterlands.com';
	else if (client_req.url.includes('prices'))
		hostname = 'prices.splinterlands.com';

	var options = {
		hostname: hostname,
		port: 80,
		path: client_req.url,
		method: client_req.method,
		headers: client_req.headers,
	};

	var proxy = http.request(options, function (res) {
		client_res.writeHead(res.statusCode, res.headers);
		res.pipe(client_res, {
			end: true,
		});
	});

	client_req.pipe(proxy, {
		end: true,
	});
}
