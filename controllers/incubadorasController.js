var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

// Lista de incubadoras - index
router.get('/', ensureLoggedIn('/login?fail=true'), function (req, res, next) {
    global.conn.request().query`select * from incubadora`
        .then(result => {
            res.render('incubadoras/index', { incubadoras: result.recordset });
        }).catch(err => {
            console.dir(err);
        });
});

// create incubadora - GET
router.get('/create', function (req, res, next) {
    res.render('./incubadoras/create');
});

// create incubadora - POST
router.post('/create', function (req, res, next) {

    let codigo = req.body.desc;
    let status = 0;
    global.conn.request().query`insert into incubadora values(${desc},${status})`
        .then(result => {
            res.redirect('/incubadoras');
        }).catch(err => {
            console.log(err);
        })

});

// excluir incubadora

router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    global.conn.request().query`delete from incubadora where idIncubadora = ${id}`
        .then(resultado => {
            res.redirect('/incubadoras/');
        }).catch(err => {
            console.log(err);
        })
})

// incubadora details
router.get('/details/:id', function (req, res, next) {
    let id = req.params.id;
    global.conn.request().query`select * from incubadora where idIncubadora = ${id}`
        .then(result => {
            res.render('./incubadoras/details', { incubadora: result.recordset[0] });
            console.log(result.recordset[0]);
        }).catch(err => {
            console.log(err);
        })
});

// medição json
router.get('/medicao/:id', function (req, res, next) {
    let id = req.params.id;
    global.conn.request().query`select Max(idMedicao), temperatura, umidade from medicao where fkIncubadora = ${id} group by idMedicao, temperatura, umidade`
        .then(result => {
            res.json(result.recordset[0]);
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;