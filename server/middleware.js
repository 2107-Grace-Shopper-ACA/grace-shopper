const { models: { User }} = require('./db') 
const TOKEN = 'token';

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

module.exports = {
    isLoggedIn,
    isAdmin
}