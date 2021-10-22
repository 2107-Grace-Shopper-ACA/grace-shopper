const router = require('express').Router()
const { models: { Product, Category }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Category
    });
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: Category
    });
    res.json(product)
  } catch (err) {
    next(err)
  }
})