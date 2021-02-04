module.exports = (sequelize, dataTypes) => {
    let alias = "PayMethods";
    
    const PayMethod = sequelize.define(alias, {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        type: {
            allowNull: false,
            type: dataTypes.STRING
        }
    }, {
        tableName : "paymethods",
        timestamps: false
    });

    PayMethod.associate = (models) => {
        PayMethod.hasMany (models.Sales, {
            as: 'Sales',
            foreignKey: 'Pay_methods_id'
        })
    }

    return PayMethod;
}