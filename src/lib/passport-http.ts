import { BasicStrategy } from 'passport-http';
import { UserModel, IUserDocument } from '../modules/user/user.model';
import { comparePassword } from '../utils/password';

export default new BasicStrategy(async (email: string, password: string, done: any) => {
    console.log("🚀 --------------------------------------------------------------------------🚀");
    console.log("🚀 handleLocalStrategy ~ email:", email, ', password: ', password);

    const user = await UserModel.findOne({ email }) as IUserDocument;

    if (!user) {
        return done(null, false);
    }

    if (!(await comparePassword(password, user.password))) {
        return done(null, false);
    }

    return done(null, user);
})