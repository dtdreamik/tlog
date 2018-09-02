const express = require('express');
const router = express.Router();


const storeTrade = require('../business/storeTrade');
const getTrade = require('../business/getTrade');
const analyseTrade = require('../business/analyseTrade');

router.post('/api/storeTrade', function(req, res, next) {

    console.log('/api/storeTrade');

    if (!req.body.tradeHTML) {
        res.json({
            status: 1,
            msg: '交易数据必传'
        });
        return;
    }

    storeTrade(req.body.tradeHTML)
        .then(() => {
            res.json({
                status: 0
            });
        }).catch((err) => {
            console.error('存储交易数据失败');
            console.error(err);
            res.json({
                status: 1,
                msg: '存储交易数据失败'
            });
        });
});


router.get('/api/getTradeList', function(req, res, next) {

    getTrade()
        .then(
            () => {
                res.json({
                    status: 0
                })
            }
        );
});

router.post('/api/analyseTrade', function(req, res, next) {

    analyseTrade(req.body)
        .then(
            (data) => {
                res.json({
                    status: 0,
                    data: data
                })
            }
        ).catch(
            (err) => {
                console.error(err);
            }
        );
});

module.exports = router;
