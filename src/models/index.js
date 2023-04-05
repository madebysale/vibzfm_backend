

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
//db.User.hasMany(db.Address);
// db.Ticket.belongsTo(db.Lottery, {foreignKey: 'lotteryId'});
// db.Ticket.belongsTo(db.User, {foreignKey: 'userId'});

// db.Winner.belongsTo(db.Lottery, {foreignKey: 'lotteryId'});
// db.Winner.belongsTo(db.User, {foreignKey: 'userId'});
// db.Winner.belongsTo(db.fake_user, {foreignKey: 'fakeuserId'});
// db.Winner.belongsTo(db.Ticket, {foreignKey: 'ticketId'});
// db.Winner.belongsTo(db.Step, {foreignKey: 'stepId'});
// // db.Agent_promocode.belongsTo(db.Agent, {foreignKey: 'agentId'});
// db.Agent_transaction.belongsTo(db.Agent, {foreignKey: 'agentId'});
// db.Ticketwinnerhistory.belongsTo(db.User, {foreignKey: 'userId'});
module.exports = db;
