import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose, { ConnectOptions } from 'mongoose';
import LocalStrategy from './lib/passport-local-strategy';
import { APP_PORT } from './config/constants';
import Test from './modules/test';
import Auth from './modules/auth';
import User from './modules/user'


(async() => {
    const routes = express.Router();

    try {
        await mongoose.connect("mongodb://host.docker.internal:27020/app", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions)
    } catch (err) {
        console.log('CONNECT MongoDb Fail by: ', err)
    }
    

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(bodyParser.json());
    app.use(session({ 
        secret: 'key1823733', 
        resave: false, 
        saveUninitialized: true,
        cookie: {
            maxAge: 1000* 60 * 60 * 24
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(LocalStrategy);

    passport.serializeUser((user, done) => {
        done(null, user);
    });
      
    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });

    routes.use('/test', Test);
    routes.use('/auth', Auth);
    routes.use('/user', User);
    
    app.use(routes);

    

    app.get("/", async (req, res) => {
        res.status(200).send("Welcome to Nodejs-redis home page");
    });

    app.listen(APP_PORT, async () => {
        console.log(`Running on ${APP_PORT}...`);
        console.log(`Nodejs-redis server started open http://localhost:${APP_PORT}`);
    });
})();