const express = require("express");

const db = require("../../data/db-config");
const { validateId, validateCar } = require("../middleware/middleware");

const router = express.Router();

// Endpoints
router.get("/", (req, res) => {
	db("cars")
		.then((cars) => res.status(200).json(cars))
		.catch((error) =>
			res.status(500).json({ message: "Error retrieving cars", error })
		);
});

router.get("/:id", validateId(db, "cars"), (req, res) => {
	res.status(200).json(req.response);
});

router.post("/", validateCar, (req, res) => {
	db("cars")
		.insert(req.response)
		.then((car) => res.status(201).json(car));
});

router.put("/:id", validateId(db, "cars"), validateCar, (req, res) => {
	const { id } = req.params;
	const updatedCar = req.body;

	db("cars")
		.where({ id })
		.update(updatedCar)
		.then((count) =>
			count
				? res.status(200).json({ message: "Car updated successfully" })
				: res.status(400).json({ message: `Error updating car with id ${id}` })
		)
		.catch((error) =>
			res.status(500).json({ message: "Internal error", error })
		);
});

module.exports = router;
