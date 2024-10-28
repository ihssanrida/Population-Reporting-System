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

module.exports = router;