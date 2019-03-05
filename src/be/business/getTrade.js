const models = require('../models');

module.exports = function() {
    console.log('getTrade');

    let tradeLog = models['trade_log'];

    return tradeLog.findAll()
        .then(function(arr) {

            //console.log(arr);
            for (let item of arr) {

                console.log(item.toJSON());
            }
        }).catch(function(err) {
            console.log(err);
        });
};