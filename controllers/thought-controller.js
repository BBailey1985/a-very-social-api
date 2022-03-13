const { Thought, User } = require("../models");

const thoughtController = {
  //get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate(
        {
          path: 'reactions',
          select: '-__v'
        })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get a thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate(
        {
          path: 'reactions',
          select: '-__v'
        })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //add a new thought
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .populate(
        {
          path: 'reactions',
          select: '-__v'
        })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  //remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: _id } },
        { new: true }
      );
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id!" });
          return;
      }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //add a reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, { $push: { reactions: body }}, { new: true, runValidators: true })
      .populate(
        {
          path: 'reactions',
          select: '-__v'
        })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  }
};

module.exports = thoughtController;
