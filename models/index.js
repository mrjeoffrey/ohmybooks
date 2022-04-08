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

Book.hasMany(Review, {
  foreignKey: 'book_id',
});

Review.belongsTo(Book, {
  foreignKey: 'book_id',
});

// Book.belongsToMany(User, { through: Review });
// User.belongsToMany(Book, { through: Review });

module.exports = { User, Review, Book };
