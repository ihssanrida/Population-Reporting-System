const countryModel = require('../models/countryModel');

// Controller for getting all countries by population
const getAllCountriesByPopulation = (req, res) => {
  countryModel.getCountriesByPopulation((err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving countries');
    }
    res.render('countries/list', { title: 'Countries by Population', countries });
  });
};

// Controller for getting countries by continent
const getCountriesByContinent = (req, res) => {
  const continent = req.params.continent;
  countryModel.getCountriesByContinent(continent, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving countries by continent');
    }
    res.render('countries/list', { title: `Countries in ${continent}`, countries });
  });
};

// Controller for getting countries by region
const getCountriesByRegion = (req, res) => {
  const region = req.params.region;
  countryModel.getCountriesByRegion(region, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving countries by region');
    }
    res.render('countries/list', { title: `Countries in ${region}`, countries });
  });
};

// Controller for getting top N populated countries globally
const getTopNPopulatedCountries = (req, res) => {
  const n = parseInt(req.params.n, 10);
  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of countries');
  }
  countryModel.getTopNPopulatedCountries(n, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving top N countries');
    }
    res.render('countries/list', { title: `Top ${n} Populated Countries`, countries });
  });
};

// Controller for getting top N populated countries in a continent
const getTopNPopulatedCountriesInContinent = (req, res) => {
  const n = parseInt(req.params.n, 10);
  const continent = req.params.continent;
  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of countries');
  }
  countryModel.getTopNPopulatedCountriesInContinent(continent, n, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving top N countries in the continent');
    }
    res.render('countries/list', { title: `Top ${n} Countries in ${continent}`, countries });
  });
};

// Controller for getting top N populated countries in a region
const getTopNPopulatedCountriesInRegion = (req, res) => {
  const n = parseInt(req.params.n, 10);
  const region = req.params.region;
  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of countries');
  }
  countryModel.getTopNPopulatedCountriesInRegion(region, n, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving top N countries in the region');
    }
    res.render('countries/list', { title: `Top ${n} Countries in ${region}`, countries });
  });
};

module.exports = {
  getAllCountriesByPopulation,
  getCountriesByContinent,
  getCountriesByRegion,
  getTopNPopulatedCountries,
  getTopNPopulatedCountriesInContinent,
  getTopNPopulatedCountriesInRegion,
};
