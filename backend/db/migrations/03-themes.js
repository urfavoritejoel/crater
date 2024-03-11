'use strict';

let options = {};
options.tableName = 'Themes';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Themes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bgColor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bgImg: {
        type: Sequelize.STRING,
      },
      shadowOffsetX: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shadowOffsetY: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shadowBlur: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shadowColor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shadowInset: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      textColor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      textSize: {
        type: Sequelize.STRING,
        allowNull: false
      },
      textFont: {
        type: Sequelize.STRING,
        allowNull: false
      },
      borderStyle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      borderColor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      borderSize: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      borderRadius: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options);
  }
};
