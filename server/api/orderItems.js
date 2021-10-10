const router = require('express').Router()
const { models: { OrderItem } } = require('../db')
module.exports = router

router.get('/orderItems/:orderId', async (req, res, next) => {
    try {
        const orderItems = await OrderItem.findByPk(req.params.orderId)
        res.json(orderItems)
    } catch (err) {
        next(err)
    }
})