exports.errorHandler = (response, err) => {
	const statusCode = err.status || 500;
	response.status(statusCode).json({
		success: false,
		error: err.message
	});
};

exports.successHandler = (response, data) => {
	response.json({
		success: true,
		data
	});
};

exports.asyncHandler = fn => {
	return async function(request, response) {
		try {
			const data = await fn(request, response);
			exports.successHandler(response, data);
		} catch (err) {
			exports.errorHandler(response, err);
		}
	};
};

exports.asyncNextHandler = fn => {
	return async function(request, response, next) {
		try {
			await fn(request, response, next);
		} catch (err) {
			exports.errorHandler(response, err);
		}
	};
};
