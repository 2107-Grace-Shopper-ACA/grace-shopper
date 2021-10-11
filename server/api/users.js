const router = require('express').Router()
const { models: { User, Order }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
      include: [{
        model: Order
      }]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});
//this will show the user's information like address etc. with a link to view their orders? - C
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user)
  } catch (err) {
    next(err)
  }
})
//this will show their orders, but maybe this should go in /orders/:userId instead? -C
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const orders = await Order.findAll({
      where: {
        userId: user.id
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
