const router = require('express').Router()
const { models: { Order, OrderItem, User } } = require('../db');
module.exports = router

//this would be an admin route?
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

router.post('/', async (req, res, next) => {
    try {
        const _order = await Order.create(req.body);
        const order = await Order.findByPk(_order.id, {
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
        res.json(order)
    } catch (err) {
        next(err)
    }
})

//this will show a specific order ? although this should just be an admin thing?
//i think i'm getting confused by what the URI's will be for someone who is logged in and for someone who isn't -C
router.get('/:orderId', async (req, res, next) => {
    try {
        const orders = await Order.findByPk(req.params.orderId, {
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