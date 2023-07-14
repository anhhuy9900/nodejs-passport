import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GG_CLIENT_ID, GG_CLIENT_SECRET, GG_CALLBACK_URL } from '../config/constants';

export default new GoogleStrategy(
  {
    clientID: GG_CLIENT_ID,
    clientSecret: GG_CLIENT_SECRET,
    callbackURL: GG_CALLBACK_URL,
  },
  async (accessToken: string, refreshToken: string, profile: Record<string, any>, cb: (arg: string | null, {}) => void) => {
    console.log("🚀 --------------------------------------------------------------🚀");
    console.log("🚀 ~ file: passport-google.ts:14 ~ accessToken:", accessToken);
    console.log("🚀 ~ file: passport-google.ts:14 ~ refreshToken:", refreshToken);
    console.log("🚀 ~ file: passport-google.ts:14 ~ profile:", JSON.stringify(profile));
    return cb(null, {
      profile,
      accessToken,
      refreshToken
    });
  }
);
