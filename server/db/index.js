//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order')
const OrderItem = require('./models/OrderItem')
//associations could go here!


Order.belongsTo(User)
User.hasMany(Order)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

OrderItem.belongsTo(Product)


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem
  },
}
