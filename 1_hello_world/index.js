const express = require('express');

const app = express();

app.get('/hello', async (request, response) => {
	throw new Error('unauthenticated - you need to log in');
	response.json({
		hello: 'world'
	});
});

app.listen(8000);
console.log('App started on port 8000');
