const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module.exports = (sequelize, DataTypes) => {

    let TradeLog = sequelize.define('trade_log', {
        symbol: DataTypes.STRING,
        long_short: DataTypes.STRING,
        profit: DataTypes.DOUBLE,
        entry_time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('entry_time')).format(DATE_FORMAT);
            }
        },
        exit_time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('exit_time')).format(DATE_FORMAT);
            }
        },
        entry_qty: DataTypes.INTEGER,
        entry_price: DataTypes.DOUBLE,
        exit_qty: DataTypes.INTEGER,
        exit_price: DataTypes.DOUBLE,
        stop_price: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        target_price:  {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        fees: DataTypes.DOUBLE,
        entry_notes: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        exit_notes: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        trade_img: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    }, {
        underscored: true
    });

    TradeLog.associate = function (models) {

        models['trade_log'].hasMany(models['scale_in']);
        models['trade_log'].hasMany(models['scale_out']);

    };

    return TradeLog;
};