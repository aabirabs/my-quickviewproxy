import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import fetch  from 'node-fetch';
import cors from 'cors';
import morgan from 'morgan'


const app = express();
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());

app.post('/graphql', async (req, res) => {
    console.log(process.env.GRAPHQL_ENDPOINT)
    console.log(process.env.LANSWEEPER_IDENTITY_CODE)
    const response = await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${process.env.LANSWEEPER_IDENTITY_CODE}`
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => {
    console.log('Proxy is running on port 3000');
});
