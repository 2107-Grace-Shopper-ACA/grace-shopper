const router = require('express').Router()
const { models: { Order } } = require('../db')
module.exports = router

router.get('/orders/:userId', async (req, res, next) => {
    try {
        const orders = await Order.findByPk(req.params.userId)
        res.json(orders)
    } catch (err) {
        next(err)
    }
})