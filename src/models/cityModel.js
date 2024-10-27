const db = require('../config/db');

// Get all cities by population
const getCitiesByPopulation = (callback) => {
  const query = 'SELECT Name, CountryCode, District, Population FROM city ORDER BY Population DESC';
  console.log('Executing query:', query);
  db.query(query, callback);
};

// Get cities by continent
const getCitiesByContinent = (continent, callback) => {
  const query = `SELECT city.Name, city.CountryCode, city.District, city.Population
                 FROM city
                 JOIN country ON city.CountryCode = country.Code
                 WHERE country.Continent = ? ORDER BY city.Population DESC`;
  console.log('Query results............:', results);
  db.query(query, [continent], callback);
};

// Get cities by region
const getCitiesByRegion = (region, callback) => {
  const query = `SELECT city.Name, city.CountryCode, city.District, city.Population
                 FROM city
                 JOIN country ON city.CountryCode = country.Code
                 WHERE country.Region = ? ORDER BY city.Population DESC`;
  db.query(query, [region], callback);
};

// Get cities by country
const getCitiesByCountry = (countryCode, callback) => {
  const query = 'SELECT Name, CountryCode, District, Population FROM city WHERE CountryCode = ? ORDER BY Population DESC';
  db.query(query, [countryCode], callback);
};

// Get cities by district
const getCitiesByDistrict = (district, callback) => {
  const query = 'SELECT Name, CountryCode, District, Population FROM city WHERE District = ? ORDER BY Population DESC';
  db.query(query, [district], callback);
};

// Get top N populated cities globally
const getTopNPopulatedCities = (n, callback) => {
  const query = 'SELECT Name, CountryCode, District, Population FROM city ORDER BY Population DESC LIMIT ?';
  db.query(query, [n], callback);
};

// Get top N populated cities in a continent
const getTopNPopulatedCitiesInContinent = (continent, n, callback) => {
  const query = `SELECT city.Name, city.CountryCode, city.District, city.Population
                 FROM city
                 JOIN country ON city.CountryCode = country.Code
                 WHERE country.Continent = ? ORDER BY city.Population DESC LIMIT ?`;
  db.query(query, [continent, n], callback);
};

// Get top N populated cities in a region
const getTopNPopulatedCitiesInRegion = (region, n, callback) => {
  const query = `SELECT city.Name, city.CountryCode, city.District, city.Population
                 FROM city
                 JOIN country ON city.CountryCode = country.Code
                 WHERE country.Region = ? ORDER BY city.Population DESC LIMIT ?`;
  db.query(query, [region, n], callback);
};

module.exports = {
  getCitiesByPopulation,
  getCitiesByContinent,
  getCitiesByRegion,
  getCitiesByCountry,
  getCitiesByDistrict,
  getTopNPopulatedCities,
  getTopNPopulatedCitiesInContinent,
  getTopNPopulatedCitiesInRegion
};