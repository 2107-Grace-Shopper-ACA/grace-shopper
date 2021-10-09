const Sequelize = require('sequelize')
const db = require('../db')

const {STRING, TEXT, INTEGER, DECIMAL, UUID, UUIDV4} = Sequelize;

const Product = db.define('product', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: TEXT
    },
    imageUrl: STRING,
    inventory: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DECIMAL(12,2),
        allowNull: false,
        validate: {
            notEmpty: false
        }
    }
});

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

