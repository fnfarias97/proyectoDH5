module.exports = (sequelize, dataTypes) => {
    let alias = "Product_categories";
    
    const ProductCategory = sequelize.define(alias, {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
        }
    }, {
        tableName : "product_categories",
        timestamps: false
    });

    ProductCategory.associate = (models) => {
        ProductCategory.hasMany (models.Products, {
            as: 'Products',
            foreignKey: 'product_categories_id'
        })
    }
    return ProductCategory;
}