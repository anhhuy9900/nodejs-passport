import express from 'express';
import passport from 'passport';

const app = express.Router();

app.post("/login-local-strategy", passport.authenticate('local'), async (req, res) => {
    try {
        res.status(200).send('Login successfully');	
    } catch(err: any) {
       res.status(500).send({message: err.message});
    }
});

export default app;