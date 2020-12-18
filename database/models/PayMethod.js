module.exports = (sequelize, dataTypes) => {
    let alias = "PayMethods";
    
    const PayMethod = sequelize.define(alias, {
        id: {
            auntoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        type: {
            allownull: false,
            type: dataTypes.STRING
        }
    }, {
        tableName : "paymethods",
        timestamps: false
    });

    PayMethod.associate = (models) => {
        PayMethod.hasMany (models.Sales, {
            as: 'Sales',
            foreignKey: 'PayMethods_id'
        })
    }

    return PayMethod;
}