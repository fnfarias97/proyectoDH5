module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    
    const User = sequelize.define(alias, {
        id: {
            auntoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        first_name: {
            allownull: false,
            type: dataTypes.STRING
        },
        second_name: {
            allownull: false,
            type: dataTypes.STRING
        },
        email: {
            allownull: false,
            type: dataTypes.STRING
        },
        password: {
            allownull: false,
            type: dataTypes.STRING
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