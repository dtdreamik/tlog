const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module.exports = (sequelize, DataTypes) => {

    let scaleIn = sequelize.define('scale_in', {
        symbol: DataTypes.STRING,
        time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('time')).format(DATE_FORMAT);
            }
        },
        qty: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        fees: DataTypes.DOUBLE
    });

    return scaleIn;
};