export function responseInterceptor(req, res, next) {
	var originalSend = res.send;

	res.send = function () {
		arguments[0] = JSON.stringify(arguments[0]);
		originalSend.apply(res, arguments);
	};
	next();
}

export function errorHandler(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send({ error: err.message });
}

export function responseModifier (req, res, next) {
	res.header("Content-Type", 'application/json');
	next();
}