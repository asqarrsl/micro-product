import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  const port = 8081;
  if (!process.env.JWT_KEY) {
    process.env.JWT_KEY = "secret550"
    // throw new Error('JWT_KEY should be added as an environment variable');
  }
  if (!process.env.MONGO_URI) {
    process.env.MONGO_URI="mongodb+srv://cmt:admin123@cluster0.yjsmx.mongodb.net/cmt_testing123?retryWrites=true&w=majority"
    // throw new Error('MONGO_URI should be added as an environment variable');
  }
 
  try {
    await mongoose.connect(process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
  }
  catch (err){
    console.error(err);
  }
  
  app.listen(port,  "0.0.0.0",() => {
    console.log('http://localhost:'+port);
  });
};

start();