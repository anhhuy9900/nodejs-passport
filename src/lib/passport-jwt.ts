import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_PUB_KEY } from '../config/constants';
import { UserModel } from '../modules/user/user.model'

export const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_PUB_KEY,
    algorithms: ['RS256']
}

export default new JwtStrategy(options, async(jwtPayload, done) => {
    console.log('JwtStrategy - jwtPayload', jwtPayload);

    const user = await UserModel.findOne({ _id: jwtPayload.sub });

    if (!user) {
        return done(null, false);
    }

    return done(null, user);
});