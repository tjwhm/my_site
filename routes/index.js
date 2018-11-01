var express = require('express');
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/htmls/welcome.html'));
});

router.get('/assets/ic_code.png', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/assets/ic_code.png'));
});

router.get('/jenkins_404', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/htmls/404/jenkins_404.html'));
});

router.get('/puzzle', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/htmls/puzzle/puzzle.html'));
});

router.get('/gallery', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/htmls/gallery/gallery.html'));
});
module.exports = router;
