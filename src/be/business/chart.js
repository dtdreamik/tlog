const models = require('../models');

const chart = models.chart;

module.exports = {
    storeCharts: function(data) {

        return chart.create(data).then(function(chartIns) {
            let tags = data.tags;
            tags && tags.forEach(function(tag) {
                chartIns.addTags(tag);
            });

            let entryStrategies = data.entryStrategies;
            entryStrategies && entryStrategies.forEach(function(entryStrategy) {
                chartIns.addEntry_strategy(entryStrategy);
            });
        });
    }
};