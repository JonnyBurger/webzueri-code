let data = require('./data');

const delayForHalfASecond = () => {
	return new Promise(resolve => setTimeout(resolve, 500));
};

exports.getAllUsers = async () => {
	await delayForHalfASecond();
	return data;
};

exports.getSingleUser = async id => {
	await delayForHalfASecond();
	return data.find(user => user.id === id);
};

exports.updateUser = async (id, update) => {
	await delayForHalfASecond();
	data = data.map(user => {
		if (user.id === id) {
			return {
				...user,
				...update
			};
		}
		return user;
	});
	return exports.getSingleUser(id);
};

exports.deleteUser = async id => {
	await delayForHalfASecond();
	data = data.filter(user => user.id !== id);
};
