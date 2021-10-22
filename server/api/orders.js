const router = require('express').Router()
const {
  models: { Order, OrderItem, User, Product },
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (user) {
      const orders = await Order.findAll({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: User,
            attributes: ['id', 'username'],
          },
          {
            model: OrderItem,
            include: Product,
          },
        ],
      })
      res.json(orders)
    } else {
      //TODO Avoid an error message in our console if we can't find a user.
      res.send('No current user found via token.')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const _order = await Order.create(req.body)
    const order = await Order.findByPk(_order.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: OrderItem,
          include: Product,
        },
      ],
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
router.put('/:orderId', async (req, res, next) => {
  const { isCart } = req.body;
  try {
    const _order = await Order.findByPk(req.params.orderId);
    await _order.update({..._order, isCart});
    const order = await Order.findByPk(_order.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: OrderItem,
          include: Product,
        },
      ],
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
          attributes: ['id', 'username'],
        },
        {
          model: OrderItem,
          include: Product,
        },
      ],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/users/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const orders = await Order.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: OrderItem,
          include: Product,
        },
      ],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
