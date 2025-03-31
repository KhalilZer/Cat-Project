const app = require("./app");
const sequelize = require("./config/config"); // Importing Sequelize configuration
const dotenv = require("dotenv"); // Importing dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate() // Check if the connection to the database is successful
  .then(() => {
    console.log("Database connection established successfully.");

    // Synchronize Sequelize models with the database
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database tables have been synchronized successfully.");

    // Start the server after successful sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Error during database connection or table synchronization:",
      err
    );
    process.exit(1); // Exit the process in case of failure
  });
