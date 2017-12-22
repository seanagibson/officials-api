const router = require('express').Router();
const Field = require('../models/field');

module.exports = router;

// get a Field
router.get('/', (req, res, next) => {
    Field.findAll()
        .then(res.send.bind(res))
        .catch(next)
});

// post a new Field
router.post('/', (req, res, next) => {
    Field.findOrCreate({
            where: req.body
        })
        .then(res.send.bind(res))
        .catch(next);
})

// get Field by id
router.get('/:id', (req, res, next) => {
    Field.findById(req.params.id)
        .then(res.send.bind(res))
        .catch(next);
});

// update the field of a game
// needs a fieldId prop in the req.body
router.put('/:id/field', (req, res, next) => {
    Game.findById(req.params.id)
        .then(foundGame => {
            if (!foundGame) res.sendStatus(404);
            return foundGame.setLocation(req.body.fieldId)
                // return foundGame.update({fieldId: req.body.fieldId})
        })
        .then(res.send.bind(res))
        .catch(next);
});