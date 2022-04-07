const router = require('express').Router();
const { Book } = require('../models');

// const books = [
//   {
//     ID: 1,
//     Title: 'Project Hail Mary: A Novel',
//     Description:
//       'An irresistible interstellar adventure as only Andy Weir could deliver, Project Hail Mary is a tale of discovery, speculation, and survival to rival The Martian—while taking us to places it never dreamed of going.',
//     ISBN: 9780593395561,
//     Genre: 'Adventure',
//     Author: 'Andy Weir',
//     Publication: 'May 4, 2021',
//     Rating: '',
//     Comment: '',
//   },
//   {
//     ID: 2,
//     Title:
//       'Island of the Lost: An Extraordinary Story of Survival at the Edge of the World',
//     Description:
//       'Hundreds of miles from civilization, two ships wreck on opposite ends of the same deserted island in this true story of human nature at its best—and at its worst.',
//     ISBN: '978-1616209704',
//     Genre: 'Adventure',
//     Author: 'Joan Druett',
//     Publication: 'January 1, 2007',
//     Rating: '',
//     Comment: '',
//   },
//   {
//     ID: 3,
//     Title: "The Moor's Account",
//     Description:
//       'PULITZER PRIZE FINALIST • A NEW YORK TIMES NOTABLE BOOK • The imagined memoirs of the first black explorer of America—this "stunning [book] sheds light on all of the possible the New World exploration stories that didn’t make history” (Huffington Post).',
//     ISBN: '978-0804170628',
//     Genre: 'Adventure',
//     Author: 'Laila Lalami',
//     Publication: 'August 18, 2015',
//     Rating: '',
//     Comment: '',
//   },
//   {
//     ID: 4,
//     Title:
//       "The Princess Bride: S. Morgenstern's Classic Tale of True Love and High Adventure",
//     Description:
//       "William Goldman's modern fantasy classic is a simple, exceptional story about quests—for riches, revenge, power, and, of course, true love—that's thrilling and timeless.",
//     ISBN: '978-1328948854',
//     Genre: 'Adventure',
//     Author: 'William Goldman',
//     Publication: 'October 8, 2007',
//     Rating: '',
//     Comment: '',
//   },
//   {
//     ID: 5,
//     Title: 'Me: Elton John Official Autobiography',
//     Description:
//       'In his first and only official autobiography, music icon Elton John reveals the truth about his extraordinary life, from his rollercoaster lifestyle as shown in the film Rocketman, to becoming a living legend.',
//     ISBN: '978-1250147608',
//     Genre: 'Autobiography',
//     Author: 'Elton John',
//     Publication: 'October 15, 2019',
//     Rating: '',
//     Comment: '',
//   },
//   {
//     ID: 6,
//     Title: 'She Dog: A Memoir by the Creator of Nike',
//     Description:
//       'In this instant and tenacious New York Times bestseller, Nike founder and board chairman Phil Knight “offers a rare and revealing look at the notoriously media-shy man behind the swoosh” (Booklist, starred review), illuminating his company’s early days as an intrepid start-up and its evolution into one of the world’s most iconic, game-changing, and profitable brands.',
//     ISBN: '978-1508211808',
//     Genre: 'Autobiography',
//     Author: 'Phil Knight',
//     Publication: 'April 20, 2016',
//     Rating: '',
//     Comment: '',
//   },
//   {
//     ID: 7,
//     Title: 'The Storyteller: Tales of Life and Music',
//     Description:
//       "The #1 New York Times Bestseller * Named one of Variety's Best Music Books of 2021 * Included in Audible's Best of The Year list * A Business Insider Best Memoirs of 2021 * One of NME's Best Music Books of 2021",
//     ISBN: '978-0063076099',
//     Genre: 'Autobiography',
//     Author: 'Dave Grohl',
//     Publication: 'October 5, 2021',
//     Rating: '',
//     Comment: '',
//   },
// ];

// get all books
// router.get('/', async (req, res) => {
//   res.render('book', { books });
//   console.log(books, 'Jeoffrey');
// });

router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['Title'],
    });

    const books = bookData.map((book) => {
      return book.get({ plain: true });
    });

    res.render('book', { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: ['Title'],
    });

    const books = bookData.get({ plain: true });

    res.render('book2', books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get one book
// router.get('/:num', async (req, res) => {
//   console.log(res, 'something happened');
//   res.render('book2', books[req.params.num - 1]);
// });

module.exports = router;
