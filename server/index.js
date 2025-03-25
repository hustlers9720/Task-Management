import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/taskRoute.js';

dotenv.config();
connectDB()
const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is working!');
});

app.use('/task', router)

app.listen(5000, () => {
    console.log("API is working on port 5000");
});
