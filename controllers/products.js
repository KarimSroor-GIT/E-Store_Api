const { query } = require('express');
const productModel = require('../models/product');
const product = require('../models/product');
const { search } = require('../routes/products');

//Postman testing route
const getAllProductsStatic = async (req, res) => {
	const products = await product.find({ featured: true, page: 2 });
	res.status(200).json({ products, nbHits: products.length });
};

//products route
const getAllProducts = async (req, res) => {
	const { featured, company, name } = req.query;
	const queryObject = {};

	if (featured) queryObject.featured = featured === 'true' ? true : false;
	if (company) queryObject.company = company;
	if (name) queryObject.name = { $regex: name, $options: 'i' };

	console.debug(queryObject);

	const products = await productModel.find(queryObject);
	res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
