import express from 'express';
import axios from 'axios';
import { FacebookStrategy } from '../../lib/facebook';

const app = express.Router();

app.get("/", async (req, res) => {
    try {
        const data = {};
        res.header("Content-Type",'application/json');
        res.status(200).send(data);	
    } catch(err: any) {
        res.status(500).send({message: err.message});
    }
});


app.get("/facebook", async (req, res) => {
    try {
        console.log("🚀 ----------------------------------------------🚀");
        console.log("🚀 ~ facebook ~ app.get ~ req:", 1);
        const facebook = new FacebookStrategy({});
        await facebook.getAccessToken();
        // const test = await facebook.authenticate(req);
        // console.log("🚀 ----------------------------------------------🚀");
        // console.log("🚀 ~ facebook ~ app.get ~ test:", test);

        res.status(200).send();	
    } catch(err: any) {
        res.status(500).send({message: err.message});
    }
});
export default app;