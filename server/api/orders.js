const router = require('express').Router()
const {
  models: { Order, OrderItem, User, Product },
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.headers.authorization === 'null') {
    console.log('YOU SHALL NOT PASS!')
    return res.json([])
  }
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
      //if there's no isCart order, create one
      if (!orders.find(order => order.isCart)) {
        const cartOrder = await Order.create({
          userId: user.id,
          isCart: true
        });
        orders.push(cartOrder);
      }
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
    let order = await Order.create(req.body)
    order = await Order.findByPk(order.id, {
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
    res.send(order)
  } catch (err) {
    next(err)
  }
})
router.put('/:orderId', async (req, res, next) => {
  const { isCart, date } = req.body;
  try {
    let order = await Order.findByPk(req.params.orderId);
    await order.update({...order, isCart, date});
    order = await Order.findByPk(order.id, {
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
    res.send(order)
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
