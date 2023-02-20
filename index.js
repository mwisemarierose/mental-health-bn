import express from "express";
import bodyParser from "body-parser";
import mongoConnect from './src/config/db.config.js'
import dotenv from 'dotenv'
import router from "./src/routers/index.js";
import cors from 'cors'
dotenv.config()

const port = 3000;


const app = express();
mongoConnect();

app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.get('/', (req, res) => {
    res.status(200).json({
        message: "let's get started ",
        status: 200
    })
});

app.use('/api/v1', router)

app.use((req, res) => {
    res.status(404).json({
        message: "endpoint not found",
        status: 404
    })
})

app.listen(port, console.log(`server is running on http:/localhost:${port}`))