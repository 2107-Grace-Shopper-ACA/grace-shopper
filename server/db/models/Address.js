const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4, STRING} = Sequelize

const Address = db.define('address', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    streetAddress: {
        type: STRING,
        defaultValue: null
    },
    city: {
        type: STRING,
        defaultValue: null
    },
    state: {
        type: STRING,
        defaultValue: null
    },
    zipcode: {
        type: STRING,
        defaultValue: null
    }
})

module.exports = Address
