import jsonwebtoken from 'jsonwebtoken';
import { JWT_PRV_KEY } from '../config/constants';
import { IUserDocument } from '../modules/user/user.model';

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export const generateJwt = (user: IUserDocument) => {
  const _id = user?._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, JWT_PRV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};
