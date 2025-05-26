import Book from "../Model/BookSchema.js"
import mongoose from "mongoose";

// fetching books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    // ✅ Optional: Check if no books are found
    if (!books || books.length === 0) {
      return res.status(404).send("No books found");
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Something went wrong while fetching books");
  }
};

// adding books
export const addBook = async (req, res) => {
  const newBook = req.body;
  let { title, author, price, publishedDate } = newBook;

  // ✅ Check for missing required fields
  if (!title || !author || !price || !publishedDate) {
    return res.status(400).send("All fields (title, author, price, publishedDate) are required");
  }

  // ✅ Convert publishedDate to Date object
  publishedDate = new Date(publishedDate);
  if (publishedDate == "Invalid Date" || isNaN(publishedDate)) {
    return res.status(400).send("Invalid date format");
  }
  newBook.publishedDate = publishedDate;

  // ✅ Check for duplicate book
  const existingBook = await Book.findOne({ title, author });
  if (existingBook) {
    return res.status(409).send("Book already exists");
  }

  // ✅ Save new book
  try {
   let createdBook= await Book.create(newBook);
    res.status(201).json(createdBook);// Created
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send("Something went wrong");
  }
};


// updation

export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  const { title, author, price, publishedDate } = updatedBook;

  // ✅ Check if bookId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).send("Invalid book ID");
  }

  // ✅ Validate required fields
  if (!title || !author || !price || !publishedDate) {
    return res.status(400).send("All fields (title, author, price, publishedDate) are required");
  }

  // ✅ Convert publishedDate to Date and validate it
  const dateObj = new Date(publishedDate);
  if (dateObj == "Invalid Date" || isNaN(dateObj)) {
    return res.status(400).send("Invalid date format");
  }
  updatedBook.publishedDate = dateObj;

  try {
    const result = await Book.updateOne({ _id: bookId }, updatedBook);

    if (result.matchedCount === 0) {
      return res.status(404).send("Book not found");
    }

    res.sendStatus(200); // OK
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Something went wrong");
  }
};


// deletion

export const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  // ✅ Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).send("Invalid book ID");
  }

  try {
    const result = await Book.deleteOne({ _id: bookId });

    // ✅ Check if a book was actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).send("Book not found");
    }

    res.sendStatus(200); // OK
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Something went wrong");
  }
};

