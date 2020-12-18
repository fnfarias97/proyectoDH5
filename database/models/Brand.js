module.exports = (sequelize, dataTypes) => {
    let alias = "Brands";
    
    const Brand = sequelize.define(alias, {
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
        tableName : "brands",
        timestamps: false
    });

    Brand.associate = (models) => {
        Brand.hasMany (models.Products, {
            as: 'Products',
            foreignKey: 'brand_id'
        })
    }

    return Brand;
}