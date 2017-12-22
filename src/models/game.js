var Sequelize = require('sequelize');
var db = require('../db');

var Game = db.define('game', {
    gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    teamAway: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    teamHome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    umpBase1: {
        type: Sequelize.STRING,
    },
    umpBase2: {
        type: Sequelize.STRING,
    },
    umpBase3: {
        type: Sequelize.STRING,
    },
    umpPlate: {
        type: Sequelize.STRING,
    },

}, {
    getterMethods: {
        umpires: function() {
            return 'Plate: ' + this.umpPlate + ' - Base1: ' + this.umpBase1;
        }
    },
    classMethods: {
        findByAwayTeam: function(awayTeam) {
            return this.findAll({
                where: {
                    awayTeam: away
                }
            })
        }
    },
    count: function() {
        return this.findAll()
            .then(function(games) {
                return games.length;
            })
    }
})

module.exports = Game;