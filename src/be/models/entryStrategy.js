
module.exports = (sequelize, DataTypes) => {

    let EntryStrategy = sequelize.define('entry_strategy', {
        name: DataTypes.STRING
    }, {
        underscored: true
    });

    EntryStrategy.associate = function (models) {
       // models['entry_strategy'].hasMany(models['trade_log']);
    };

    return EntryStrategy;
};