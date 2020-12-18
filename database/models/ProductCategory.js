module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCategories";
    
    const ProductCategory = sequelize.define(alias, {
        id: {
            auntoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allownull: false,
            type: dataTypes.STRING
        }
    }, {
        tableName : "productcategories",
        timestamps: false
    });

    ProductCategory.associate = (models) => {
        ProductCategory.hasMany (models.Products, {
            as: 'Products',
            foreignKey: 'productCategories_id'
        })
    }
    return ProductCategory;
}