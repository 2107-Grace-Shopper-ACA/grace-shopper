const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4, BOOLEAN} = Sequelize

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
    }
})

module.exports = Order
