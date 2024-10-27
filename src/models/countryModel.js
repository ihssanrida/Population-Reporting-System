const db = require('../config/db');

const getCountriesByPopulation = (callback) => {
  const sql = `SELECT Code, Name, Continent, Region, Population, Capital FROM country ORDER BY Population DESC`;
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const getCountriesByContinent = (continent, callback) => {
  const sql = `SELECT Code, Name, Population FROM country WHERE Continent = ? ORDER BY Population DESC`;
  db.query(sql, [continent], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const getTopNPopulatedCountries = (n, callback) => {
  const sql = `SELECT Code, Name, Population FROM country ORDER BY Population DESC LIMIT ?`;
  db.query(sql, [n], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  getCountriesByPopulation,
  getCountriesByContinent,
  getTopNPopulatedCountries
};
