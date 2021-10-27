const mongoose = require ('mongoose');
const productSchema = mongoose.Schema({
  name:{ type:String,required:[true,'product name is required'] },
  price:{ type:Number,required:[true,'price  is required'] },
  featured:{ type:Boolean,default:false },
  rating:{type:Number,default:0.0},
  createdAt:{type:Date, default:Date.now()},
  company:{
    type:String,
    enum:{values:['ikea','liddy','caressa','marcos'], message :'VALUE is not supported'}
  }
  
})

const productModel = mongoose.model('Product',productSchema);

module.exports = productModel