module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
    
    const Category = sequelize.define(alias, {
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
        tableName : "categories",
        timestamps: false
    });

    Category.associate = (models) => {
        Category.hasMany (models.Users, {
            as: 'Users',
            foreignKey: 'categories_id'
        })
    }

    return Category;
}