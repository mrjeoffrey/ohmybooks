const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.TEXT('long'),
    },
    Description: {
      type: DataTypes.TEXT('long'),
    },
    ISBN: {
      type: DataTypes.STRING,
    },
    Genre: {
      type: DataTypes.STRING,
    },
    Author: {
      type: DataTypes.STRING,
    },
    Publication: {
      type: DataTypes.STRING,
    },
    Rating: {
      type: DataTypes.INTEGER,
    },
    Comment: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;
