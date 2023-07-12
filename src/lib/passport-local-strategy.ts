import passportLocal from 'passport-local';
import { User, UserSchema } from '../modules/user/user.model';
import { comparePassword } from '../utils/password';

export const LocalStrategy =  passportLocal.Strategy;

const handleLocalStrategy =  async (email: string, password: string, done: any) => {
    console.log("🚀 --------------------------------------------------------------------------🚀");
    console.log("🚀 handleLocalStrategy ~ email:", email, ', password: ', password);

    const user: any = await UserSchema.findOne({ email });

    if (!user) {
        return done(null, false);
    }

    if (!(await comparePassword(password, user.password))) {
        return done(null, false);
    }

    return done(null, user);
}

export default new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, handleLocalStrategy)