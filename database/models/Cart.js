module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    
    const Cart = sequelize.define(alias, {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        quantity: {
            allowNull: false,
            type: dataTypes.INTEGER
        }
    }, {
        tableName : "cart",
        timestamps: false
    });

    Cart.associate = (models) => {
        Cart.belongsTo (models.Users, {
            as: 'Users',
            foreignKey: 'Users_id'
        })

        Cart.belongsTo (models.Products, {
            as: 'Products',
            foreignKey: 'Products_id'
        })
    }

    return Cart;
}