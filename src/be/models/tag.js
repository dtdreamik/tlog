module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define('tag', {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
    tag.associate = (models) => {
        tag.belongsToMany(models.chart, {
            through: 'charttag',
            foreignKey: 'tagId'
        });
    };
    return tag;
};