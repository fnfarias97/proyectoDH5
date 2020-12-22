module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    
    const Product = sequelize.define(alias, {
        id: {
            auntoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allownull: false,
            type: dataTypes.STRING
        },
        price: {
            allownull: false,
            type: dataTypes.DECIMAL
        },
        avatar: {
            allownull: false,
            type: dataTypes.STRING
        },
        description: {
            allownull: false,
            type: dataTypes.STRING
        },
        stock: {
            allownull: false,
            type: dataTypes.INTEGER
        }
    }, {
        tableName : "products",
        timestamps: false
    });

    Product.associate = (models) => {
        Product.belongsTo (models.ProductCategories, {
            as: 'ProductCategories',
            foreignKey: 'productCategories_id'
        })

        Product.belongsTo (models.Brands, {
            as: 'Brands',
            foreignKey: 'brand_id'
        })

        Product.hasMany (models.Sales, {
            as: 'Sales',
            foreignKey: 'Products_id'
        })

        Product.belongsToMany (models.Users, {
            as: 'Users',
            through: 'favorites',
            foreignKey: 'Products_id',
            otherKey: 'Users_id',
            timestamps: false
        })
    }

    
    return Product;
}