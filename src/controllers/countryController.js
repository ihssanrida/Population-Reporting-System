const countryModel = require('../models/countryModel');

// Controller for getting all countries by population
const getAllCountriesByPopulation = (req, res) => {
  countryModel.getCountriesByPopulation((err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving countries');
    }
    res.render('countries/allCountries', { title: 'Countries by Population', countries });
  });
};

// Controller for getting countries by continent
const getCountriesByContinent = (req, res) => {
  const continent = req.params.continent;
  countryModel.getCountriesByContinent(continent, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving countries by continent');
    }
    res.render('countries/countriesByContinent', { title: `Countries in ${continent}`, countries });
  });
};

// Controller for getting countries by region
const getCountriesByRegion = (req, res) => {
  const region = req.params.region;
  countryModel.getCountriesByRegion(region, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving countries by region');
    }
    res.render('countries/countriesByRegion', { title: `Countries in ${region}`, countries });
  });
};

// Controller for getting top N populated countries based on scope
const getTopNCountries = (req, res) => {
  const n = parseInt(req.query.n, 10);
  const scope = req.query.scope;
  const continent = req.query.continent;
  const region = req.query.region;

  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of countries');
  }

  switch (scope) {
    case 'world':
      countryModel.getTopNPopulatedCountries(n, (err, countries) => {
        if (err) {
          return res.status(500).send('Error retrieving top N countries worldwide');
        }
        res.render('countries/topCountries', { title: `Top ${n} Countries by Population`, countries });
      });
      break;

    case 'continent':
      if (!continent) {
        return res.status(400).send('Continent is required for this scope');
      }
      countryModel.getTopNPopulatedCountriesInContinent(continent, n, (err, countries) => {
        if (err) {
          return res.status(500).send(`Error retrieving top N countries in ${continent}`);
        }
        res.render('countries/topCountries', { title: `Top ${n} Countries in ${continent}`, countries });
      });
      break;

    case 'region':
      if (!region) {
        return res.status(400).send('Region is required for this scope');
      }
      countryModel.getTopNPopulatedCountriesInRegion(region, n, (err, countries) => {
        if (err) {
          return res.status(500).send(`Error retrieving top N countries in ${region}`);
        }
        res.render('countries/topCountries', { title: `Top ${n} Countries in ${region}`, countries });
      });
      break;

    default:
      res.status(400).send('Invalid scope provided');
  }
};

module.exports = {
  getAllCountriesByPopulation,
  getCountriesByContinent,
  getCountriesByRegion,
  getTopNCountries,
};
