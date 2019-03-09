const models = require('../models');

module.exports = function() {

    let tradeLog = models['trade_log'];

    return tradeLog.findAll({
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

            for (let item of arr) {
            }
        }).catch(function(err) {
            console.log(err);
        });
};