var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET index
router.get('/',function(req,res,next) {
    res.render('index', { message: null });
});

// GET login render
router.get('/login',function(req,res,next) {
    res.render('login', { message: null });
});

// GET login redireciona se nao conectar
router.get('/login',function(req,res,next) {
    if(req.query.fail)
        res.render('login',{ message: 'Usuário e/ou senha incorretos!'});
    else
        res.render('login',{ message: null });
});

// POST login
router.post('/login',
    passport.authenticate('local',{ failureRedirect: '/login'}),
    function(req,res) {
        res.redirect('/incubadoras');
    });

module.exports = router;