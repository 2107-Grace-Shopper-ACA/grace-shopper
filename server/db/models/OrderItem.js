const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4} = Sequelize

const OrderItem = db.define('orderItem', {
    id: {
        type: UUID,
        defaulValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = OrderItem