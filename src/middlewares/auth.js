import { verify } from 'jsonwebtoken';
import { SECRET } from '../config';
import { AuthenticationError } from 'apollo-server-express';

const AuthMiddleware = async (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = verify(token, SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid or Expired token');
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authentication header must be provided');
};

export default AuthMiddleware;
