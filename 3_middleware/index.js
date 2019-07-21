const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const {asyncHandler} = require('./async-handler');
const {getAllUsers, getUser, updateUser, deleteUser} = require('./database');

const app = express();

app.use(bodyParser.json());

app.get(
	'/users',
	asyncHandler(async (request, response) => {
		return getAllUsers();
	})
);

app.get(
	'/users/:id',
	asyncHandler(async (request, response) => {
		return getUser(request.params.id);
	})
);

app.post(
	'/users/:id/update',
	asyncHandler(async (request, response) => {
		updateUser(request.params.id, request.body);
	})
);

app.delete(
	'/users/:id',
	asyncHandler(async (request, response) => {
		if (!request.get('x-i-promise-i-am-user')) {
			throw createError(401, 'You are not logged in.');
		}
		const user = await getUser(request.params.id);
		if (!user) {
			throw createError(404, 'User not found');
		}
		if (request.get('x-i-promise-i-am-user') !== user.id) {
			throw createError(403, 'You can only delete your own profile');
		}
		deleteUser(request.params.id);
	})
);

app.listen(8000);
console.log('Server was started on port 8000');
