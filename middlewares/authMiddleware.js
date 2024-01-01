// middlewares/authMiddleware.js
const isAuthenticated = (req) => {
    //if authentication need we can use it. Add your authentication logic here
    return false;
  };
  
  const authMiddleware = (req, res, next) => {
    if (isAuthenticated(req)) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = authMiddleware;
  