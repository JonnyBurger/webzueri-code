const express = require('express');
const bodyParser = require('body-parser');
const httpError = require('http-errors');
const {asyncHandler, asyncNextHandler} = require('./async-handler');
const {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser
} = require('./database');

const app = express();

app.use(bodyParser.json());

app.use(
	asyncNextHandler(request => {
		if (!request.get('x-i-promise-i-am-user')) {
			throw httpError(401, 'You are not logged in.');
		}
	})
);

app.get('/users', asyncHandler(() => getAllUsers()));

app.use(
	'/users/:id',
	asyncNextHandler(async request => {
		const user = await getSingleUser(request.params.id);
		if (!user) {
			throw httpError(404, 'User not found');
		}
		request.user = user;
	})
);

app.get('/users/:id', asyncHandler(request => request.user));

app.use(
	asyncNextHandler(request => {
		if (request.get('x-i-promise-i-am-user') !== request.user.id) {
			throw httpError(403, 'You can only modify your own profile');
		}
	})
);

app.post(
	'/users/:id/update',
	asyncHandler(request => updateUser(request.params.id, request.body))
);

app.delete(
	'/users/:id',
	asyncHandler(request => deleteUser(request.params.id))
);

app.listen(8000);
console.log('Server was started on port 8000');
