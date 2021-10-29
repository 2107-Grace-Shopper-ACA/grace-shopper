"use strict";

const {
  db,
  models: { User, Product, OrderItem, Order, Category },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
    const andy = await User.create({ username: "Andy", password: "123", isAdmin: true })
    const corinne = await User.create({ username: "Corinne", password: "123" })
    const alex = await User.create({ username: "Alex", password: "123" })
    const stanley = await User.create({ username: "Stanley", password: "123" })

  const users = [andy, corinne, alex, stanley]

  //Creating Categories
  const categories = await Promise.all([
    Category.create({name: 'Small Pastas'}),
    Category.create({name: 'Ribbon-Cut'}),
    Category.create({name: 'Tube-Shaped'}),
    Category.create({name: 'Stuffed'}),
  ]);

  const [smallPastas, ribbonCut, tubeShaped, stuffed] = categories.map(category => category)

  // Creating Products
  const products = await Promise.all([
    Product.create({ name: "Farfalle", inventory: 100, price: 8, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Farfalle_Pasta.JPG', description: "Bowtie-shaped pieces named after the Italian word for “butterfly,” farfalla.", categoryId: smallPastas.id }),
    Product.create({ name: "Orecchiette", inventory: 100, price: 9, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Orecchiette_Pasta.JPG', description: "Concave, somewhat flattened little shells. Originated in Southern Italy with a name meaning “small ear.”", categoryId: smallPastas.id }),
    Product.create({ name: "Rotini", inventory: 100, price: 9, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dceDtvtAlGZOXS8b_29O2-3YrTpLhfIhCg&usqp=CAU', description: "Tight corkscrews that are especially good at holding onto thick sauces. You may also see them labeled as “fusilli.”", categoryId: smallPastas.id }),
    Product.create({ name: "Orzo", inventory: 100, price: 10, imageUrl: 'https://chefsmandala.com/wp-content/uploads/2018/02/Orzo-Pasta-shutterstock_110331179.jpg', description: "Small noodles shaped like grains of rice. These are often added to garden salads, pasta salads and soups.", categoryId: smallPastas.id }),
    Product.create({ name: "Ditalini", inventory: 100, price: 9, imageUrl: 'https://www.the-pasta-project.com/wp-content/uploads/2016/12/Ditali-lisce-2.jpg', description: "Small tube-like shapes, commonly used in pasta e fagioli. The name means “small thimbles” in Italian.", categoryId: smallPastas.id}),
    Product.create({ name: "Stelline", inventory: 100, price: 8, imageUrl: 'https://cdn.tasteatlas.com/images/ingredients/b7472a37d1e04a988f44ef191617d747.jpg?w=600&h=450', description: "Tiny, star-shaped noodles that cook in just 5 minutes. These are best used in soups, as they tend to get lost in saucy or meat-based dishes.", categoryId: smallPastas.id}),
    Product.create({ name: "Spaghetti", inventory: 100, price: 7, imageUrl: 'https://t4.ftcdn.net/jpg/01/89/14/61/360_F_189146140_cOFAAWlB5FQ5yVeoKpExjVuZ5CSXEiXg.jpg', description: "The standard (and most popular) long noodle with a medium density.", categoryId: ribbonCut.id}),
    Product.create({ name: "Capellini", inventory: 100, price: 10, imageUrl: 'https://www.bullcityoliveoil.com/uploads/1/2/6/3/126303318/s942546161701459853_p260_i1_w1200.jpeg', description: "With ultra-thin strands that measure between 0.85 and 0.92 millimeters, this pasta is delicate and falls apart if overcooked. It’s often labeled as “angel hair” pasta.", categoryId: ribbonCut.id}),
    Product.create({ name: "Vermicelli", inventory: 100, price: 9, imageUrl: 'https://image.freepik.com/free-photo/uncooked-vermicelli-pasta-background_245047-192.jpg', description: "Traditional pasta, similar to spaghetti but slightly thicker. Translates to “little worms” in Italian.", categoryId: ribbonCut.id}),
    Product.create({ name: "Linguine", inventory: 100, price: 9, imageUrl: 'https://images.squarespace-cdn.com/content/v1/5772b09946c3c4cc1dd76e51/1472051844546-XB37YA0X83ME3A6GP84O/Dom%27s+Linguine+plain+11.jpg?format=1000w', description: "Strands of pasta with rounded edges that are wider than spaghetti.", categoryId: ribbonCut.id}),
    Product.create({ name: "Tagliatelle", inventory: 100, price: 7, imageUrl: 'https://rms.condenast.it/rms/public/5d8/4e4/c29/thumb_4163_1200_670_0_0_auto.jpg', description: "Made of egg-enriched dough, this medium-wide and toothsome noodle can stand up to meaty sauces.", categoryId: ribbonCut.id}),
    Product.create({ name: "Fettuccine", inventory: 100, price: 8, imageUrl: 'https://www.westend61.de/images/0000063400pw/uncooked-pasta-close-up-AKF00095.jpg', description: "Flat, thick noodles with a name meaning “little ribbons” in Italian.", categoryId: ribbonCut.id}),
    Product.create({ name: "Pappardelle", inventory: 100, price: 9, imageUrl: 'https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/0f295d4c4ee03c24-cYzopRZ2-large.jpg', description: "Large, broad, flat noodles, wider than fettuccine. Made with egg added to the dough.", categoryId: ribbonCut.id}),
    Product.create({ name: "Bucatini", inventory: 100, price: 9, imageUrl: 'https://businesstimesnow.com/wp-content/uploads/2020/10/Enjoy-Your-Evening-with-Bucatini-Pasta-Dish-1.jpg', description: "Rounded strands that look like spaghetti; however, unlike spaghetti, bucatini has a long hole running through its center. May also be called perciatelli.", categoryId: ribbonCut.id}),
    Product.create({ name: "Lasagna", inventory: 100, price: 10, imageUrl: 'https://veganglutenfreelife.com/wp-content/uploads/2020/04/Lasagna-roll-noodles-4-x-3-1024x768.jpg', description: "Sheets of pasta rolled out to medium thickness. Usually layered with sauce, cheese, veggies, and/or meats, while baked into a classic Italian American casserole (or simmered in soup).", categoryId: ribbonCut.id}),
    Product.create({ name: "Penne", inventory: 100, price: 7, imageUrl: 'https://www.the-pasta-project.com/wp-content/uploads/2017/03/penne-lisce.jpg', description: "Cylinder-shaped pieces that come to a small point on both ends. The name is derived from the Italian word penna, which means “pen.”", categoryId: tubeShaped.id}),
    Product.create({ name: "Rigatoni", inventory: 100, price: 9, imageUrl: 'https://freefoodphotos.com/imagelibrary/bread/rigatoni_pasta.jpg', description: "Slightly curved, tubed-shaped pastas, usually larger than penne. The name is derived from the Italian word rigato, which means “ridged” or “lined.”", categoryId: tubeShaped.id}),
    Product.create({ name: "Macaroni", inventory: 100, price: 8, imageUrl: 'https://www.yummymummyclub.ca/sites/default/files/styles/large/public/field/image/pasta-dried.jpg?itok=SEY_UQ3J', description: "Technically, “macaroni” is a general word to categorize small and medium dried-pasta shapes. In America, it has become somewhat synonymous with elbow macaroni, the small curved tubes traditionally used in mac and cheese and pasta salads.", categoryId: tubeShaped.id}),
    Product.create({ name: "Cannelloni", inventory: 100, price: 7, imageUrl: 'https://freefoodphotos.com/imagelibrary/bread/cannelloni_dried.jpg', description: "Smooth tubes, most often covered in sauce and baked after stuffing.", categoryId: tubeShaped.id}),
    Product.create({ name: "Manicotti", inventory: 100, price: 9, imageUrl: 'https://preparedfoodphotos.com/samples/Njk0MTIzZDViZTYwNWI1/OTkzZDViZTYwNWI1/Uncooked-Manicotti-on-a-Plate.jpg', description: "Large tubes, similar to cannelloni but with ridges. This shape originated in Italian American cuisine and is also baked after stuffing.", categoryId: tubeShaped.id}),
    Product.create({ name: "Ziti", inventory: 100, price: 8, imageUrl: 'https://theheritagecook.com/wp-content/uploads/2013/08/CutZiti.jpg', description: "Hollow, straw-shaped noodles that are smaller and narrower than rigatoni and frequently baked into saucy, cheesy casseroles.", categoryId: tubeShaped.id}),
    Product.create({ name: "Ravioli", inventory: 100, price: 12, imageUrl: 'https://cdn.shopify.com/s/files/1/0274/1374/1657/products/Ravioli2048.jpg?v=1621829103', description: "Two flat sheets of pasta that form a dumpling-like structure for cheese filling.", categoryId: stuffed.id}),
    Product.create({ name: "Tortellini", inventory: 100, price: 15, imageUrl: 'https://images.eatthismuch.com/site_media/img/5286_brittbae93_2f9c645e-9139-4ab5-8bf3-1f08980b834e.png', description: "Little rings filled with cheese. Tortelloni is similar to tortellini, but is about two times larger.", categoryId: stuffed.id}),
    Product.create({ name: "Cappelletti", inventory: 0, price: 12, imageUrl: 'https://www.thespruceeats.com/thmb/_lHzloc-HBS6cJHeRiRGZQ-n760=/3367x2244/filters:no_upscale():max_bytes(150000):strip_icc()/cappelletti-little-hats-of-filled-pasta-4054301-step-06-d0eb7edaa69f42ef9080b3595736cec0.jpg', description: "Small, filled pasta, folded diagonally so they resemble the shape of a hat.", categoryId: stuffed.id, isActive: false}),
    Product.create({ name: "Agnolotti", inventory: 5, price: 16, imageUrl: 'https://images.squarespace-cdn.com/content/5a678c0718b27d534f591b05/1518724880441-90YJ7ITQ1SF3XGJCN83B/Roasted+Squash+Agnolotti+2000.jpg?format=1500w&content-type=image%2Fjpeg', description: "Small, crimped pillows, with cheese fillings similar to ravioli.", categoryId: stuffed.id}),
    Product.create({ name: "Fagottini", inventory: 100, price: 18, imageUrl: 'https://www.marcellinaincucina.com/wp-content/uploads/2021/08/fagottini-1-3.jpg', description: "Little bundles of pasta, filled with carrots, onions, and greens beans, as well as ricotta cheese.", categoryId: stuffed.id}),
    Product.create({ name: "Mezzelune", inventory: 100, price: 15, imageUrl: 'https://t3.ftcdn.net/jpg/00/41/98/36/360_F_41983677_bMs9W1gDrrZFgYq7awHgE55m1X4zZLT0.jpg', description: "Crimped semicircles stuffed with cheese.", categoryId: stuffed.id})
  ]);
  const [farfalle, orecchiette, rotini, orzo, ditalini, stelline, spaghetti, capellini, vermicelli, linguine, tagliatelle, fettuccine, pappardelle, bucatini, lasagna, penne, rigatoni, macaroni, cannelloni, manicotti, ziti, ravioli, tortellini, cappelletti, agnolotti, fagottini, mezzelune] = products.map(product => product);

  //Creating orders
  const orders = await Promise.all([
    Order.create({isCart: true, userId: andy.id }),
    Order.create({isCart: false, userId: andy.id }),
    Order.create({isCart: false, userId: corinne.id }),
    Order.create({isCart: true, userId: alex.id })
    ])
  const [order1, order2, order3, order4] = orders.map(order => order);

  //Creating order items
  const orderItems = await Promise.all([
    OrderItem.create({quantity: 2, productId: macaroni.id, orderId: order1.id, userId: order1.userId}),
    OrderItem.create({quantity: 3, productId: penne.id, orderId: order1.id, userId: order1.userId}),
    OrderItem.create({quantity: 3, productId: spaghetti.id, orderId: order1.id, userId: order1.userId}),
    OrderItem.create({quantity: 4, productId: macaroni.id, orderId: order2.id, userId: order2.userId}),
    OrderItem.create({quantity: 5, productId: manicotti.id, orderId: order2.id, userId: order2.userId}),
    OrderItem.create({quantity: 6, productId: rigatoni.id, orderId: order2.id, userId: order2.userId}),
    OrderItem.create({quantity: 7, productId: macaroni.id, orderId: order3.id, userId: order3.userId}),
    OrderItem.create({quantity: 9, productId: penne.id, orderId: order3.id, userId: order3.userId}),
    OrderItem.create({quantity: 4, productId: macaroni.id, orderId: order4.id, userId: order4.userId}),
    OrderItem.create({quantity: 2, productId: spaghetti.id, orderId: order4.id, userId: order4.userId}),
  ]);



  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded ${orderItems.length} order items`);
  console.log(`seeded successfully`);
  return {
    users: {
      andy,
      corinne,
      alex,
      stanley
    },

    products: {
      farfalle, 
      orecchiette, 
      rotini, 
      orzo, 
      ditalini, 
      stelline, 
      spaghetti, 
      capellini, 
      vermicelli, 
      linguine, 
      tagliatelle, 
      fettuccine, 
      pappardelle, 
      bucatini, 
      lasagna, 
      penne, 
      rigatoni, 
      macaroni, 
      cannelloni, 
      manicotti, 
      ziti, 
      ravioli, 
      tortellini, 
      cappelletti, 
      agnolotti, 
      fagottini, 
      mezzelune
    },
    orderItems,
    orders: {
      order1,
      order2,
      order3,
      order4
    }

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
