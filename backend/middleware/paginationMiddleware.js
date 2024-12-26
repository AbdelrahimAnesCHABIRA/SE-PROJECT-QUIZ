const paginationMiddleware = (req, res, next) => {
    const page = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 12;
    
    req.pagination = {
      skip: page,
      limit: limit
    };
    next();
  };
  
  module.exports = paginationMiddleware;