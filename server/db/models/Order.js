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
//TODO will need to change this date to current date when they checkout 
//TODO open orders will have date it was created ... if time we can change it to be the latest date that an orderItem was updated
    date: {
        type: DATE,
        defaultValue: NOW
    }
})

module.exports = Order
