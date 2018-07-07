
module.exports = (sequelize, DataTypes) => {

    let scaleIn = sequelize.define('scale_in', {
        symbol: DataTypes.STRING,
        time: DataTypes.DATE,
        qty: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        fees: DataTypes.DOUBLE
    });

    return scaleIn;
};