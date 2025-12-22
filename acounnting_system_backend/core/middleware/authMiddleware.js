'use strict';

const { joseUtiles } = require('../helpers/joseUtiles');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  try {
    const { payload } = await joseUtiles.verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = authMiddleware;
