module.exports = (app) => {
  const quotes = require("../controllers/QuoteController");

  var router = require("express").Router();

  // Create a new quote
  router.post("/createQuote", quotes.create);

  // Retrieve all quotes
  router.get("/listQuotes", quotes.list);

  // Update a quote with id
  router.put("/updateQuote/:id", quotes.update);

  // Delete a quote with id
  router.put("/deleteQuote/:id", quotes.delete);

  app.use("/api/", router);
};
