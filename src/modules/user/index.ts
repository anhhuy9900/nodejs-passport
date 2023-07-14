import express from 'express';
import { UserModel, IUserDocument } from '../user/user.model';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateJwt } from '../../utils/jwt';

const app = express.Router();

app.post("/create", async (req, res) => {
    try {
        const body = {
            ...req.body,
            password: await hashPassword(req.body.password)
        };
        const userData = new UserModel(body)
        await userData.save();
        res.status(200).send(userData);	
    } catch(err: any) {
       res.status(500).send({message: err.message});
    }
});

app.post("/login", async (req, res) => {
    try {
        const filter = {
            email: req.body.email,
        };
        
        const user = await UserModel.findOne(filter) as IUserDocument;

        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }

        if (!(await comparePassword(req.body.password, user.password))) {
            return res.status(404).send({ message: 'Password is wrong' });
        }

        const token = generateJwt(user);

        res.status(200).send({
            user,
            token
        });	
    } catch(err: any) {
       res.status(500).send({message: err.message});
    }
});

export default app;