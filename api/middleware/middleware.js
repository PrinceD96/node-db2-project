const logger = (req, res, next) => {
	console.log(
		`\n*** Server Logger ***\n 
    Request Method: ${req.method}
    Request URL: ${req.originalUrl}
    TimeStamp: ${new Date(Number(new Date()))}`
	);
	next();
};

module.exports = { logger };
