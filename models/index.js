const User = require('./User');
const Project = require('./Project');
const Book = require('./Books');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Project.belongsTo(User, {
  foreignKey: 'user_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Project, Book };
