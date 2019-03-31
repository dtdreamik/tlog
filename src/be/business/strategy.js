const models = require('../models');

const entryStrategy = models.entry_strategy;
const exitStrategy = models.exit_strategy;

module.exports = {
    getEntryStrategies: function() {
        return entryStrategy.findAll();
    },
    getExitStrategies: function() {
        return exitStrategy.findAll();
    },
    getStrategies: function() {
        return Promise.all([this.getEntryStrategies(), this.getExitStrategies()])
            .then((datas) => {
                return {
                    entryStrategies: datas[0],
                    exitStrategies: datas[1]
                }
            });
    }
};