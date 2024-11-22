const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

async function startServer() {
	try {
		mongoose
  			.connect(config.db.uri)
  			.then(() => {
    			console.log("Connected to the database!");
  			})
  			.catch((err) => {
    			console.log(err);
  			});

		const PORT = config.app.port;
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		  });
	} catch (error) {
		console.log("Cannot connect to the database!", error);
		process.exit();
	}
}

startServer();