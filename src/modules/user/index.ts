import express from 'express';
import { UserSchema } from '../user/user.model';
import { hashPassword } from '../../utils/password';

const app = express.Router();

app.post("/create", async (req, res) => {
    try {
        const body = {
            ...req.body,
            password: await hashPassword(req.body.password)
        };
        const userData = new UserSchema(body)
        await userData.save();
        res.status(200).send(userData);	
    } catch(err: any) {
       res.status(500).send({message: err.message});
    }
});

export default app;