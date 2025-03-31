const express = require("express");
const catController = require("../controllers/catController");

const router = express.Router();

router.get("/tags", catController.getTags);
router.get("/cats/filter", catController.filterCats);
router.get("/cats/match", catController.matchTags);
router.get("/cats/test", catController.test);

//Stats  Routes

router.get("/popular", catController.getPopularSearches);
router.get("/popular-tags", catController.getPopularTags);

module.exports = router;
