const db = require('../config/db');

/**
 * Fetches all cities globally, ordered by population in descending order.
 * @param {function} callback 
 */
const getCitiesByPopulation = (callback) => {
  const query = 'SELECT Name, CountryCode, District, Population FROM city ORDER BY Population DESC';
  console.log('Executing query to fetch all cities globally by population');
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return callback(error);
    }
    console.log('Query successful, fetched all cities globally');
    callback(null, results);
  });
};

/**
 * Fetches cities by continent, ordered by population in descending order.
 * @param {string} continent 
 * @param {function} callback 
 */
const getCitiesByContinent = (continent, callback) => {
  const query = `
    SELECT city.Name, city.CountryCode, city.District, city.Population
    FROM city
    JOIN country ON city.CountryCode = country.Code
    WHERE country.Continent = ? ORDER BY city.Population DESC`;
  console.log(`Executing query for cities in continent: ${continent}`);
  db.query(query, [continent], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return callback(error);
    }
    console.log(`Query successful, fetched cities in continent: ${continent}`);
    callback(null, results);
  });
};

/**
 * Fetches cities by region, ordered by population in descending order.
 * @param {string} region 
 * @param {function} callback 
 */
const getCitiesByRegion = (region, callback) => {
  const query = `
    SELECT city.Name, city.CountryCode, city.District, city.Population
    FROM city
    JOIN country ON city.CountryCode = country.Code
    WHERE country.Region = ? ORDER BY city.Population DESC`;
  console.log(`Executing query for cities in region: ${region}`);
  db.query(query, [region], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return callback(error);
    }
    console.log(`Query successful, fetched cities in region: ${region}`);
    callback(null, results);
  });
};

/**
 * Fetches cities by country, ordered by population in descending order.
 * @param {string} countryName 
 * @param {function} callback 
 */
const getCitiesByCountry = (countryName, callback) => {
  const query = `
    SELECT city.Name, city.CountryCode, city.District, city.Population 
    FROM city
    JOIN country ON city.CountryCode = country.Code
    WHERE country.Name = ? 
    ORDER BY city.Population DESC`;


  console.log(`Executing query for cities in country: ${countryName}`);
  
  db.query(query, [countryName], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return callback(error);
    }


    console.log(`Query successful, fetched cities in country: ${countryName}`);
    
    callback(null, results);
  });
};


/**
 * Fetches cities by district, ordered by population in descending order.
 * @param {string} district 
 * @param {function} callback 
 */
const getCitiesByDistrict = (district, callback) => {
  const query = `
    SELECT Name, CountryCode, District, Population 
    FROM city WHERE District = ? ORDER BY Population DESC`;
  console.log(`Executing query for cities in district: ${district}`);
  db.query(query, [district], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return callback(error);
    }
    console.log(`Query successful, fetched cities in district: ${district}`);
    callback(null, results);
  });
};



/**
 * Helper function to execute a query for fetching top N cities based on a given condition.
 * @param {string} condition 
 * @param {Array} params - Array of parameters to pass into the query.
 * @param {number} n - Number of cities to fetch.
 * @param {function} callback - Callback function to handle results or errors.
 */
const fetchTopNCities = (condition, params, n, callback) => {
  const query = `
    SELECT city.Name, city.CountryCode, city.District, city.Population
    FROM city
    JOIN country ON city.CountryCode = country.Code
    ${condition}
    ORDER BY city.Population DESC LIMIT ?`;

  console.log(`Executing query for top ${n} populated cities with condition: ${condition}`);
  
  // Add limit parameter to the end of params array
  params.push(n);
  
  db.query(query, params, (error, results) => {
    if (error) {
      console.error(`Error executing query with condition ${condition}:`, error);
      return callback(error);
    }
    console.log(`Query successful, fetched top ${n} populated cities with condition: ${condition}`);
    callback(null, results);
  });
};

/**
 * Fetches top N populated cities globally.
 * @param {number} n - Number of cities to fetch.
 * @param {function} callback 
 */
const getTopNPopulatedCities = (n, callback) => {
  const query = `
    SELECT Name, CountryCode, District, Population 
    FROM city ORDER BY Population DESC LIMIT ?`;
  console.log(`Executing query for top ${n} populated cities globally`);
  db.query(query, [n], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return callback(error);
    }
    console.log(`Query successful, fetched top ${n} populated cities globally`);
    callback(null, results);
  });
};

/**
 * Fetches top N populated cities in a specific continent.
 * @param {string} continent - Continent name.
 * @param {number} n - Number of cities to fetch.
 * @param {function} callback 
 */
const getTopNPopulatedCitiesInContinent = (continent, n, callback) => {
  fetchTopNCities('WHERE country.Continent = ?', [continent], n, callback);
};

/**
 * Fetches top N populated cities in a specific region.
 * @param {string} region - Region name.
 * @param {number} n - Number of cities to fetch.
 * @param {function} callback 
 */
const getTopNPopulatedCitiesInRegion = (region, n, callback) => {
  fetchTopNCities('WHERE country.Region = ?', [region], n, callback);
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
