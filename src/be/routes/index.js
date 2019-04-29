const express = require('express');
const router = express.Router();


const storeTrade = require('../business/storeTrade');
const getTrade = require('../business/getTrade');
const analyseTrade = require('../business/analyseTrade');
const updateTrade = require('../business/updateTrade');
const customAnalyseTrade = require('../business/customAnalyseTrade');
const strategy = require('../business/strategy');
const tag = require('../business/tag');
const chart = require('../business/chart');

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
                    data: {
                        analyseRes: data
                    }
                })
            }
        )
        .catch(
            (err) => {
                console.error(err);
            }
        );
});

router.post('/api/updateEntryStrategyById', function(req, res, next) {

    updateTrade.updateEntryStrategyById(req.body.id, req.body.entryStrategyId)
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

router.post('/api/customAnalyseTrade', function(req, res, next) {
    customAnalyseTrade(req.body)
        .then((data) => {
            res.json({
                status: 0,
                data: data
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/getStrategies', function(req, res, next) {

    strategy.getStrategies()
        .then((data) => {
            res.json({
                status: 0,
                data: data
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/getTags', function(req, res, next) {

    tag.getAllTags()
        .then((data) => {
            res.json({
                status: 0,
                data: data
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/storeCharts', function(req, res, next) {

    chart.storeCharts(req.body)
        .then((data) => {
            res.json({
                status: 0,
                data: data
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});

router.post('/api/queryCharts', function(req, res, next) {

    chart.queryCharts(req.body)
        .then((data) => {
            res.json({
                status: 0,
                data: data
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});


router.post('/api/getChartById', function(req, res, next) {

    chart.getChartById(req.body.id)
        .then((data) => {
            res.json({
                status: 0,
                data: data
            });
        })
        .catch((e) => {
            res.json({
                status: -1,
                err: JSON.stringify(e)
            });
        });
});
const fs = require('fs');
const path = require('path');
const config = require('../config/settings');
router.get('/img/:year/:month/:day/:symbol', function(req, res, next) {

    let {year, month, day, symbol} = req.params;

    fs.readFile(path.join(config.imgBaseDir, year, month, `${year}-${month}-${day}-${symbol}.png`), (err, data) => {
        if (err) {
            console.error(err);
            fs.readFile(path.join(config.imgBaseDir, '404.jpg'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        } else {
            res.end(data);
        }
    });
});
module.exports = router;
