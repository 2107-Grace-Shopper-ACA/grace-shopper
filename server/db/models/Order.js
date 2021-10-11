const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4, BOOLEAN} = Sequelize

const Order = db.define('order', {
//FOR SOME REASON THE TESTS ONLY PASS WHEN I REMOVE THIS? EVEN THOUGH IT WORKS FINE FOR PRODUCT - Corinne
    // id: {
    //     type: UUID,
    //     defaulValue: UUIDV4,
    //     allowNull: false,
    //     primaryKey: true
    // },
    isCart: {
        type: BOOLEAN,
        defaultValue: true
    },
    isOpen: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
})

module.exports = Order
