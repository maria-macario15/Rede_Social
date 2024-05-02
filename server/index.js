import express from "express";
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/post.js;'
import bodyParser from "body-parser";
import cors from "cors"


const app = express();
const porta = 5000;

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())


app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/post',postRouter);




app.listen(porta,()=>{
    console.log(`servidor rodando na posta ${porta} `);

})