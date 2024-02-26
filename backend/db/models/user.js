'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId', onDelete: "CASCADE", onDelete: "CASCADE" });
      this.hasMany(models.Theme, { foreignKey: 'userId', onDelete: "CASCADE" });
      this.hasMany(models.Page, { foreignKey: 'userId', onDelete: "CASCADE" });
      this.hasMany(models.Song, { foreignKey: 'userId', onDelete: "CASCADE" });
      this.hasMany(models.Comment, { foreignKey: 'userId', onDelete: "CASCADE" });
      this.hasMany(models.Like, { foreignKey: 'userId', onDelete: "CASCADE" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    descriptor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'creator'
    },
    primaryMedium: {
      type: DataTypes.STRING,
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
