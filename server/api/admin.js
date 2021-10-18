const router = require('express').Router()
const { db } = require('../db');
const { isLoggedIn, isAdmin } = require('../middleware');
const { pluralize } = require('inflection');

module.exports = router
//we'll have to change the other apis to reflect what is relevant to be shown for admin/not admin
Object.entries(db.models).forEach( entry => {
  const _path = pluralize(entry[0]);
  const model = entry[1];
  router.get(`/${_path}`, isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      res.send(await model.findAll());
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
  
});
 