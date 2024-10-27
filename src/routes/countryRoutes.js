const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// Route for getting all countries by population
router.get('/countries', countryController.getAllCountriesByPopulation);

// Route for getting countries by continent
router.get('/countries/continent/:continent', countryController.getCountriesByContinent);

// Route for getting countries by region
router.get('/countries/region/:region', countryController.getCountriesByRegion);

// Route for getting top N populated countries globally
router.get('/countries/top/:n', countryController.getTopNPopulatedCountries);

// Route for getting top N populated countries in a specific continent
router.get('/countries/top/continent/:continent/:n', countryController.getTopNPopulatedCountriesInContinent);

// Route for getting top N populated countries in a specific region
router.get('/countries/top/region/:region/:n', countryController.getTopNPopulatedCountriesInRegion);

module.exports = router;
