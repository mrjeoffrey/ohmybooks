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
    title: {
      type: DataTypes.TEXT('long'),
    },
    description: {
      type: DataTypes.TEXT('long'),
    },
    isbn: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    publication: {
      type: DataTypes.STRING,
    },
    avgrating: {
      type: DataTypes.INTEGER,
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
