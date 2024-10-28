// routes/countryRoutes.js
const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// Route for the main countries page that uses the country-specific layout
router.get('/countries', (req, res) => {
    res.render('countries/countriesIndex', { title: 'Country Reports' });
});

// Route for getting all countries by population
router.get('/countries/all', countryController.getAllCountriesByPopulation);

// Route for getting countries by continent
router.get('/countries/continent/:continent', countryController.getCountriesByContinent);

// Route for getting countries by region
router.get('/countries/region/:region', countryController.getCountriesByRegion);

// Unified route for fetching top N countries based on query parameters (scope, continent, region)
router.get('/countries/top', countryController.getTopNCountries);

module.exports = router;