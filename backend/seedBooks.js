/*
this is node script that generate random input data for testing
*/

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Book = require("./src/models/bookModel");
require("dotenv").config(); // To load environment variables

// Function to connect to the database
const connectToDatabase = async () => {
  const mongoDBURL = process.env.MONGOURL;

  if (!mongoDBURL) {
    console.error("MongoDB URL is missing in the environment variables.");
    process.exit(1); // Exit the process if no URL is provided
  }

  try {
    await mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if connection fails
  }
};

// Generate a single book object
const generateBook = () => ({
  title: faker.lorem.words(3), // Random title with 3 words
  author: faker.person.fullName(), // Random full name
  publishYear: faker.date.past(50).getFullYear(), // Random year within the last 50 years
});

// Insert multiple books into the database
const insertBooksIntoDB = async (books) => {
  try {
    await Book.insertMany(books);
    console.log(`${books.length} books successfully inserted.`);
  } catch (err) {
    console.error("Error inserting books:", err);
  }
};

// Generate and seed books into the database
const seedBooks = async (count = 50) => {
  const books = Array.from({ length: count }, generateBook); // Generate an array of books
  await insertBooksIntoDB(books); // Insert them into the DB
};

// Main function
const main = async () => {
  await connectToDatabase();
  await seedBooks(200); // You can adjust the number to generate more or fewer books
  mongoose.connection.close(); // Close the DB connection after seeding
};

// Run the main function
main();
