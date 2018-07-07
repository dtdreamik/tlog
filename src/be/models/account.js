
module.exports = (sequelize, DataTypes) => {

    let Account = sequelize.define('account', {
        name: DataTypes.STRING,
        cash: DataTypes.DOUBLE
    }, {
        underscored: true
    });

    Account.associate = function (models) {
        models.account.hasMany(models['trade_log']);
    };

    return Account;
};