const db = require('../config/db');

const getCitiesByPopulation = (callback) => {
  const sql = `SELECT Name, CountryCode, District, Population FROM city ORDER BY Population DESC`;
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const getCitiesByCountry = (countryCode, callback) => {
  const sql = `SELECT Name, District, Population FROM city WHERE CountryCode = ? ORDER BY Population DESC`;
  db.query(sql, [countryCode], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const getTopNPopulatedCities = (n, callback) => {
  const sql = `SELECT Name, CountryCode, Population FROM city ORDER BY Population DESC LIMIT ?`;
  db.query(sql, [n], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  getCitiesByPopulation,
  getCitiesByCountry,
  getTopNPopulatedCities
};
