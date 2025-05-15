const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Routes for city reports
router.get('/cities', cityController.getAllCitiesByPopulation);
router.get('/cities/continent/:continent', cityController.getCitiesByContinent);
router.get('/cities/region/:region', cityController.getCitiesByRegion);
router.get('/cities/country', cityController.getCitiesByCountry);
router.get('/cities/district', cityController.getCitiesByDistrict);

// Top N Cities form and results
router.get('/cities/top-form', cityController.getRegionsForSelection);
router.get('/cities/top', cityController.getTopNCities);

// Report generation routes
// Download all cities report
router.get('/cities/download', cityController.downloadAllCitiesReport);

// Download continent report
router.get('/cities/download/:continent', cityController.downloadCitiesReport);

// Download by region report
router.get('/cities/download/region/:region', cityController.downloadCitiesByRegionReport);

// Download city by country report
router.get('/cities/download/country/:country', cityController.downloadCitiesByCountryReport);

// Download city by district report
router.get('/cities/download/district/:district', cityController.downloadCitiesByDistrictReport);

// Download Top N city report
router.get('/cities/download/top/:n', cityController.downloadTopNCitiesReport);

module.exports = router;