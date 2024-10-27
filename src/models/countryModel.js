const db = require('../config/db');

// Get all countries by population
const getCountriesByPopulation = (callback) => {
  const query = 'SELECT Code, Name, Continent, Region, Population, Capital FROM country ORDER BY Population DESC';
  db.query(query, callback);
};

// Get countries by continent
const getCountriesByContinent = (continent, callback) => {
  const query = 'SELECT Code, Name, Continent, Region, Population, Capital FROM country WHERE Continent = ? ORDER BY Population DESC';
  db.query(query, [continent], callback);
};

// Get countries by region
const getCountriesByRegion = (region, callback) => {
  const query = 'SELECT Code, Name, Continent, Region, Population, Capital FROM country WHERE Region = ? ORDER BY Population DESC';
  db.query(query, [region], callback);
};

// Get top N populated countries globally
const getTopNPopulatedCountries = (n, callback) => {
  const query = 'SELECT Code, Name, Continent, Region, Population, Capital FROM country ORDER BY Population DESC LIMIT ?';
  db.query(query, [n], callback);
};

// Get top N populated countries in a continent
const getTopNPopulatedCountriesInContinent = (continent, n, callback) => {
  const query = 'SELECT Code, Name, Continent, Region, Population, Capital FROM country WHERE Continent = ? ORDER BY Population DESC LIMIT ?';
  db.query(query, [continent, n], callback);
};

// Get top N populated countries in a region
const getTopNPopulatedCountriesInRegion = (region, n, callback) => {
  const query = 'SELECT Code, Name, Continent, Region, Population, Capital FROM country WHERE Region = ? ORDER BY Population DESC LIMIT ?';
  db.query(query, [region, n], callback);
};

module.exports = {
  getCountriesByPopulation,
  getCountriesByContinent,
  getCountriesByRegion,
  getTopNPopulatedCountries,
  getTopNPopulatedCountriesInContinent,
  getTopNPopulatedCountriesInRegion
};