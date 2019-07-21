const express = require('express');
const {asyncHandler} = require('./async-handler');

const app = express();

app.get(
	'/hello',
	asyncHandler(() => {
		return {
			hello: 'world'
		};
	})
);

app.listen(8000);
console.log('Started server on port 8000');
