const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module.exports = (sequelize, DataTypes) => {

    const chart = sequelize.define('chart', {
        symbol: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        notes: {
            type: DataTypes.STRING
        },
        path: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('date')).format(DATE_FORMAT);
            }
        }
    });

    chart.associate = (models) => {
        chart.belongsToMany(models.tag, {
            through: 'charttag',
            foreignKey: 'chartId'
        });

        chart.belongsToMany(models['entry_strategy'], {
            through: 'chartentrystrategy',
            foreignKey: 'chartId'
        });
        //chart.belongsTo(models['entry_strategy']);
    };
    return chart;
};