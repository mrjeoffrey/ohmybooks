const User = require('./User');
const Review = require('./Review');
const Book = require('./Books');

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Review, Book };
