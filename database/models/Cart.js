module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    
    const Cart = sequelize.define(alias, {
        id: {
            auntoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        quantity: {
            allownull: false,
            type: dataTypes.INTEGER
        }
    }, {
        tableName : "cart",
        timestamps: false
    });

    Cart.associate = (models) => {
        Cart.BelongsTo (models.Users, {
            as: 'Users',
            foreignKey: 'Users_id'
        })

        Cart.BelongsTo (models.Products, {
            as: 'Products',
            foreignKey: 'Products_id'
        })
    }

    return Cart;
}