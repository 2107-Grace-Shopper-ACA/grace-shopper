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
    date: {
        type: DATE,
        defaultValue: NOW
    }
})

Order.prototype.findDetails = async function() {
    const user = await db.models.user.findByPk(this.userId);

    const orderItems = await db.models.orderItem.findAll({
        where: {
            orderId: this.id
        },
        include: {
            model: db.models.product
        }
    });
    const total = orderItems.reduce((accum, orderItem) => {
        accum += +orderItem.product.price * orderItem.quantity;
        return accum;
    },0);
    const details = orderItems.map(orderItem => {
        return {
            productName: orderItem.product.name,
            quantity: orderItem.quantity,
            price: orderItem.product.price,
            newInventory: orderItem.product.inventory - orderItem.quantity,
            subtotal: orderItem.quantity * +orderItem.product.price,
        };
    });
    return {
        id: this.id,
        date: this.date,
        user: user.username,
        total,
        details
    };
}


module.exports = Order
