const express = require('express');
const httpProxy = require('http-proxy');

// Create a proxy and listen on port 3000
const proxy = httpProxy.createProxyServer({});
const app = express();
app.get('*', function(req, res) {
  // Prints "Request GET https://httpbin.org/get?answer=42"
  console.log('Request', req.method, req.url);
  proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
});
const server = app.listen(3000);
