const sequelize = require('../config/connection');
const { User, Review, Book } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const review of reviewData) {
    await Review.create({
      ...review,
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
