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

// router.get('/:orderId', async (req, res, next) => {
//     try {
//         const orderItems = await OrderItem.findByPk(req.params.orderId)
//         res.json(orderItems)
//     } catch (err) {
//         next(err)
//     }
//})