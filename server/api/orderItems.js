const router = require('express').Router()
const { models: { OrderItem, Product } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const orderItems = await OrderItem.findAll({
          include: [{
            model: Product,
            attributes: ['name']
          }]
      });
      res.json(orderItems)
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