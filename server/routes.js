const express = require('express');
const router = express.Router();

router
    .use(function timeLog (req, res, next) {
        console.log('Time: ', Date.now());
        next()
    })

router
    .route('/')
    .get(function (req, res) {
        res.render('index')
    })
    .post(function (req, res) {
        //code to handle...
        res.send('A project was added')
    })
    .put(function (req, res) {
        //code to handle...
        res.send('A project was added')
    })
    .delete(function (req, res) {
        //code to handle...
        res.send('A project was deleted')
    });

router
    .route('/contact')
    .get(function (req, res) {
        res.render('contact')
    });

router
    .route('/thanks')
    .post(function (req, res) {
        res.render('thanks', { contact: req.body})
    });

module.exports = router