module.exports = function(sequelize, DataTypes) {

    const Usuario = sequelize.define("usuario", 
    {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(500)
        },
        lastName: {
            type: DataTypes.STRING(500)
        },
        email: {
            type: DataTypes.STRING(500)
        },
        nameUser: {
            type: DataTypes.STRING(500)
        },
        password1: {
            type: DataTypes.STRING(500)
        }
    }, 
    {
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    })

    return Usuario;
}