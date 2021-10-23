const router = require('express').Router()
const { db } = require('../db');
const { isLoggedIn, isAdmin } = require('../middleware');
const { pluralize } = require('inflection');
const User = require('../db/models/User');
const OrderItem = require('../db/models/OrderItem');
const Product = require('../db/models/Product');
const Order = require('../db/models/Order');
const Category = require('../db/models/Category');

module.exports = router
//we'll have to change the other apis to reflect what is relevant to be shown for admin/not admin

Object.entries(db.models).forEach( entry => {
  const _path = pluralize(entry[0]);
  const model = entry[1];
  router.get(`/${_path}`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      if(_path === 'orders'){
        res.send(await model.findAll({
          include: [
            {
              model: User
            },
            {
              model: OrderItem,
              include: Product
            }
          ]
        }));
      } else if(_path === 'orderItems'){
        res.send(await model.findAll({
          include: [
            {
              model: Product
            },
            {
              model: Order
            }
          ]
        }));
      } else {
        res.send(await model.findAll());
      }
    } catch (ex) {
      next(ex);
    }
  });
  router.get(`/${_path}/:id`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      if(_path === 'orders'){
        res.send(await model.findByPk(req.params.id, {
          include: [
            {
              model: User
            },
            {
              model: OrderItem,
              include: Product
            }
          ]
        }));
      } else if(_path === 'orderItems'){
        res.send(await model.findByPk(req.params.id, {
          include: [
            {
              model: Product
            },
            {
              model: Order
            }
          ]
        }));
      } else {
        res.send(await model.findByPk(req.params.id));
      }
    } catch (ex) {
      next(ex);
    }
  });
  router.delete(`/${_path}/:id`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      const item = await model.findByPk(req.params.id);
      await item.destroy();
      res.sendStatus(201);
    } catch (ex) {
      next(ex);
    }
  });
  router.post(`/${_path}`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      let item;
      if (_path === 'products'){
          const { name, inventory, price, imageUrl, description, isActive, onSale, categoryId } = req.body
          const _item = (await model.create({name, inventory: inventory, price: +price, imageUrl, description, isActive, onSale, categoryId}));
          item = await model.findByPk(_item.id, {
            include: Category
          })
      }
      else if (_path === 'users'){
        const { username, password, isAdmin } = req.body
        item = (await model.create({ username, password, isAdmin}));
      }
      res.send(item);
    } catch (ex) {
      next(ex);
    }
  });

  router.put(`/${_path}/:id`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      const item = await model.findByPk(req.params.id);
      if (_path === 'products'){
          const { name, inventory, price, imageUrl, description, isActive, onSale, categoryId } = req.body
          await item.update({...item, name, inventory: inventory, price: +price, imageUrl, description, isActive, onSale, categoryId});
          const _item = await model.findByPk(item.id, {
            include: Category
          })
          res.send(_item)
      }
      else if (_path === 'users'){
        const { username, isAdmin } = req.body
        await item.update({...item, username, isAdmin});
        res.send(item);
      } else if (_path === 'orders'){
        const { isCart, status } = req.body;
        await item.update({...item, isCart, status});
        const _item = await model.findByPk(item.id, {
          include: [
            {
              model: OrderItem
            },
            {
              model: User
            }
          ]
        })
        res.send(_item)
      } else if (_path === 'orderItems'){
        const { quantity } = req.body;
        await item.update({...item, quantity});
        const _item = await model.findByPk(item.id, {
          include: [
            {
              model: Product
            },
            {
              model: Order
            }
          ]
        })
        res.send(_item)
      } 
      else {
        res.send(item);
      }
    } catch (ex) {
      next(ex);
    }
  });
});
