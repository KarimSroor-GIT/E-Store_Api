const product = require('../models/product');

//Postman testing route
const getAllProductsStatic = async (req, res) => {
	const products = await product
		.find({ featured: true }) // filter products
		.select('name price') // select returned fields
		.sort('-price name') // sort products
		.skip(1) // skip first item
		.limit(5); // return max 5 items in result

	res.status(200).json({ products, nbHits: products.length });
};

//products route
const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query;
	const queryObject = {};

	// search criteria
	if (featured) queryObject.featured = featured === 'true' ? true : false;
	if (company) queryObject.company = company;
	if (name) queryObject.name = { $regex: name, $options: 'i' };
	//numeric filters
	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte',
		};
		const regEx = /\b(<|>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);
		const options = ['price', 'rating'];
		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}
	console.debug('queryObject: ', queryObject);
	//select params
	let feildList = '';
	if (fields) {
		feildList = fields.split(',').join(' ');
	}
	console.debug('feildList: ', feildList);

	// sort params
	let sortList = '';
	if (sort) {
		sortList = sort.split(',').join(' ');
	}
	console.debug('sortList: ', sortList);

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	const products = await product
		.find(queryObject)
		.select(feildList)
		.sort(sortList)
		.skip(skip)
		.limit(limit);

	res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
