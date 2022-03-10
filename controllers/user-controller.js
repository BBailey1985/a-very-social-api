const { User } = require('../models');

const pizzaController = {
  //get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
    .populate({
      path: 'comments',
      select: '-__v'
    })
    .select('-__v')
    .sort({ __id: -1 })
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //get one pizza
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
    .populate({
      path: 'comments',
      select: '-__v'
    })
    .select('-__v')
    .then(dbPizzaData => {
      //if no pizza data, send 404
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //create a pizza
  createPizza({ body }, res) {
    Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
  },

  //update a pizza
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new:true, runValidators: true })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
  },

  //delete a pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController