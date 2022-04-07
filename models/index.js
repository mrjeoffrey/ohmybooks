const User = require('./User');
const Comment = require('./Comment');
const Book = require('./Books');

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Comment, Book };
