module.exports = function(sequelize, DataTypes) {

    const Producto = sequelize.define("producto", 
    {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(500)
        },
        description: {
            type: DataTypes.STRING(500)
        },
        category: {
            type: DataTypes.STRING(500)
        },
        discount: {
            type: DataTypes.STRING(500)
        },
        price: {
            type: DataTypes.INTEGER(10)
        }
    }, 
    {
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    })

    return Producto;
}