const models = require('../models');
const {gt, lt} = models.Sequelize.Op;

let timeFrames = [
    '09:45', '10:00',  '10:30',  '11:00',  '11:30', '16:00'
];

let store = [
    [], [], [], [], [], []
];

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

    //根据时间段 创建数组 用来存储交易
    return tradeLog.findAll({
        where: {

            entry_time: {
                [gt]: new Date('2018-06-01'),
                [lt]: new Date('2018-07-01')
            }
        }
    })
        .then(function(arr) {

            //指定日期范围

            //各个时间段的  win次数   lose次数   总盈利情况
            for (let item of arr) {
                item = item.toJSON();

                let exitTime = item['entry_time'];
                let index = figureOutWhichTimeFrameTheTradeBelongsto(exitTime);

                store[index].push(item);

                //console.log(Object.prototype.toString.call( item.entry_time));
            }

            for (let i = 0; i < store.length; i++) {
                let res = analyseTrade(store[i]);
                console.log('////////////////////////' + timeFrames[i] + '////////////////////////');
                console.log('total trade  ' + store[i].length);
                console.log('win ' + res.winNum);
                console.log('lose ' + res.loseNum);
                console.log('profit ' + res.profit);
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
            winNum,
            loseNum,
            profit
        }
    }

    function figureOutWhichTimeFrameTheTradeBelongsto(exitTime) {

        for (let i = 0; i < timeFrames.length; i++) {

            let exitTimeDate = exitTime.getDate();
            let dstr = exitTime.getFullYear() + '-' + '0' + (exitTime.getMonth() + 1) + '-' +
                (exitTimeDate < 10 ? '0' +  exitTimeDate :  exitTimeDate) + 'T' + timeFrames[i] + ':00+08:00';

            //console.log('dstr ' +  dstr);
            let newDate = new Date(dstr);

            //console.log(newDate);

            if (exitTime < newDate) {
                return i;
            }
        }

        throw Error('交易时间错误');
    }
};

