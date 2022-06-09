'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StudentLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentLesson.belongsTo(models.Lesson, { foreignKey: 'id_lesson'})
      StudentLesson.belongsTo(models.Student, { foreignKey: 'id_student'})
    }
  };
  StudentLesson.init({
    id_lesson: {
      field: 'id_lesson',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_student: {
      field: 'id_student',
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
    modelName: 'StudentLesson',
    timestamps: false,
    freezeTableName: true,
    tableName: 'student_lesson',
  })
  return StudentLesson
}
