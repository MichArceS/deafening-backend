'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Representative extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Representative.init({
    nombre: DataTypes.STRING,
    cedula: DataTypes.STRING,
    correo: DataTypes.STRING,
    convencional: DataTypes.STRING(10),
    telefono_1: DataTypes.STRING(10),
    telefono_2: DataTypes.STRING(10),
    fecha_nacimiento: DataTypes.STRING,
    direccion: DataTypes.STRING,
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
    modelName: 'Representative',
    timestamps: false,
    freezeTableName: true,
    tableName: 'representative',
  })
  return Representative
}
