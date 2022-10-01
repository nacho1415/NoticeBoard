const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Post extends Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: DataTypes.STRING(100),
                    allowNull: true
                },
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                views: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                }, 
                likes: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                }
            },
            {
                modelName: 'Post',
                tableName: 'Posts',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.Post.belongsTo(db.User)
        db.Post.belongsTo(db.Category)
        db.Post.hasMany(db.Comment, {
            as: 'thisComments'
        })
    }
}