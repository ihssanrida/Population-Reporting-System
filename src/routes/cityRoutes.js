const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/cities', cityController.getAllCitiesByPopulation);
router.get('/cities/continent/:continent', cityController.getCitiesByContinent);
router.get('/cities/region/:region', cityController.getCitiesByRegion);
router.get('/cities/country/:country', cityController.getCitiesByCountry);
router.get('/cities/district/:district', cityController.getCitiesByDistrict);
router.get('/cities/top/:n', cityController.getTopNPopulatedCities);
router.get('/cities/top/:continent/:n', cityController.getTopNPopulatedCitiesInContinent);
router.get('/cities/top/:region/:n', cityController.getTopNPopulatedCitiesInRegion);

module.exports = router;