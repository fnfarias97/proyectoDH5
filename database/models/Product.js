module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    
    const Product = sequelize.define(alias, {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        price: {
            allowNull: false,
            type: dataTypes.DECIMAL
        },
        avatar: {
            allowNull: false,
            type: dataTypes.STRING
        },
        description: {
            allowNull: false,
            type: dataTypes.STRING
        },
        stock: {
            allowNull: false,
            type: dataTypes.INTEGER
        }
    }, {
        tableName : "products",
        timestamps: false
    });

    Product.associate = (models) => {
        Product.belongsTo (models.Product_categories, {
            as: 'Product_categories',
            foreignKey: 'product_categories_id'
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