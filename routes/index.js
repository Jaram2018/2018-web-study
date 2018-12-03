var router = require('express').Router();
var mongoose = require('mongoose');


//Index
router.get('/', function(req, res, next){
        res.render('index');
    });

module.exports = router;