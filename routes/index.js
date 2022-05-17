const router = require('express').Router();
const { Product } = require('../models');
const apiRoutes = require('./api');
const CategoryRoutes = require ('./api/category-routes');
const ProductRoutes = require ('./api/product-routes');
const TagRoutes = require ('./api/tag-routes');

router.use('/api', apiRoutes);
router.use('/api', CategoryRoutes);
router.use('/api', ProductRoutes);
router.use('/api', TagRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;