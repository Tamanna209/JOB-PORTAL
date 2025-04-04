import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import  userRoute from './routes/user.route.js';
import companyRoute from "./routes/company.route.js";
import jobRoute from  './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
dotenv.config({});
const app=express();



//middkweares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const corsOptions = {
  origin:'http://localhost:5176',
  credentials:true
}

app.use(cors(corsOptions));

const PORT= process.env.PORT || 8000;


app.use("/api/v1/user" , userRoute);

app.use('/api/v1/company' ,  companyRoute);

app.use('/api/v1/job', jobRoute);


app.use('/api/v1/applications', applicationRoute);

app.listen(PORT , ()=>{
    connectDb();
    console.log(`Server is running on http://localhost:${PORT}`);
})