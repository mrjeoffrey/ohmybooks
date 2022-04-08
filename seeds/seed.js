const sequelize = require('../config/connection');
const { User, Review, Book } = require('../models');

const userData = require('./userData.json');
// const reviewData = require('./projectData.json');
const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of bookData) {
    await Book.create({
      ...book,
    });
  }

  for (const review of reviewData) {
    await Review.create({
      ...review,
    });
  }

  process.exit(0);
};

seedDatabase();
