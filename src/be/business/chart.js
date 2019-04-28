const models = require('../models');

const chart = models.chart;
const {gt, lt} = models.Sequelize.Op;

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
    },
    queryCharts: function(data) {
        let { symbol, date_range, strategy, tags } = data;

        let queryObj = {};

        if (symbol) {
            queryObj.symbol = symbol;
        }

        if (date_range) {
            queryObj.date = {
                [gt]: new Date(date_range[0]),
                [lt]: new Date(date_range[1] + ' 23:00:00')
            };
        }

        let tagQueryObj = null;
        if (tags && tags.length > 0) {
            tagQueryObj = {};
            tagQueryObj.id =  {in: tags};
        }

        let includeTagArr = [];

        if (tagQueryObj) {
            includeTagArr.push({
                model: models.tag,
                where: tagQueryObj
            });
        }

        let entrystrategyQueryObj = null;
        if (strategy) {
            entrystrategyQueryObj = {};
            entrystrategyQueryObj.id = strategy;
        }
        let includeEntrystrategyArr = [];

        if (entrystrategyQueryObj) {
            includeEntrystrategyArr.push({
                model: models.entry_strategy,
                where: entrystrategyQueryObj
            });
        }

    }
};