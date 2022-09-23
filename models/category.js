const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Category extends Model {
    static init(sequelize) {
        return super.init(
            {
                categoryName: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                    unique: true
                }
            },
            {
                modelName: 'Category',
                tableName: 'Categories',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.Category.hasMany(db.Post, {
            as: 'belongsCategoryPost'
        })
    }
}