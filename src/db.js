const Sequelize = require('sequelize');

// Start the server
const db = new Sequelize('phba', 'postgres', 'gH05t985!!', {
    host: 'localhost',
    dialect: 'postgres',

});

module.exports = db;

// We'll define associations after we import them here
const Game = require('./models/game');
const Field = require('./models/field');
const User = require('./models/user');

// this will put a foreign key for parkId in the Game model
// and give Game .setField() and .getField() instance methods
Game.belongsTo(Field, { foreignKey: 'fieldId' });

// this will give Field the magic methods for addGame, etc.
// but we already have a foreign key for fieldId in the Game model, so it will maintain
// the 1:m relationship
Field.hasMany(Game);