const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4, BOOLEAN, DATE, NOW} = Sequelize

const Order = db.define('order', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    isCart: {
        type: BOOLEAN,
        defaultValue: true
    },
    date: {
        type: DATE,
        defaultValue: NOW
    }
})

module.exports = Order
