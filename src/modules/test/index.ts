import express from 'express';
import axios from 'axios';

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

export default app;