// server.js (ou app.js)
const { Sequelize } = require("sequelize");

// Créez la connexion à la base de données MySQL avec les variables d'environnement
const sequelize = new Sequelize({
  host: process.env.DB_HOST || "mysql-db", // Assurez-vous que c'est 'mysql-db'
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cat_db",
  dialect: "mysql",
});

module.exports = sequelize;
