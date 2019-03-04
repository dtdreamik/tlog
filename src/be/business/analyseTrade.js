const models = require('../models');
const {gt, lt} = models.Sequelize.Op;

let timeFrames;

let store;

module.exports = function(data) {

    /*
    let data = {
                strategy: 1,
                long_short: '',
                day_of_week: 1,
                date_range: ['2018-7-2 18:00', ''],
                time_ranges: [
                    ['09:30', '10:30'],
                    ['10:31', '11:30']
                ]
            };
     */

    console.log('analyse trade');

    let tradeLog = models['trade_log'];

    let {strategy, long_or_short, day_of_week, date_range, time_ranges} = data;
    //根据时间段 创建数组 用来存储交易

    let queryObj = {};

    if (strategy) {
        queryObj.entry_strategy_id = strategy;
    }

    if (long_or_short) {
        queryObj.long_short = long_or_short;
    }

    if (day_of_week) {
       // queryObj.day_of_week = day_of_week;
    }

    console.log(date_range[1]);

    if (date_range) {
        queryObj.entry_time = {
            [gt]: new Date(date_range[0]),
            [lt]: new Date(date_range[1] + ' 23:00:00')
        };
    }

    return tradeLog.findAll({
        where: queryObj,
        order: [
            'entry_time'
        ]
    })
        .then(function(arr) {

            //指定日期范围
            initStoreAndTimeFrames(data.time_ranges);

            //各个时间段的  win次数   lose次数   总盈利情况
            for (let item of arr) {
                item = item.toJSON();

                let exitTime = item['entry_time'];
                let index = figureOutTimeFrameWhichTheTradeBelongsTo(exitTime);

                if (index > -1) {
                    store[timeFrames[index][0] + '-' + timeFrames[index][1]].push(item);
                }
                //console.log(Object.prototype.toString.call( item.entry_time));
            }

            let total = {};

            for (let timeRange in store) {

                let res = analyseTrade(store[timeRange]);
                console.log('////////////////////////' + timeRange + '////////////////////////');
                console.log('total trade  ' + store[timeRange].length);
                console.log('win ' + res.winNum);
                console.log('lose ' + res.loseNum);
                console.log('profit ' + res.profit);

                total[timeRange] = {
                    analyseRes: res,
                    trades: store[timeRange]
                };
            }

            return total;

        }).catch(function(err) {
            console.log(err);
        });

    function initStoreAndTimeFrames(time_ranges) {

        timeFrames = [];

        store = {};

        if (!time_ranges) {
            timeFrames.push(['09:30', '16:30']);
            store['09:30-16:30'] = [];
        } else {
            for (let time_range of time_ranges) {
                timeFrames.push([time_range[0], time_range[1]]);
                store[time_range[0] + '-' + time_range[1]] = [];
            }
        }
    }

    function analyseTrade(trades) {

        // win次数   lose次数   总盈利情况

        let winNum = 0;
        let loseNum = 0;
        let totalNum = trades.length;
        let profit = 0;

        for (let trade of trades) {
            if (trade.profit >= 0) {
                winNum++;
            } else {
                loseNum++;
            }
            profit += trade.profit;
        }
        return {
            totalNum,
            win: winNum,
            lose: loseNum,
            totalProfit: profit,
            rate: winNum / totalNum * 100
        }
    }

    function figureOutTimeFrameWhichTheTradeBelongsTo(exitTime) {

        exitTime = new Date(exitTime);

        for (let i = 0; i < timeFrames.length; i++) {

            let exitTimeDate = exitTime.getDate();

            let newStartTime;
            let newEndTime;

            newStartTime = exitTime.getFullYear() + '-' +
                ((exitTime.getMonth() + 1) > 9 ? '' : '0') + (exitTime.getMonth() + 1) + '-' +
                (exitTimeDate < 10 ? '0' +  exitTimeDate :  exitTimeDate) + 'T' + timeFrames[i][0] + ':00+08:00';

            newEndTime = exitTime.getFullYear() + '-' +
                ((exitTime.getMonth() + 1) > 9 ? '' : '0') + (exitTime.getMonth() + 1) + '-' +
                (exitTimeDate < 10 ? '0' +  exitTimeDate :  exitTimeDate) + 'T' + timeFrames[i][1] + ':00+08:00';

            //console.log('dstr ' +  dstr);
            newStartTime = new Date(newStartTime);
            newEndTime = new Date(newEndTime);

            //console.log(newDate);

            if (exitTime <= newEndTime && exitTime >= newStartTime) {
                return i;
            }

        }

        return -1;
    }
};

