const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4, INTEGER} = Sequelize

const OrderItem = db.define('orderItem', {
//again for some reason the tests only pass if i take this out - C
//Uncommenting the id portion for my own testing, this is a reminder to comment it back out when done -Alex
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})

module.exports = OrderItem