import { verify } from 'jsonwebtoken';
import { SECRET } from '../config';
import { User } from '../models';

const AuthMiddleware = async (req, res, next) => {
  const authHeaders = req.get('Authorization');

  if (!authHeaders) {
    req.isAuth = false;
    return next();
  }
  let token = authHeaders.split(' ')[1];
  console.log(token);
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decipheredToken;
  try {
    decipheredToken = verify(token, SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decipheredToken) {
    req.isAuth = false;
    return next();
  }

  let authUser = await User.findById(decipheredToken.id);
  if (!authUser) {
    req.isAuth = false;
    return next();
  }

  req.user = authUser;
  req.isAuth = true;
  return next();
};

export default AuthMiddleware;
