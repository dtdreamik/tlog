
module.exports = (sequelize, DataTypes) => {

    let scaleOut = sequelize.define('scale_out', {
        symbol: DataTypes.STRING,
        time: DataTypes.DATE,
        qty: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        fees: DataTypes.DOUBLE
    });

    return scaleOut;
};