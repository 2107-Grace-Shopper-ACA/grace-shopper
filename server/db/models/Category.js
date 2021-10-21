const Sequelize = require ('sequelize')
const db = require('../db')

const {UUID, UUIDV4, STRING} = Sequelize

const Category = db.define('category', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false
    }
})

module.exports = Category
