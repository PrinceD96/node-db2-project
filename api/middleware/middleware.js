const logger = (req, res, next) => {
	console.log(
		`\n*** Server Logger ***\n 
    Request Method: ${req.method}
    Request URL: ${req.originalUrl}
    TimeStamp: ${new Date(Number(new Date()))}`
	);
	next();
};

const validateId = (db, tableName) => (req, res, next) => {
	const { id } = req.params;

	db(`${tableName}`)
		.where({ id })
		.first()
		.then((response) => {
			response
				? (req.response = response)
				: res.status(400).json({ message: "Invalid Id" });
			next();
		})
		.catch((error) =>
			res.status(500).json({ message: "Could not validate", error })
		);
};

const validateCar = (req, res, next) => {
	const car = req.body;

	JSON.stringify(car) === "{}"
		? res.status(400).json({ message: "missing car data" })
		: !car.VIN || !car.make || !car.model || !car.mileage
		? res.status(400).json({
				message: `missing required ${
					!car.VIN
						? "VIN"
						: !car.make
						? "make"
						: !car.model
						? "model"
						: !car.mileage
						? "mileage"
						: null
				} field`
		  })
		: (req.response = car);
	next();
};

module.exports = { logger, validateId, validateCar };
