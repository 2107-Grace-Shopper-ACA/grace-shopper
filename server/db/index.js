//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Product = require('./models/Product');
const OrderItem = require('./models/OrderItem')
const Order = require('./models/Order')
//associations could go here!

OrderItem.belongsTo(Product)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

Order.belongsTo(User)
User.hasMany(Order)




module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem
  },
}
