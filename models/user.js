const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                nickname: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                }
            },
            {
                modelName: 'User',
                tableName: 'Users',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.User.hasMany(db.Post)
    }
}