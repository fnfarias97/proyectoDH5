module.exports = (sequelize, dataTypes) => {
    let alias = "Brands";
    
    const Brand = sequelize.define(alias, {
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