const Sequelize = require('sequelize')
const db = require('../db')

const {STRING, TEXT, INTEGER, DECIMAL, BOOLEAN, UUID, UUIDV4} = Sequelize;

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
    description: TEXT,
    imageUrl: STRING, //@Corinne Does this need to have similar syntax to the description property? //oops they can be either way if you're only stating the datatype -i'll change description
    inventory: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 100
    },
    price: {
        type: DECIMAL(12,2),
        allowNull: false,
        defaultValue: 8.00
    },
    isActive: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    onSale: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
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

