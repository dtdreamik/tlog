const models = require('../models');
const {gt, lt} = models.Sequelize.Op;

let timeFrames;

let store;

module.exports = function(data) {

    let tradeLog = models['trade_log'];

    let {trade_times_start, trade_times_end, date_range} = data;
    //根据时间段 创建数组 用来存储交易

    trade_times_start = parseInt(trade_times_start);
    trade_times_end = parseInt(trade_times_end);

    let queryObj = {};

    if (date_range) {
        queryObj.entry_time = {
            [gt]: new Date(date_range[0]),
            [lt]: new Date(date_range[1] + ' 23:00:00')
        };
    }

    return tradeLog.findAll({
        where: queryObj,
        include: [
            {
                model: models.scale_in
            },
            {
                model: models.scale_out
            }
        ]
    })
        .then(function(arr) {

            let res = {};

            //按 股票+日期作为key  统计次数
            for (let item of arr) {
                item = item.toJSON();

                let date = item.entry_time.split(' ')[0];
                if (!res[item.symbol + '-' + date]) {
                    res[item.symbol + '-' + date] = [];
                }
                res[item.symbol + '-' + date].push(item);
            }

            let newArr = [];
            for (let key in res) {
                if (res[key].length >= trade_times_start && res[key].length <= trade_times_end) {
                    newArr.push.apply(newArr, res[key]);
                }
            }
            let analyseRes = analyseTrade(newArr);

            return {
                'all': {
                    analyseRes: analyseRes,
                    trades: newArr
                }
            }
        }).catch(function(err) {
            console.log(err);
        });


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

};

