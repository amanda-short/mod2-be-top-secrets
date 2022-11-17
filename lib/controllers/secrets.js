const { Router } = require('express');
const { Secret } = require('../models/Secret.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const secrets = await Secret.getAllSecrets();
      res.json(secrets);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const secret = await Secret.insert(req.body);
      res.json(secret);
    } catch (e) {
      next(e);
    }
  });
