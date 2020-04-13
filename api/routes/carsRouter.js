const express = require("express");

const db = require("../../data/db-config");

const router = express.Router();

router.get("/", (req, res) => {
	db("cars")
		.then((cars) => res.status(200).json(cars))
		.catch((error) =>
			res.status(500).json({ message: "Error retrieving cars", error })
		);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;

	db("cars")
		.where({ id })
		.first()
		.then((car) =>
			car
				? res.status(200).json(car)
				: res.status(404).json({ message: `Car with id ${id} not found` })
		)
		.catch((error) =>
			res.status(500).json({ message: "Error retrieving car", error })
		);
});

router.post("/", (req, res) => {
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
		: db("cars")
				.insert(car)
				.then((car) => res.status(201).json(car));
});

module.exports = router;
