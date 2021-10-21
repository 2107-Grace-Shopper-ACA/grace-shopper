//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Product = require('./models/Product');
const OrderItem = require('./models/OrderItem')
const Order = require('./models/Order')
const Address = require('./models/Address')
const Category = require('./models/Category')
//associations could go here!

OrderItem.belongsTo(Product)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

OrderItem.belongsTo(User)
//User.hasMany(OrderItem)

//OrderItem.belongsTo(User, {through: Order})
//User.hasMany(OrderItem, {through: Order}) "Error: N:M associations are not supported with hasMany. Use belongsToMany instead"

Order.belongsTo(User)
User.hasMany(Order)

Address.belongsTo(User)
User.hasMany(Address)

Order.belongsTo(Address)
Product.belongsTo(Category)


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
    Address,
    Category
  },
}
