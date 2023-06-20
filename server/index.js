import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.router.js';
import userRouter from "./routes/user.router.js";

const app = express();
dotenv.config();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

