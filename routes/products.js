const express = require('express');
const router = express.Router('');

const {
	getAllProducts,
	getAllProductsStatic,
} = require('../controllers/products');

router.route('/').get(getAllProducts);

//static route for testing purpose only
router.route('/static').get(getAllProductsStatic);

module.exports = router;
