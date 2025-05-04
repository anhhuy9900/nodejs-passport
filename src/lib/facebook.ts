import { Request } from "express";
import OAuth2Strategy, { InternalOAuthError } from "passport-oauth2";
import { ParsedQs } from "qs";
import uri from "uri-js";
import util from "util";

export interface FacebookInitParams {
  authorizationURL: string;
  tokenURL: string;
  graphAPIVersion?: string;
  scopeSeparator?: string;
  profileURL?: string;
  profileFields?: string[] | null;
  enableProof?: boolean;
  clientSecret: string;
  clientID: string;
}

export interface AuthorizationParamsOpt {
  display?: string;
  authType?: string;
  authNonce?: string;
}

class FacebookGraphAPIError {
  name: string;
  message: string;
  code: string;
  type: string;
  subcode: string;
  traceID: string;
  status: number;

  constructor(
    message: string,
    type: string,
    code: string,
    subcode: string,
    traceID: string
  ) {
    this.name = "FacebookGraphAPIError";
    this.message = message;
    this.type = type;
    this.code = code;
    this.subcode = subcode;
    this.traceID = traceID;
    this.status = 500;
    return this;
  }
}

export class FacebookStrategy {
  private _options: FacebookInitParams;

  constructor(params: any) {
    const options: FacebookInitParams = params;
    const version = options.graphAPIVersion || "v16.0";

    options.authorizationURL =
      params.authorizationURL ||
      "https://www.facebook.com/" + version + "/dialog/oauth";
    options.tokenURL =
      params.tokenURL ||
      "https://graph.facebook.com/" + version + "/oauth/access_token";
    options.scopeSeparator = params.scopeSeparator || ",";
    options.profileURL =
      params.profileURL || "https://graph.facebook.com/" + version + "/me";
    options.profileFields = params.profileFields || null;
    options.enableProof = params.enableProof;
    options.clientSecret = params.clientSecret;
    options.clientID = params.clientID || '585721626976132';
    options.clientSecret = params.clientSecret || 'd9a952afd52b5e123a6e3e89f14217f6';
    this._options = options;

    // super(
    //   options,
    //   (accessToken: string, refreshToken: string, profile: any, _cb: void) => {
    //     console.log("🚀 --------------------------------------------------------------------------------------🚀");
    //     console.log("🚀 FacebookStrategy ~ constructor ~ accessToken:", accessToken);
    //     console.log("🚀 FacebookStrategy ~ constructor ~ refreshToken:", refreshToken);
    //     console.log("🚀 FacebookStrategy ~ constructor ~ profile:", profile);
    //   }
    // );
  }

  getAccessToken() {
    console.log('getAccessToken: ', this._options);
    const data = new OAuth2Strategy(
        this._options,
        (accessToken: string, refreshToken: string, profile: any, _cb: void) => {
          console.log("🚀 --------------------------------------------------------------------------------------🚀");
          console.log("🚀 FacebookStrategy ~ constructor ~ accessToken:", accessToken);
          console.log("🚀 FacebookStrategy ~ constructor ~ refreshToken:", refreshToken);
          console.log("🚀 FacebookStrategy ~ constructor ~ profile:", profile);
        }
      );
      console.log('getAccessToken - data: ', data);
  }

  authorizationParams(options: AuthorizationParamsOpt) {
    const params: any = {};

    // https://developers.facebook.com/docs/reference/dialogs/oauth/
    if (options.display) {
      params.display = options.display;
    }

    // https://developers.facebook.com/docs/facebook-login/reauthentication/
    if (options.authType) {
      params.auth_type = options.authType;
    }
    if (options.authNonce) {
      params.auth_nonce = options.authNonce;
    }

    return params;
  }

  authenticate(req: Request, options?: any): void {
      return this.authenticate(req);
  }

//   getUserProfile(accessToken: string, done: any) {
//     let url: any = uri.parse(this._options.profileURL || '');
//     url = uri.serialize(url);
//     this._oauth2.get(url, accessToken, function (err, body: any, res) {
//       var json;

//       if (err) {
//         if (err.data) {
//           try {
//             json = JSON.parse(err.data);
//           } catch (_) {}
//         }

//         if (json && json.error && typeof json.error == "object") {
//           return done(
//             new FacebookGraphAPIError(
//               json.error.message,
//               json.error.type,
//               json.error.code,
//               json.error.error_subcode,
//               json.error.fbtrace_id
//             )
//           );
//         }
//         return done(
//           new InternalOAuthError("Failed to fetch user profile", err)
//         );
//       }

//       try {
//         json = JSON.parse(body);
//       } catch (ex) {
//         return done(new Error("Failed to parse user profile"));
//       }

//       console.log("json", json);

//       // var profile = Profile.parse(json);
//       // profile.provider = 'facebook';
//       // profile._raw = body;
//       // profile._json = json;

//       done(null, {});
//     });
//   }
}
