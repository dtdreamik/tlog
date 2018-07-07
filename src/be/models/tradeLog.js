
module.exports = (sequelize, DataTypes) => {

    let TradeLog = sequelize.define('trade_log', {
        symbol: DataTypes.STRING,
        long_short: DataTypes.STRING,
        profit: DataTypes.DOUBLE,
        entry_time: DataTypes.DATE,
        exit_time: DataTypes.DATE,
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

       // models['trade_log'].belongsTo(models['entry_strategy']);

       // models['trade_log'].belongsTo(models['exit_strategy']);
    };

    return TradeLog;
};