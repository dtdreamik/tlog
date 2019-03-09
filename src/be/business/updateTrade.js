const models = require('../models');

let tradeLog = models['trade_log'];

module.exports = {
    updateNotesById: function (id, notes) {
        return tradeLog.findById(id).then(tradeItem => {

            if (!tradeItem) {
                throw Error(`id为${id}的交易不存在`);
            }

            return tradeItem.update({
                notes: notes
            }).catch((e) => {
                console.error('updateNotesById error ' + JSON.stringify(e));
            });
        });
    },
    updateTradeImgById: function(id, tradeImg) {

        return tradeLog.findById(id).then(tradeItem => {

            if (!tradeItem) {
                throw Error(`id为${id}的交易不存在`);
            }

            return tradeItem.update({
                trade_img: tradeImg
            }).catch((e) => {
                console.error('updateTradeImgById error ' + JSON.stringify(e));
            });
        });
    },
    updateStopPriceById: function(id, stopPrice) {

        return tradeLog.findById(id).then(tradeItem => {

            if (!tradeItem) {
                throw Error(`id为${id}的交易不存在`);
            }

            return tradeItem.update({
                stop_price: stopPrice
            }).catch((e) => {
                console.error('updateStopPriceById error ' + JSON.stringify(e));
            });
        });
    },
    updateTargetPriceById: function(id, targetPrice) {

        return tradeLog.findById(id).then(tradeItem => {

            if (!tradeItem) {
                throw Error(`id为${id}的交易不存在`);
            }

            return tradeItem.update({
                target_price: targetPrice
            }).catch((e) => {
                console.error('updateTargetPriceById error ' + JSON.stringify(e));
            });
        });
    }
};