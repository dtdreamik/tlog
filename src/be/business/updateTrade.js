const models = require('../models');

let tradeLog = models['trade_log'];

module.exports = {
    updateEntryStrategyById: function (id, entryStrategyId) {
        return tradeLog.findById(id).then(tradeItem => {

            if (!tradeItem) {
                throw Error(`id为${id}的交易不存在`);
            }

            return tradeItem.update({
                entry_strategy_id: entryStrategyId
            }).catch((e) => {
                console.error('updateEntryStrategyById error ' + JSON.stringify(e));
            });
        });
    },
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
    },

    updateNeedReviewById: function(id, needReview) {

        return tradeLog.findById(id).then(tradeItem => {

            if (!tradeItem) {
                throw Error(`id为${id}的交易不存在`);
            }

            return tradeItem.update({
                need_review: needReview
            }).catch((e) => {
                console.error('updateNeedReviewById error ' + JSON.stringify(e));
            });
        });
    }
};