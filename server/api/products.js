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

router.put('/:productId', async (req, res, next) => {
  const {inventory} = req.body;
  try {
    const _product = await Product.findByPk(req.params.productId);
    await _product.update({..._product, inventory});
    const product = await Product.findByPk(_product.id, {
      include: Category
    });
    res.json(product);
  } catch (err) {
    next(err)
  }
})