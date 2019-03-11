const express = require('express');
const router = express.Router();


const storeTrade = require('../business/storeTrade');
const getTrade = require('../business/getTrade');
const analyseTrade = require('../business/analyseTrade');
const updateTrade = require('../business/updateTrade');

router.post('/api/storeTrade', function(req, res, next) {

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

router.post('/api/updateNotesById', function(req, res, next) {

    updateTrade.updateNotesById(req.body.id, req.body.notes)
        .then(() => {
            res.json({
                status: 0
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/updateTradeImgById', function(req, res, next) {

    updateTrade.updateTradeImgById(req.body.id, req.body.tradeImg)
        .then(() => {
            res.json({
                status: 0
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/updateStopPriceById', function(req, res, next) {

    updateTrade.updateStopPriceById(req.body.id, req.body.stopPrice)
        .then(() => {
            res.json({
                status: 0
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/updateTargetPriceById', function(req, res, next) {

    updateTrade.updateTargetPriceById(req.body.id, req.body.targetPrice)
        .then(() => {
            res.json({
                status: 0
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/updateNeedReviewById', function(req, res, next) {

    updateTrade.updateNeedReviewById(req.body.id, req.body.needReview)
        .then(() => {
            res.json({
                status: 0
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

module.exports = router;
