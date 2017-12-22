const Sequelize = require('sequelize');
const db = require('../db');


const Field = db.define('field', {
    fieldId: {
        type: Sequelize.INTEGER,

    },
    name: {
        type: Sequelize.STRING,

    },
    address: {
        type: Sequelize.STRING,

    },
})
module.exports = Field;