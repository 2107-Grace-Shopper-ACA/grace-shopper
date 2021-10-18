const router = require('express').Router()
const { db } = require('../db');
const { isLoggedIn, isAdmin } = require('../middleware');
const { pluralize } = require('inflection');

module.exports = router

Object.entries(db.models).forEach( entry => {
  const _path = pluralize(entry[0]);
  const model = entry[1];
  router.get(`/admin/${_path}`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      res.send(await model.findAll());
    } catch (ex) {
      next(ex);
    }
  });
  router.delete(`/admin/${_path}/:id`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      const item = await model.findByPk(req.params.id);
      await item.destroy();
      res.sendStatus(201);
    } catch (ex) {
      next(ex);
    }
  });
});

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orderItems', require('./orderItems'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
 