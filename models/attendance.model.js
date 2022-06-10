'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.Lesson, { foreignKey: 'id_lesson'})
      Attendance.belongsTo(models.Student, { foreignKey: 'id_estudiante'})
    }
  };
  Attendance.init({
    is_recuperando: DataTypes.BOOLEAN,
    id_clase: {
      field: 'id_clase',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_estudiante: {
      field: 'id_estudiante',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.CHAR(1),
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
    modelName: 'Attendance',
    timestamps: false,
    freezeTableName: true,
    tableName: 'attendance',
  })
  return Attendance
}
