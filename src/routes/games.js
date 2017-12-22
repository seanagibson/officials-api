const router = require('express').Router();
// const games = require('../db.js');
const game = require('../models/game');

module.exports = router;

// Get all games route
router.get('/', function(req, res, next) {
    game.findAll({
            include: [{ all: true }]
        })
        .then(res.send.bind(res))
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    game.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(game) {
            res.send(game)
        })
        .catch(next);
});

// Change one of the parameters of a game. Like assign an Ump. urlencoded
router.put('/:id', function(req, res, next) {
    const game = games[req.params.id];
    Object.assign(game, req.body);
    res.send(game);
})

//Create a new game
router.post('/', function(req, res, next) {
    game.create(req.body)
        .then(function(game) {
            res.send(game);
        })
})