const express = require('express');
const bodyParser = require('body-parser');
const httpError = require('http-errors');
const {asyncHandler} = require('./async-handler');
const {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser
} = require('./database');

const app = express();

app.use(bodyParser.json());

app.get(
	'/users',
	asyncHandler(async request => {
		if (!request.get('x-i-promise-i-am-user')) {
			throw httpError(401, 'You are not logged in.');
		}
		return getAllUsers();
	})
);

app.get(
	'/users/:id',
	asyncHandler(async request => {
		if (!request.get('x-i-promise-i-am-user')) {
			throw httpError(401, 'You are not logged in.');
		}
		const user = await getSingleUser(request.params.id);
		if (!user) {
			throw httpError(404, 'User not found');
		}
		return user;
	})
);

app.post(
	'/users/:id/update',
	asyncHandler(async request => {
		if (!request.get('x-i-promise-i-am-user')) {
			throw httpError(401, 'You are not logged in.');
		}
		const user = await getSingleUser(request.params.id);
		if (!user) {
			throw httpError(404, 'User not found');
		}
		if (request.get('x-i-promise-i-am-user') !== user.id) {
			throw httpError(403, 'You can only modify your own profile');
		}
		updateUser(request.params.id, request.body);
	})
);

app.delete(
	'/users/:id',
	asyncHandler(async request => {
		if (!request.get('x-i-promise-i-am-user')) {
			throw httpError(401, 'You are not logged in.');
		}
		const user = await getSingleUser(request.params.id);
		if (!user) {
			throw httpError(404, 'User not found');
		}
		if (request.get('x-i-promise-i-am-user') !== user.id) {
			throw httpError(403, 'You can only delete your own profile');
		}
		deleteUser(request.params.id);
	})
);

app.listen(8000);
console.log('Server was started on port 8000');
