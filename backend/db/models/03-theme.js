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
      this.belongsToMany(models.Post, { through: 'PostTheme', foreignKey: 'themeId' });
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
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bgColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bgImg: {
      type: DataTypes.STRING,
    },
    shadowOffsetX: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shadowOffsetY: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shadowBlur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shadowColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shadowInset: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    textColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textFont: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borderStyle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borderColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borderSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borderRadius: {
      type: DataTypes.STRING,
      allowNull: false,
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
