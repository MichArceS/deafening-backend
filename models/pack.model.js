'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pack.belongsTo(models.Schedule, { foreignKey: 'id_schedule'})
    }
  };
  Pack.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    id_schedule: {
      field: 'id_schedule',
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
    modelName: 'Pack',
    timestamps: false,
    freezeTableName: true,
    tableName: 'pack',
  })
  return Pack
}
