const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Comment extends Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: DataTypes.STRING(100),
                    allowNull: true
                },
            },
            {
                modelName: 'Comment',
                tableName: 'Comments',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.Comment.hasMany(db.Comment)
        db.Comment.belongsTo(db.Comment),
        db.Comment.belongsTo(db.Post)
        db.Comment.belongsTo(db.User)
    }
}