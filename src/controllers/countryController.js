const countryModel = require('../models/countryModel');
const { Parser } = require('json2csv'); // For generating CSV files

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
    res.render('countries/countriesByContinent', { title: `Countries in ${continent}`, countries, continent });
  });
};

// Controller for getting countries by region
const getCountriesByRegion = (req, res) => {
  const region = req.params.region;
  countryModel.getCountriesByRegion(region, (err, countries) => {
    if (err) {
      return res.status(500).send('Error retrieving countries by region');
    }
    res.render('countries/countriesByRegion', { title: `Countries in ${region}`, countries, region });
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
        res.render('countries/topCountries', { title: `Top ${n} Countries by Population`, countries, n, scope, continent, region });
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
        res.render('countries/topCountries', { title: `Top ${n} Countries in ${continent}`, countries, n, scope, continent });
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
        res.render('countries/topCountries', { title: `Top ${n} Countries in ${region}`, countries, n, scope, region });
      });
      break;

    default:
      res.status(400).send('Invalid scope provided');
  }
};

// Controller for downloading all countries by population 
const downloadAllCountriesReport = (req, res) => {
  countryModel.getCountriesByPopulation((err, countries) => {
    if (err) {
      return res.status(500).send('Error generating report');
    }

    const fields = ['Code', 'Name', 'Continent', 'Region', 'Population', 'Capital'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(countries);

    res.header('Content-Type', 'text/csv');
    res.attachment('all_countries_report.csv');
    res.send(csv);
  });
};

// Controller for downloading countries by continent 
const downloadCountriesByContinentReport = (req, res) => {
 
   const { continent } = req.params;

  if (!continent) {
    return res.status(400).send('Continent is required');
  }

  console.log("Continent is: ", continent);
  

  countryModel.getCountriesByContinent(continent, (err, countries) => {
    if (err) {
      return res.status(500).send('Error generating report');
    }

    if (!countries || countries.length === 0) {
      return res.status(404).send('No data found for the specified continent');
    }

    const fields = ['Code', 'Name', 'Continent', 'Region', 'Population', 'Capital'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(countries);

    res.header('Content-Type', 'text/csv');
    res.attachment(`${continent}_countries_report.csv`);
    res.send(csv);
  });
};

// Controller for downloading countries by region 
const downloadCountriesByRegionReport = (req, res) => {
  const { region } = req.params;

  if (!region) {
    return res.status(400).send('Region is required');
  }

  countryModel.getCountriesByRegion(region, (err, countries) => {
    if (err) {
      return res.status(500).send('Error generating report');
    }

    if (!countries || countries.length === 0) {
      return res.status(404).send('No data found for the given region');
    }

    const fields = ['Code', 'Name', 'Continent', 'Region', 'Population', 'Capital'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(countries);

    res.header('Content-Type', 'text/csv');
    res.attachment(`${region}_countries_report.csv`);
    res.send(csv);
  });
};

// Controller for downloading top N countries as CSV
const downloadTopNCountriesReport = (req, res) => {
  const n = parseInt(req.query.n, 10);
  const scope = req.query.scope;
  const continent = req.query.continent;
  const region = req.query.region;

  if (isNaN(n) || n <= 0) {
    return res.status(400).send('Invalid number of countries');
  }

  const fields = ['Rank', 'Code', 'Name', 'Continent', 'Region', 'Population', 'Capital'];
  const json2csvParser = new Parser({ fields });

  const handleResponse = (err, countries) => {
    if (err) {
      return res.status(500).send('Error generating report');
    }

    if (!countries || countries.length === 0) {
      return res.status(404).send('No data found for the specified criteria');
    }

    const csv = json2csvParser.parse(countries);
    res.header('Content-Type', 'text/csv');
    res.attachment(`top_${n}_countries_report.csv`);
    res.send(csv);
  };

  switch (scope) {
    case 'world':
      countryModel.getTopNPopulatedCountries(n, handleResponse);
      break;
    case 'continent':
      if (!continent) {
        return res.status(400).send('Continent is required for this scope');
      }
      countryModel.getTopNPopulatedCountriesInContinent(continent, n, handleResponse);
      break;
    case 'region':
      if (!region) {
        return res.status(400).send('Region is required for this scope');
      }
      countryModel.getTopNPopulatedCountriesInRegion(region, n, handleResponse);
      break;
    default:
      res.status(400).send('Invalid scope provided');
  }
};

// Controller for getting all regions
const getAllRegions = (req, res) => {
  countryModel.getAllRegions((err, regions) => {
    if (err) {
      return res.status(500).send('Error retrieving regions');
    }
    res.json(regions);
  });
};

module.exports = {
  getAllCountriesByPopulation,
  getCountriesByContinent,
  getCountriesByRegion,
  getTopNCountries,
  downloadAllCountriesReport,
  downloadCountriesByContinentReport,
  downloadCountriesByRegionReport,
  downloadTopNCountriesReport,
  getAllRegions,
};
