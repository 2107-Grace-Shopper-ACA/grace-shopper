const router = require('express').Router()
const { models: { Order, OrderItem, User } } = require('../db');
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: OrderItem
                }
            ]
        });
        res.json(orders)
    } catch (err) {
        next(err)
    }
})
//not sure yet about what the URIs should be for these?
router.get('/:userId', async (req, res, next) => {
    try {
        const orders = await Order.findByPk(req.params.userId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: OrderItem
                }
            ]
        })
        res.json(orders)
    } catch (err) {
        next(err)
    }
})