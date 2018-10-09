
var express = require('express');
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname,'../public/welcome.html'));
});

router.get('/assets/ic_code.png', function (req, res, next) {
    res.sendFile(path.resolve(__dirname,'../public/assets/ic_code.png'));
});

module.exports = router;