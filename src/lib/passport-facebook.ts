import { Strategy as FacebookStrategy } from "passport-facebook";
import { FB_CLIENT_SECRET, FB_CLIENT_ID, FB_CALLBACK_URL } from '../config/constants';

export default new FacebookStrategy(
  {
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: FB_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken: string, refreshToken: string, profile, done) => {
    console.log("🚀 --------------------------------------------------------------🚀");
    console.log("🚀 ~ file: passport-facebook.ts:14 ~ accessToken:", accessToken);
    console.log("🚀 ~ file: passport-facebook.ts:14 ~ refreshToken:", refreshToken);
    console.log("🚀 ~ file: passport-facebook.ts:14 ~ profile:", JSON.stringify(profile));

    return done(null, {
      profile,
      accessToken,
      refreshToken
    });
  }
);
