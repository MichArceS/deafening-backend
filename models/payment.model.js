'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Teacher, { foreignKey: 'idTeacher'})
    }
  };
  Payment.init({
    fecha: DataTypes.STRING,
    horas: DataTypes.INTEGER,
    pagoTotal: DataTypes.FLOAT,
    id_teacher: {
      field: 'idTeacher',
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
    modelName: 'Payment',
    timestamps: false,
    freezeTableName: true,
    tableName: 'payment',
  })
  return Payment
}
