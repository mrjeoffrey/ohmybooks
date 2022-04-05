const sequelize = require('../config/connection');
const { User, Project, Book } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const book of bookData) {
    await Book.create({
      ...book,
    });
  }

  process.exit(0);
};

seedDatabase();
