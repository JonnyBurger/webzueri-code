const express = require('express');

const app = express();

app.get('/hello', (request, response) => {
	throw new Error('404 not found');
});

app.listen(8000);
console.log('Server has started on port 8000');
