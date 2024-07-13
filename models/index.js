const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model.js")(sequelize, DataTypes);
db.contacts = require("../models/contact.model.js")(sequelize, DataTypes);
db.carbookings = require("../models/car-booking.model.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;
