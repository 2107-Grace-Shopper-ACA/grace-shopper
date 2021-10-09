const Sequelize = require('sequelize')
const db = require('../db')

const {STRING, TEXT, UUID, UUIDV4} = Sequelize;

const Product = db.define('product', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: TEXT
    },
    imageUrl: STRING
})

module.exports = Product;

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */

