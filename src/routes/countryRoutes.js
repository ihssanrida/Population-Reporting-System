// routes/countryRoutes.js
const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.get('/countries', (req, res) => {
    res.render('countries/countriesIndex', { title: 'Country Reports' });
});


router.get('/countries/all', countryController.getAllCountriesByPopulation);

router.get('/countries/continent/:continent', countryController.getCountriesByContinent);

router.get('/countries/region/:region', countryController.getCountriesByRegion);

// route for fetching top N countries based on query parameters (scope, continent, region)
router.get('/countries/top', countryController.getTopNCountries);

// Route for downloading all countries report
router.get('/countries/download/all', countryController.downloadAllCountriesReport);

// Route for downloading countries by continent report
router.get('/countries/download/continent/:continent', countryController.downloadCountriesByContinentReport);

// Route for downloading countries by region report
router.get('/countries/download/region/:region', countryController.downloadCountriesByRegionReport);

// Route for downloading top N countries report
router.get('/countries/download/top', countryController.downloadTopNCountriesReport);

// Route for fetching all regions
router.get('/countries/regions', countryController.getAllRegions);

module.exports = router;