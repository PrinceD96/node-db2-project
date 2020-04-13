exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("cars")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("cars").insert([
				{
					"id": 1,
					"VIN": "WBAHN03597D908331",
					"make": "Isuzu",
					"model": "i-Series",
					"mileage": 19,
					"transmission_type": "automatic",
					"title_status": "salvage"
				},
				{
					"id": 2,
					"VIN": "JH4CL95847C441435",
					"make": "Buick",
					"model": "Regal",
					"mileage": 125,
					"transmission_type": "automatic",
					"title_status": "clean"
				},
				{
					"id": 3,
					"VIN": "SCBZK22EX2C631977",
					"make": "Buick",
					"model": "Regal",
					"mileage": 74,
					"transmission_type": "manual",
					"title_status": "salvage"
				},
				{
					"id": 4,
					"VIN": "WBAYA8C58ED765153",
					"make": "Chevrolet",
					"model": "Camaro",
					"mileage": 68,
					"transmission_type": "manual"
				},
				{
					"id": 5,
					"VIN": "KNAFU6A22A5910638",
					"make": "Suzuki",
					"model": "Swift",
					"mileage": 12,
					"transmission_type": "automatic",
					"title_status": "clean"
				}
			]);
		});
};
