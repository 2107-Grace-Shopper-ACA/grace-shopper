const router = require('express').Router()
const {
  models: { OrderItem, Product, Order, User },
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.headers.authorization === 'null') {
    console.log('YOU SHALL NOT PASS!')
    return res.json([])
  }
  //Gets our logged in user
  try {
    const user = await User.findByToken(req.headers.authorization)
    //Gets an array of all the orders for our user

    if (user) {
      const orderItems = await OrderItem.findAll({
        //We'll need to figure out how to restrict this to just be from orders from our user (two avenues we've discussed) -Alex
        where: {
          userId: user.id,
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
    } else {
      res.send('No user found.')
    }
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
    try {
      const _orderItem = await OrderItem.create(req.body);
      const orderItem = await OrderItem.findByPk(_orderItem.id, {
          include: [
            {
            model: Product,
            },
            {
              model: User
            },
            {
              model: Order
            }
          ]
      });
      res.json(orderItem)
    } catch (err) {
      next(err)
    }
  });
  router.put('/:orderItemId', async (req, res, next) => {
    const { quantity, userId, orderId } = req.body;
    try {
      const _orderItem = await OrderItem.findByPk(req.params.orderItemId);
      await _orderItem.update({..._orderItem, quantity, userId, orderId});
      const orderItem = await OrderItem.findByPk(_orderItem.id, {
          include: [
            {
            model: Product,
            },
            {
              model: User
            },
            {
              model: Order
            }
          ]
      });
      res.json(orderItem)
    } catch (err) {
      next(err)
    }
  });
  router.delete('/:orderItemId', async (req, res, next) => {
    try {
      const orderItem = await OrderItem.findByPk(req.params.orderItemId);
      await orderItem.destroy();
      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  });
//I think if we want to see all order items in a specific order it should be from /orders/:orderId - C
// router.get('/:orderId', async (req, res, next) => {
//     try {
//         const orderItems = await OrderItem.findByPk(req.params.orderId)
//         res.json(orderItems)
//     } catch (err) {
//         next(err)
//     }
//})