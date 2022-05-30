'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PackRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PackRegister.belongsTo(models.Student, { foreignKey: 'id_estudiante'})
      PackRegister.belongsTo(models.Pack, { foreignKey: 'id_paquete'})
    }
  };
  PackRegister.init({
    fecha: DataTypes.STRING,
    pago_total: DataTypes.FLOAT,
    horas_restantes: DataTypes.INTEGER,
    id_estudiante: {
      field: 'id_estudiante',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_paquete: {
      field: 'id_paquete',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.CHAR,
      defaultValue: 'A'
    },
    audCreatedAt: {
      field: 'aud_created_at',
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
      allowNull: false
    },
    audUpdatedAt: {
      field: 'aud_updated_at',
      type: DataTypes.DATE,
    },
    audDeletedAt: {
      field: 'aud_deleted_at',
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    schema: 'public',
    modelName: 'PackRegister',
    timestamps: false,
    freezeTableName: true,
    tableName: 'pack_register',
  })
  return PackRegister
}
