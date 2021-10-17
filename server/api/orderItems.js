const router = require('express').Router()
const {
  models: { OrderItem, Product, Order, User },
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //Gets our logged in user
    const user = await User.findByToken(req.headers.authorization)

    //Gets an array of all the orders for our user
    const orders = await Order.findAll({
      where: {
        userId: user.id
      }
    })

    if (user) {
      const orderItems = await OrderItem.findAll({
        //We'll need to figure out how to restrict this to just be from orders from our user (two avenues we've discussed) -Alex
        where: {
          userId: user.id
        },
        include: [
          {
            model: Product,
          },
          {
            model: Order,
          },
        ],
      })
      res.json(orderItems)
    }
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    console.log(`orderItem req.body: ${JSON.stringify(req.body)}`)
    const _orderItem = await OrderItem.create(req.body)
    const orderItem = await OrderItem.findByPk(_orderItem.id, {
      include: [
        {
          model: Product,
        },
      ],
    })
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})
router.put('/:orderItemId', async (req, res, next) => {
  const { quantity } = req.body
  console.log(quantity)
  try {
    const _orderItem = await OrderItem.findByPk(req.params.orderItemId)
    await _orderItem.update({ quantity })
    const orderItem = await OrderItem.findByPk(_orderItem.id, {
      include: [
        {
          model: Product,
        },
      ],
    })
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})
//I think if we want to see all order items in a specific order it should be from /orders/:orderId - C
// router.get('/:orderId', async (req, res, next) => {
//     try {
//         const orderItems = await OrderItem.findByPk(req.params.orderId)
//         res.json(orderItems)
//     } catch (err) {
//         next(err)
//     }
//})
