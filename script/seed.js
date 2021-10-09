"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "Andy", password: "123" }),
    User.create({ username: "Corinne", password: "123" }),
    User.create({ username: "Alex", password: "123" }),
    User.create({ username: "Stanley", password: "123" }),

  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({ name: "Penne", imageUrl: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR6C21-woAMTfWxaFtxw1ZMBfnqq3jhDhNdaW3DgwvEIPrhdFlfviAZ_kfqlyXP2HcIE2QzdNo-UZitZ_KOen8', description: "Penne is an extruded type of pasta with cylinder-shaped pieces, their ends cut at an angle. Penne is the plural form of the Italian penna, deriving from Latin penna, and is a cognate of the English word pen. When this format was created, it was intended to imitate the then-ubiquitous fountain pen's steel nibs." }),
    Product.create({ name: "Mafaldine", imageUrl: 'https://mobkitchen-objects.imgix.net/recipes/9K8A4161-4.jpg?auto=format&crop=focalpoint&domain=mobkitchen-objects.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=1300&ixlib=php-3.3.0&q=82&w=1300&s=f6d1cff31b151eea765c890308f780a8', description: "Mafaldine, also known as reginette (Italian for little queens), or simply mafalda or mafalde, is a type of ribbon-shaped pasta. It is usually served with a more delicate sauce. Mafaldine were named in honor of Princess Mfalda of Savoy (thus the alernative name of 'little queens')." }),
    Product.create({ name: "Spaghetti", imageUrl: 'https://www.zimbokitchen.com/wp-content/uploads/2012/12/spaghetti2.png', description: "Spaghetti is a long, thin, solid, cylindrical pasta. It is a staple food of traditional Italian cuisine." }),
    Product.create({ name: "Garganelli", imageUrl: 'https://www.qbcucina.com/wp-content/uploads/2020/05/Garganelli-1.jpg', description: "Garganelli are a type of egg-based pasta formed by rolling a flat, square noodle into a cylindrical shape. Garganelli resembles ribbed quills with points at both ends." }),

  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      andy: users[0],
      corinne: users[1],
      alex: users[2],
      stanley: users[3]
    },
    products
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
