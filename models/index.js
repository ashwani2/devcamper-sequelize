const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bootcamps = require("./Bootcamp")(sequelize, Sequelize);
db.courses = require("./Course")(sequelize, Sequelize);
db.users = require("./User")(sequelize, Sequelize);
db.reviews = require("./Review")(sequelize, Sequelize);


// courses Association
db.bootcamps.hasMany(db.courses, { as: "courses" });
db.users.hasMany(db.courses, { as: "courses" });
db.courses.belongsTo(db.bootcamps, {
  foreignKey: "bootcampId",
  as: "bootcamp",
});
db.courses.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

//reviews Association
db.bootcamps.hasMany(db.reviews, { as: "reviews" });
db.users.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.bootcamps, {
  foreignKey: "bootcampId",
  as: "bootcamp",
});
db.reviews.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
