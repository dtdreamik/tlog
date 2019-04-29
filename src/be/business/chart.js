const models = require('../models');

const chart = models.chart;
const {gt, lt} = models.Sequelize.Op;

module.exports = {
    storeCharts: function(data) {

        //判断是新增还是编辑
        if (data.id) {
            return chart.find({
                where: {
                    id: data.id
                }
            }).then(function (chartIns) {
                return Promise.all([chartIns.update(data), chartIns.getTags(), chartIns.getEntry_strategies()]);

            }).then(function (vals) {
                let chartIns = vals[0];
                let tags = vals[1];
                let entry_strategies = vals[2];

                let deleteTagIds =[];
                tags.forEach(function (item) {
                    let has = false;
                    data.tags.forEach(function (t) {
                        if (t == item.id) {
                            has = true;
                        }
                    })

                    if (!has) {
                        deleteTagIds.push(item.id);
                    }
                });

                let deleteEntry_strategiesIds = [];
                entry_strategies.forEach(function (item) {
                    let has = false;
                    data.entryStrategies.forEach(function (t) {
                        if (t == item.id) {
                            has = true;
                        }
                    })

                    if (!has) {
                        deleteEntry_strategiesIds.push(item.id);
                    }
                });
                return Promise.all([chartIns.removeTags(deleteTagIds), chartIns.removeEntry_strategies(deleteEntry_strategiesIds), chart.find({
                    where: {
                        id: data.id
                    }
                })]);
            }).then(function(vals) {
                let chartIns = vals[2];
                let tags = data.tags;
                tags && tags.forEach(function(tag) {
                    chartIns.addTags(tag);
                });

                let entryStrategies = data.entryStrategies;
                entryStrategies && entryStrategies.forEach(function(entryStrategy) {
                    chartIns.addEntry_strategy(entryStrategy);
                });
            });
        } else {
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

    },
    getChartById: function(id) {
        return chart.find({
            where: {
                id: id
            }
        }).then(function(data) {

            let formatItem = data.toJSON();
            return Promise.all([data.getTags(), data.getEntry_strategies()]).then(function(vals) {
                formatItem.tags = vals[0].map(function (item) {
                    return item.toJSON();
                });
                formatItem.entry_strategies = vals[1].map(function (item) {
                    return item.toJSON();
                });

                return formatItem;
            }).catch(function (err) {
                console.error(err);
            });
        }).catch(function (err) {
            console.error(err);
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
                [gt]: new Date(date_range[0] + ' 00:00:00'),
                [lt]: new Date(date_range[1] + ' 23:00:00')
            };
        }

        return chart.findAll({
            where: queryObj
        }).then(function(datas) {
            return new Promise(function(resolve, reject) {
                let arr = [];
                datas.forEach(function(item, index) {

                    let formatItem = item.toJSON();
                    Promise.all([item.getTags(), item.getEntry_strategies()]).then(function(vals) {
                        formatItem.tags = vals[0].map(function(item) {
                            return item.toJSON();
                        });
                        formatItem.entry_strategies = vals[1].map(function(item) {
                            return item.toJSON();
                        });
                        arr.push(formatItem);

                        if (index === datas.length - 1) {
                            resolve(arr.filter(function(item) {
                                let res = true;

                                if (strategy) {
                                    res = false;
                                    item.entry_strategies.forEach(function(i) {
                                        if (i.id === strategy) {
                                            res = true;
                                        }
                                    })
                                }

                                if (!res) {
                                    return res;
                                }

                                if (tags && tags.length > 0) {
                                    res = false;
                                    item.tags.forEach(function(i) {
                                        tags.forEach(function(t) {
                                            if (i.id === t) {
                                                res = true;
                                            }
                                        })
                                    })
                                }
                                return res;
                            }));
                        }
                    }).catch(function(err) {
                        console.error(err);
                    });
                })
            });
        });
    }
};