const axios = require("axios");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

const db = require("../models");
const Search = db.Search;
const { Sequelize } = require("sequelize");

// Fetches all available tags from the external API
exports.getTags = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tags." });
  }
};

// Filters cats based on the provided tag and pagination parameters
exports.filterCats = async (req, res) => {
  const { tag, omit, total } = req.query;

  console.log("Requested tag:", tag);

  // Validate input parameters
  if (!tag || isNaN(omit) || isNaN(total)) {
    return res.status(400).json({ error: "Invalid or missing parameters." });
  }

  try {
    const response = await axios.get(`${BASE_URL}/cats?tags=${tag}`);
    const totalLength = response.data.length;

    // Select a portion of the results based on pagination values
    const filteredCats = response.data.slice(
      parseInt(omit),
      parseInt(omit) + parseInt(total)
    );

    let message = "No changes in this search."; // Default message
    let newCats = [];
    let removedCats = [];

    // If this is the first page (omit == 0), compare results with the previous search
    if (omit == 0) {
      // Save the current search results in the database
      await this.saveSearch(tag, response.data);

      // Check if this tag was searched before
      const existingSearch = await Search.findOne({
        where: {
          termSearched: tag,
        },
        order: [["createdAt", "DESC"]], // Get the most recent search
      });

      if (existingSearch) {
        const oldResults = existingSearch.results || [];

        // Find new cats that were not in the previous search
        newCats = response.data.filter((newCat) => {
          return !oldResults.some((oldCat) => oldCat.id === newCat.id);
        });

        // Find cats that are missing from the new results
        removedCats = oldResults.filter((oldCat) => {
          return !response.data.some((newCat) => newCat.id === oldCat.id);
        });

        // Update the message based on changes
        if (newCats.length > 0) {
          message = "BINGO! A new cat was added in this search.";
        } else if (removedCats.length > 0) {
          message = "A cat has disappeared from this search.";
        }
      } else {
        message = "No search history found, this is a new search.";
      }
    }

    // Return the filtered results along with a message and detected changes
    res.json({
      totalLength,
      filteredCats,
      message,
      newCats, // List of newly added cats
      removedCats, // List of disappeared cats
    });
  } catch (error) {
    console.error("Error retrieving cats:", error);
    res.status(500).json({ error: "Error retrieving cats." });
  }
};

// Finds tags that match the user’s input string
exports.matchTags = async (req, res) => {
  const { string } = req.query;

  if (!string) {
    return res
      .status(400)
      .json({ error: "The 'string' parameter is required." });
  }

  try {
    const response = await axios.get(`${BASE_URL}/tags`);

    // Filter tags that contain the input string
    const matchingTags = response.data.filter((tag) => tag.includes(string));

    res.json({ query: string, matchingTags });
  } catch (error) {
    res.status(500).json({ error: "Error searching for tags." });
  }
};

// Saves a search result to the database
exports.saveSearch = async (termSearched, results) => {
  try {
    await Search.create({
      termSearched: termSearched,
      results: results,
    });

    console.log(`Search for "${termSearched}" saved successfully`);
  } catch (error) {
    console.error("Error saving search:", error);
  }
};

// Retrieves all search history from the database
exports.test = async (req, res) => {
  try {
    const all = await Search.findAll({});
    res.json(all);
  } catch (error) {
    console.error("Error saving search:", error);
  }
};

// Retrieves the most popular searches (most frequently searched terms)
exports.getPopularSearches = async (req, res) => {
  try {
    const popularSearches = await Search.findAll({
      attributes: [
        "termSearched",
        [Sequelize.fn("COUNT", Sequelize.col("termSearched")), "count"],
      ],
      group: ["termSearched"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 10,
    });

    res.status(200).json(popularSearches);
  } catch (error) {
    console.error("Error fetching popular searches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieves the most commonly searched tags
exports.getPopularTags = async (req, res) => {
  try {
    // Get all searches from the database
    const searches = await Search.findAll({
      attributes: ["termSearched"], // Only retrieve searched terms
    });

    const tagCounts = {}; // Object to count occurrences of tags

    // Loop through search results and count occurrences of each tag
    searches.forEach((search) => {
      const termsSearched = search.termSearched;

      if (termsSearched) {
        // Split the searched terms by commas and remove extra spaces
        const searchTerms = termsSearched.split(",").map((term) => term.trim());

        // Count each searched term
        searchTerms.forEach((term) => {
          if (term) {
            tagCounts[term] = (tagCounts[term] || 0) + 1;
          }
        });
      }
    });

    // Sort tags by their frequency and take the top 10
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    res.status(200).json(sortedTags);
  } catch (error) {
    console.error("Error fetching popular tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
