const axios = require('axios');

//212.58.121.217

axios
	.get('http://api2.splinterlands.com/players/details?name=altryx', {
		proxy: {
			protocol: 'http',
			host: 'localhost',
			port: 3000
		},
	})
	.then((x) => console.log(x.data))
	.catch((e) => console.log(e.message));
