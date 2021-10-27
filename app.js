require('dotenv').config();
require('express-async-errors');
const connect = require('./db/connect');
const productRouter  =  require('./routes/products');

//async errors


const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const { application } = require('express');



//root route
app.get('/', (req,res)=>{
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Api</a>')
})
 
//products route
app.use('/api/v1/products',productRouter)

//middleware
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000

const start = async()=> {
  try
  {
    await connect(process.env.development_DB_URL)
                    .then( ()=>{
                      console.debug('connected to Mungo DB ...');
                      app.listen(port,()=>{
                        console.debug('app listening on port ',port)
                      })
                    })
  }catch(err){
      console.debug(`error ocurred while connecting to DB, ${err}`) ;
  }
}

start();