import express from "express";
import passport from "passport";
import { UserModel, IUserDocument, UserCreateOrUpdate } from "../user/user.model";
import { hashPassword } from '../../utils/password';
import { PROVIDERS } from '../../config/constants';

const app = express.Router();

app.post(
  "/login-passport-local",
  passport.authenticate("local"),
  async (req, res) => {
    try {
      res.status(200).send("Login successfully with passport local");
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
);

app.post(
  "/login-passport-jwt",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      res.status(200).send("Login successfully with passport JWT");
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
);

// passport-http
app.post(
  "/login-passport-basic",
  passport.authenticate("basic", { session: false }),
  async (req, res) => {
    try {
      res.status(200).send("Login successfully with passport local");
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
);

app.get("/facebook/authenticate", passport.authenticate("facebook"), async (req, res) => {
  try {
    res.status(200).send("Logging with passport facebook");
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/facebook/success", async (req, res) => {
  try {
    const { profile, accessToken } = req.user as any;
    const { displayName, email, id } = profile;

    const body: IUserDocument = {
      networkId: id,
      name: displayName,
      email: email ?? 'None', //if the email not exist because of the user's not public email
      status: 'active',
      password: await hashPassword('123456'),
      provider: PROVIDERS.FACEBOOK,
      accessToken
    };
    await UserCreateOrUpdate(body);
    res.status(200).send("Login successfully with passport facebook");
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/facebook/failed", async (req, res) => {
  try {
    res.status(200).send("Login failed with passport facebook");
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/success",
    failureRedirect: "/auth/facebook/failed",
  }),
  async (req, res) => {
    try {
      res
        .status(200)
        .send("The url callback from facebook when verified information");
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
);

app.get(
  "/google/authenticate",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  async (req, res) => {
    try {
      res.status(200).send("Logging with passport google");
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
);

app.get("/google/success", async (req, res) => {
  try {
    const { profile, accessToken } = req.user as any;
    const { name, email, sub } = profile._json;

    const body: IUserDocument = {
      networkId: sub,
      name: name ?? null,
      email: email ?? null,
      status: 'active',
      password: await hashPassword('123456'),
      provider: PROVIDERS.GOOGLE,
      accessToken
    };
    await UserCreateOrUpdate(body);
    
    res.status(200).send("Login successfully with passport google");
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failed-login",
    successReturnToOrRedirect: "/auth/google/success",
  }),
  async (req, res) => {
    try {
      res.status(200).send("Callback this url with passport google google");
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
);

app.get("/google/failed-login", async (req, res) => {
  try {
    res.status(200).send("Failed login with passport google");
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

export default app;
