const cityModel = require('../models/cityModel');

// Controller for getting all cities by population
const getAllCitiesByPopulation = (req, res) => {
  cityModel.getCitiesByPopulation((err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving cities');
    }
    res.render('cities/list', { title: 'Cities by Population', cities });
  });
};

// Controller for getting cities by continent
const getCitiesByContinent = (req, res) => {
  const continent = req.params.continent;
  cityModel.getCitiesByContinent(continent, (err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving cities by continent');
    }
    res.render('cities/list', { title: `Cities in ${continent}`, cities });
  });
};

// Controller for getting cities by region
const getCitiesByRegion = (req, res) => {
  const region = req.params.region;
  cityModel.getCitiesByRegion(region, (err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving cities by region');
    }
    res.render('cities/list', { title: `Cities in ${region}`, cities });
  });
};

// Controller for getting cities by country
const getCitiesByCountry = (req, res) => {
  const country = req.params.country;
  cityModel.getCitiesByCountry(country, (err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving cities by country');
    }
    res.render('cities/list', { title: `Cities in ${country}`, cities });
  });
};

// Controller for getting cities by district
const getCitiesByDistrict = (req, res) => {
  const district = req.params.district;
  cityModel.getCitiesByDistrict(district, (err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving cities by district');
    }
    res.render('cities/list', { title: `Cities in ${district}`, cities });
  });
};

// Controller for getting top N populated cities globally
const getTopNPopulatedCities = (req, res) => {
  const n = parseInt(req.params.n, 10);
  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of cities');
  }
  cityModel.getTopNPopulatedCities(n, (err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving top N cities');
    }
    res.render('cities/list', { title: `Top ${n} Populated Cities`, cities });
  });
};

// Controller for getting top N populated cities in a continent
const getTopNPopulatedCitiesInContinent = (req, res) => {
  const n = parseInt(req.params.n, 10);
  const continent = req.params.continent;
  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of cities');
  }
  cityModel.getTopNPopulatedCitiesInContinent(continent, n, (err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving top N cities in continent');
    }
    res.render('cities/list', { title: `Top ${n} Cities in ${continent}`, cities });
  });
};

// Controller for getting top N populated cities in a region
const getTopNPopulatedCitiesInRegion = (req, res) => {
  const n = parseInt(req.params.n, 10);
  const region = req.params.region;
  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of cities');
  }
  cityModel.getTopNPopulatedCitiesInRegion(region, n, (err, cities) => {
    if (err) {
      return res.status(500).send('Error retrieving top N cities in region');
    }
    res.render('cities/list', { title: `Top ${n} Cities in ${region}`, cities });
  });
};

module.exports = {
  getAllCitiesByPopulation,
  getCitiesByContinent,
  getCitiesByRegion,
  getCitiesByCountry,
  getCitiesByDistrict,
  getTopNPopulatedCities,
  getTopNPopulatedCitiesInContinent,
  getTopNPopulatedCitiesInRegion,
};
