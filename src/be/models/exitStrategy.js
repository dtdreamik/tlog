
module.exports = (sequelize, DataTypes) => {

    let ExitStrategy = sequelize.define('exit_strategy', {
        name: DataTypes.STRING
    }, {
        underscored: true
    });

    ExitStrategy.associate = function (models) {
        models['exit_strategy'].hasMany(models['trade_log']);
    };

    return ExitStrategy;
};