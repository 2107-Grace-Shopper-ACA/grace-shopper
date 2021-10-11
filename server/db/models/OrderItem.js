const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4, INTEGER} = Sequelize

const OrderItem = db.define('orderItem', {
    // id: {
    //     type: UUID,
    //     defaulValue: UUIDV4,
    //     allowNull: false,
    //     primaryKey: true
    // },
    quantity: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = OrderItem