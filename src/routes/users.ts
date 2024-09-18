import express from 'express';
import USER_MODEL from '../db/models/model.user';
import CONSTANTS from '../utils/constants';

const router = express.Router();

/* GET users listing. */
router.get('/', function(_req, res, _next) {
  USER_MODEL.create({email: 'test@gmail.com', name: 'tester', role: CONSTANTS.ROLES.ADMIN})
  res.send('respond with a resource');
});

export default router;
