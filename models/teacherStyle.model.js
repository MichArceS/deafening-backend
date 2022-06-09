'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TeacherStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeacherStyle.belongsTo(models.Teacher, { foreignKey: 'id_teacher'})
      TeacherStyle.belongsTo(models.Style, { foreignKey: 'id_style'})
    }
  };
  TeacherStyle.init({
    id_teacher: {
      field: 'id_teacher',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_style: {
      field: 'id_style',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: DataTypes.DATE,
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
    modelName: 'TeacherStyle',
    timestamps: false,
    freezeTableName: true,
    tableName: 'teacher_style',
  })
  return TeacherStyle
}
