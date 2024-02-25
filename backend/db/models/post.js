'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Theme, { foreignKey: 'themeId' });
      this.belongsTo(models.Page, { foreignKey: 'pageId' });
      this.hasMany(models.Song, { foreignKey: 'postId' });
      this.hasMany(models.Comment, { foreignKey: 'postId' });
      this.hasMany(models.Like, { foreignKey: 'postId' });
    }
  }
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    themeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Themes',
        key: 'id'
      },
      allowNull: false
    },
    pageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Pages',
        key: 'id'
      },
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    commentsDisabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Post',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
  });
  return Post;
};
