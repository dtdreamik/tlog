module.exports = (sequelize, DataTypes) => {
    const charttag = sequelize.define('charttag', {
        chartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'chart',
                key: 'id'
            }
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
    });
    return charttag;
};