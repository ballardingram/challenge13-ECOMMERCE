const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require ('../../config/connection');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log('=== GET ALL CATEGORIES & ASSOCIATED PRODUCT NAME ===');
  Category.findAll({
    attributes:['id', 'category_name'],
    include: [
       {
         model: Product,
         attributes: ['product_name']
       }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log('=== GET SINGLE CATEGORY BY ID & ASSOCIATED PRODUCT NAME ===');
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    order: [['id']],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({mesasge: 'Unable to find a category with that ID.'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.json(500).json(err);
  });
});;

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => res.json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message:'Unable to update a category with that ID. REASON: ID not found.'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'Unable to delete a category with that ID. REASON: ID not found.'})
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
