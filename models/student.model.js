'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Representative, { foreignKey: 'id_representante'})
    }
  };
  Student.init({
    nombre: DataTypes.STRING,
    cedula: DataTypes.STRING(10),
    correo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    convencional: DataTypes.STRING(10),
    telefono: DataTypes.STRING(10),
    telefono_emergencia: DataTypes.STRING(10),
    fecha_nacimiento: DataTypes.STRING,
    alergias: DataTypes.STRING,
    direccion: DataTypes.STRING,
    foto: DataTypes.BLOB,
    id_representante: {
      field: 'id_representante',
      type: DataTypes.INTEGER,
      allowNull: true
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
    modelName: 'Student',
    timestamps: false,
    freezeTableName: true,
    tableName: 'student',
  })
  return Student
}
