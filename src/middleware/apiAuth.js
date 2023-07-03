import { errorResponse } from '../helpers';
import { user } from '../models/user';

const jwt = require('jsonwebtoken');

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers['x-token'])) {
    return errorResponse(req, res, 'Token is not provided', 401);
  }  
  const token = req.headers['x-token'];
  try {

    const decoded = jwt.verify(token, 'the-super-strong-secrect');
    req.user = decoded.userss;
    return next();
  } catch (error) {
    return  res.status(200).json({
      message: error,
      code:"401"
    });
  }
};

export default apiAuth;
