module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    
    const User = sequelize.define(alias, {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        first_name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        second_name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING
        }, privileges: {
            allowNull: false,
            type: dataTypes.STRING,
            defaultValue: 'client'
        }
    }, {
        tableName : "users",
        timestamps: false
    });

    User.associate = (models) => {
        /*User.belongsTo (models.Categories, {
            as: 'Categories',
            foreignKey: 'categories_id'
        })*/

        User.hasMany (models.Sales, {
            as: 'Sales',
            foreignKey: 'Users_id'
        })

        User.belongsToMany (models.Products, {
            as: 'Products',
            through: 'favorites',
            foreignKey: 'Users_id',
            otherKey: 'Products_id',
            timestamps: false
        })
    }

    return User;
}