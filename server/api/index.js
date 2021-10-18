const router = require('express').Router()
const {models: { Order, User }} = require('../db');
module.exports = router

const isLoggedIn = async (req, res, next) => {
  try {
    const user = (await User.findByToken(req.headers.authorization));
    req.user = user;
    next()
  } catch (ex) {
    next(ex);
  }
}

const isAdmin = (req, res, next) => {
  if(req.user.isAdmin){
    return next();
  }
  const error = new Error('user is not admin');
  error.status = 401;
  next(error);
  
}

router.get('/admin/orders', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.send(await Order.findAll());
  } catch (ex) {
    next(ex);
  }
})

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orderItems', require('./orderItems'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
 