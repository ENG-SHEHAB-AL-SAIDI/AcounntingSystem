'use strict';

module.exports = function tenantContext(req, res, next) {
  if (!req.user || !req.user.businessId) {
    return res.status(401).json({ error: 'Invalid tenant context' });
  }

  req.context = {
    businessId: req.user.businessId,
    userId: req.user.userId,
    role: req.user.role
  };

  next();
};
