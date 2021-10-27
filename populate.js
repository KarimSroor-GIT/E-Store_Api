require('dotenv').config();

const connectDB = require('./db/connect');

const ProductModel = require('./models/product');

const ProductList_Json= require('./products.json');

const start = async()=>{
  try{
    await connectDB(process.env.development_DB_URL)
    await ProductModel.deleteMany();
    await ProductModel.create(ProductList_Json);
    console.debug('connected to db and uploaded products data')
    process.exit(0);
  }catch(err){
    console.debug(err);
    process.exit(1)
  }
}

start();