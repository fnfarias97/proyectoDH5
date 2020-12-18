module.exports = (sequelize, dataTypes) => {
    let alias = "Sales";
    
    const Sale = sequelize.define(alias, {
        id: {
            auntoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        total: {
            allownull: false,
            type: dataTypes.DECIMAL
        }
    }, {
        tableName : "sales",
        timestamps: false
    });

    Sale.associate = (models) => {
        Sale.belongsTo (models.PayMethods, {
            as: 'PayMethods',
            foreignKey: 'PayMethods_id'
        })

        Sale.belongsTo (models.Users, {
            as: 'Users',
            foreignKey: 'Users_id'
        })

        Sale.belongsTo (models.Products, {
            as: 'Products',
            foreignKey: 'Products_id'
        })
    }

    return Sale;
}