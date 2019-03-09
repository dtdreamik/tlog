
const DomParser = require('dom-parser');
const parser = new DomParser();
const models = require('../models');


const index = {
    symbol: 0,
    time: 1,
    qty: 2,
    price: 3,
    com: 4
};

function extractData(tradeHTML) {

    let tradesArr = [];

    let dom = parser.parseFromString(tradeHTML);
    let tradesNodeList = dom.getElementsByClassName('row-summary');

    for (let tradesNodeItem of tradesNodeList) {
        let tds = tradesNodeItem.getElementsByTagName('td');
        let symbol = tds[0].innerHTML.trim();
        //2018-05-09, 09:56:09
        let rawDate = tds[1].innerHTML.trim();
        rawDate = rawDate.split(',');

        let time = new Date(rawDate[0].trim() + 'T' + rawDate[1].trim());
        //let time = new Date(rawDate[0].trim());
        let qty = parseInt(tds[2].innerHTML.replace(/,/g, '').trim());
        let price = parseFloat(tds[3].innerHTML.trim());
        let com = parseFloat(tds[6].innerHTML.trim());
        tradesArr.push([symbol, time, qty, price, com]);
    }

    return formatData(classifyTradesByPerTrade(tradesArr));
}

/*
[   tradesArr
    [   trade
        [symbol1, ],
        [symbol2, ],
    ],
    [
        [symbol3, ],
        [symbol4, ],
    ],
]
 */
function formatData(tradesArr) {

    let res = [];

    let scaleIn = [];
    let scaleOut = [];

    for (let trade of tradesArr) {

        let symbol;
        let longShort;

        let entryTime;
        let exitTime;

        let entryQty;
        let entryPrice;
        let exitQty;
        let exitPrice;
        //symbol, time, qty, price, com
        let isScaleIn;
        let fees = 0;

        for (let i = 0; i < trade.length; i++) {


            if (i === 0) {
                //确定是long  还是  short
                symbol = trade[i][index.symbol];
                longShort = trade[i][index.qty] < 0 ? 'short' : 'long';
                isScaleIn = trade[i][index.qty];
                fees = 0;
            }

            let scaleObj = {
                symbol: trade[i][index.symbol],
                time: trade[i][index.time],
                qty: trade[i][index.qty],
                price: trade[i][index.price],
                fees: trade[i][index.com]
            };

            trade[i][index.qty] * isScaleIn > 0 ? scaleIn.push(scaleObj) : scaleOut.push(scaleObj);

            if ( i === trade.length - 1) {

                //计算tradelog表 需要的一些字段

                let totalEntryQty = 0;
                let totalEntryAmount = 0;
                for (let m = 0; m < scaleIn.length; m++) {

                    if (m === 0) {
                        entryTime = scaleIn[m].time;
                    }

                    totalEntryQty += scaleIn[m].qty;
                    totalEntryAmount += scaleIn[m].price * scaleIn[m].qty;
                    fees += scaleIn[m].fees;
                    if (m === scaleIn.length - 1) {

                        entryPrice = totalEntryAmount / totalEntryQty;
                        entryQty = totalEntryQty;
                    }
                }

                let totalExitQty = 0;
                let totalExitAmount = 0;
                for (let n = 0; n < scaleOut.length; n++) {

                    if (n === 0) {
                        exitTime = scaleOut[n].time;
                    }

                    totalExitAmount += scaleOut[n].price * scaleOut[n].qty;
                    totalExitQty += scaleOut[n].qty;
                    fees += scaleOut[n].fees;

                    if (n === scaleOut.length - 1) {

                        exitPrice = totalExitAmount / totalExitQty;
                        exitQty = totalExitQty;
                    }
                }

                let profit = (entryQty * entryPrice + exitQty * exitPrice) * -1 + fees;

                res.push({
                    tradeLog : {
                        symbol,
                        long_short: longShort,
                        profit,
                        entry_time: entryTime,
                        exit_time: exitTime,
                        entry_qty: entryQty,
                        entry_price: entryPrice,
                        exit_qty: exitQty,
                        exit_price: exitPrice,
                        fees
                    },
                    scaleIn: [...scaleIn],
                    scaleOut: [...scaleOut]
                });

                scaleIn.length = scaleOut.length = 0;
            }
        }
    }

    roundDecimals(res);

    return res;

    function roundDecimals(res) {
        //数组
        if (isArray(res)) {
            for (let i = 0; i < res.length; i++) {
                if (typeof res[i] === 'number' && isDecimals(res[i])) {

                    res[i] = round(res[i]);

                } else if (isObjectOrArray(res[i])) {
                    roundDecimals(res[i]);
                }
            }
        } else if (isObject(res)) {

            for (let key in res) {

                if (typeof res[key] === 'number' && isDecimals(res[key])) {

                    res[key] = round(res[key]);

                } else if (isObjectOrArray(res[key])) {
                    roundDecimals(res[key]);
                }
            }
        }

        function isObjectOrArray(data) {

            let res = Object.prototype.toString.call(data);

            return res === '[object Array]' || res === '[object Object]';
        }

        function isObject(data) {
            return Object.prototype.toString.call(res) === '[object Object]';
        }

        function isArray(data) {
            return Object.prototype.toString.call(res) === '[object Array]';
        }

        function isDecimals(n) {

            n = n + '';

            return n.indexOf('.') > -1;
        }

        function round(n) {
            return Math.round(n * 100) / 100;
        }
    }
}

function classifyTradesByPerTrade(tradesArr) {

    let qty = 0;
    let currentSymbol;
    let classifiedTradesArr = [];
    let tempArr = [];

    for (let i = 0; i < tradesArr.length; i++) {

        qty += tradesArr[i][index.qty];
        let symbol = tradesArr[i][index.symbol];

        tempArr.push(tradesArr[i]);

        if (i === 0) {
            currentSymbol = symbol;
        }

        if (qty === 0) {
            //确定一笔交易
            classifiedTradesArr.push(tempArr);
            tempArr = [];
        } else if (symbol !== currentSymbol && tempArr.length > 1) {
            throw Error('有当天未清0的symbol 重新整理数据');
        }
        currentSymbol = tradesArr[i][index.symbol];

        //TODO 只交易了 一个symbol 当天未清0的情况

    }
    return classifiedTradesArr;
}

module.exports = function(tradeHTML) {

    let tradesData = extractData(tradeHTML);

    let promises = [];

    for (let trade of tradesData) {

        trade.tradeLog.entry_strategy_id = 1;
        trade.tradeLog.exit_strategy_id = 1;

        let tradeLog = models['trade_log'].build(trade.tradeLog);

        let scaleIn = models['scale_in'].build(trade.scaleIn);
        let scaleOut = models['scale_out'].build(trade.scaleOut);

        let scaleInArr = [];
        let scaleOutArr = [];
        promises.push(tradeLog.save()
            .then(() => {
                return models['scale_in'].bulkCreate(trade.scaleIn);
            }, (err) => {
                console.log(err);
                throw Error('tradeLog.save err');
            })
            .then((arr) => {
                tradeLog.setScale_ins(arr);
                return models['scale_out'].bulkCreate(trade.scaleOut);
            }, (err) => {
                console.log(err);
                throw Error('models[\'scale_in\'].bulkCreate err');
            })
            .then((arr) => {
                tradeLog.setScale_outs(arr);
            }, (err) => {
                console.log(err);
                throw Error('models[\'scale_out\'].bulkCreate err');
            })
            .catch((err) => {
                console.log(err);
            })
        );
    }

    return Promise.all(promises);

};