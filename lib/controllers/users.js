const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorize = require('../middleware/authorize.js');
const { User } = require('../models/User.js');
const UserService = require('../services/UserService.js');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })

  .get('/protected', [authenticate], (req, res, next) => {
    res.json({ message: 'Hello world!' });
  })

  .get('/', [authenticate, authorize], async (req, res) => {
    try { 
      const users = await User.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!' });
    } catch (e) {
      next(e);
    }
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      .status(204)
      .send();
  });
  
