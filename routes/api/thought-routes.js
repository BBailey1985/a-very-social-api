const router = require('express').Router();
const { getAllThought, 
        getThoughtById,
        addThought,
        updateThought,
        removeThought,
        addReaction,
        removeReaction } = require('../../controllers/thought-controller');

// GET all thoughts at api/thoughts
router.route('/').get(getAllThought);

//GET, PUT. and DELETE thought by id at api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought);

//POST thought to user id at api/thoughts/:userId
router.route('/:userId').post(addThought);

//POST a reaction to a thought at api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//DELETE a reaction at api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router