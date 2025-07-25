import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectToDB from './config/mongooseConfig';

import bookRouter from './routes/book.routes';
import chapterRouter from './routes/chapter.routes';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import commentRouter from './routes/comment.routes';
import { checkAndSeedDatabase } from './utils/seed.utils';
import checkAndInitializeAdmin from './utils/adminInitializer.utils';
import dns from 'dns';

//uncomment this if there is dns issue while connecting to mongodb
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS 

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// Enable CORS for all origins
app.use(cors()); // This allows all origins by default

app.use( ('/api'), authRouter);
app.use( ('/api'), userRouter);
app.use( ('/api'), bookRouter);
app.use( ('/api'), chapterRouter);
app.use( ('/api'), commentRouter);

async function startServer() {
    try {
        await connectToDB();

        await checkAndSeedDatabase();
        await checkAndInitializeAdmin();
        
        app.listen (PORT, ()=>{
            console.log(`Server running at http:///localhost:${process.env.PORT}`);
        } );
    } catch (error) {
        console.error(' Failed to start server: ', error);
        process.exit(1);
    }
}

startServer();
