const Quote = require("../models").Quote;
const Joi = require("joi");

module.exports = {
  // Create and Save a new Quote

  create(req, res) {
    //Validate the request
    const result = validateQuote(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    //If validation success
    const quote = {
      quote: req.body.quote,
      author: req.body.author,
      activeStatus: 1,
    };
    return Quote.create(quote)
      .then((quote) => res.status(200).send(quote))
      .catch((error) =>
        res.status(500).json({ message: "Error on creating quote" })
      );
  },

  //Update a Quote by the id in the request

  update(req, res) {
    const { id } = req.params;

    //Validate the request
    const result = validateQuote(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const quote = {
      quote: req.body.quote,
      author: req.body.author,
    };
    return Quote.update(quote, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({
            message: "Quote was updated successfully.",
          });
        } else {
          res.status(200).send({
            message: `Cannot update Quote with id=${id}. Maybe quote was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Quote with id=" + id,
        });
      });
  },

  // Retrieve all Tutorials from the database.

  list(req, res) {
    return Quote.findAll({
      where: {
        activeStatus: 1,
      },
    })
      .then((quotes) => res.status(200).send({ quotes }))
      .catch((error) =>
        res.json({
          message: "Error on retrieving quotes",
        })
      );
  },

  // Soft Delete a Quote with the specified id in the request

  //Description: Update the active status 0 for the specified id in the request
  delete(req, res) {
    const { id } = req.params;
    return Quote.update(
      { activeStatus: 0 },
      {
        where: { id: id },
      }
    )
      .then((num) => {
        if (num == 1) {
          res.status(200).send({
            message: "Quote was Deleted successfully.",
          });
        } else {
          res.status(200).send({
            message: `Cannot update Quote with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Quote with id=" + id,
        });
      });
  },
};

//Validation function
function validateQuote(quote) {
  const schema = Joi.object({
    quote: Joi.string().min(30).required(),
    author: Joi.string().min(3).required(),
  });

  return schema.validate(quote);
}
