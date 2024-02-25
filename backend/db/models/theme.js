'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.Post, { foreignKey: 'themeId' });
      this.hasMany(models.Page, { foreignKey: 'DefaultThemeId' });
    }
  }
  Theme.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bgColor: {
      type: DataTypes.STRING,
    },
    bgImg: {
      type: DataTypes.STRING,
    },
    textFont: {
      type: DataTypes.STRING,
    },
    borderstyle: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Rounded'
    },
  }, {
    sequelize,
    modelName: 'Theme',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Theme;
};
