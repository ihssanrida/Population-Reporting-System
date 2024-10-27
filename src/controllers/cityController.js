const cityModel = require('../models/cityModel');
const { Parser } = require('json2csv');

/**
 * CityController class handles requests for city data by various geographic scopes.
 */
class CityController {

    /**
     * Fetches all cities worldwide, sorted by population, and renders the "allCities.pug" view.
     */
    static getAllCitiesByPopulation(req, res) {
        cityModel.getCitiesByPopulation((error, cities) => {
            if (error) {
                console.error('Error fetching all cities by population:', error);
                return res.status(500).render('error', { message: 'Error retrieving cities' });
            }
            res.render('cities/allCities', { title: 'All Cities by Population', cities });
        });
    }

    /**
     * Fetches cities in a specific continent by population and renders the "byContinent.pug" view.
     */
    static getCitiesByContinent(req, res) {
        const { continent } = req.params;
        cityModel.getCitiesByContinent(continent, (error, cities) => {
            if (error) {
                console.error(`Error fetching cities in continent ${continent}:`, error);
                return res.status(500).render('error', { message: 'Error retrieving cities by continent' });
            }
            res.render('cities/byContinent', { title: `Cities in ${continent} by Population`, continent, cities });
        });
    }

    /**
     * Fetches cities in a specific region by population and renders the "byRegion.pug" view.
     */
    static getCitiesByRegion(req, res) {
        const { region } = req.params;
        cityModel.getCitiesByRegion(region, (error, cities) => {
            if (error) {
                console.error(`Error fetching cities in region ${region}:`, error);
                return res.status(500).render('error', { message: 'Error retrieving cities by region' });
            }
            res.render('cities/byRegion', { title: `Cities in ${region} by Population`, region, cities });
        });
    }


    /**
     * Generates and downloads a CSV report of cities in a specific region.
     */
    static downloadCitiesByRegionReport(req, res) {
      const { region } = req.params;
      cityModel.getCitiesByRegion(region, (error, cities) => {
          if (error) {
              console.error('Error fetching cities for report:', error);
              return res.status(500).render('error', { message: 'Error generating report' });
          }

          const fields = ['Name', 'CountryCode', 'District', 'Population'];
          const json2csvParser = new Parser({ fields });
          const csv = json2csvParser.parse(cities);

          res.header('Content-Type', 'text/csv');
          res.attachment(`cities_${region}_report.csv`);
          return res.send(csv);
      });
  }

    /**
     * Fetches cities in a specific country by population and renders the "byCountry.pug" view.
     */
    static getCitiesByCountry(req, res) {
        const { country } = req.params;
        cityModel.getCitiesByCountry(country, (error, cities) => {
            if (error) {
                console.error(`Error fetching cities in country ${country}:`, error);
                return res.status(500).render('error', { message: 'Error retrieving cities by country' });
            }
            res.render('cities/byCountry', { title: `Cities in ${country} by Population`, country, cities });
        });
    }

    /**
     * Fetches cities in a specific district by population and renders the "byDistrict.pug" view.
     */
    static getCitiesByDistrict(req, res) {
        const { district } = req.params;
        cityModel.getCitiesByDistrict(district, (error, cities) => {
            if (error) {
                console.error(`Error fetching cities in district ${district}:`, error);
                return res.status(500).render('error', { message: 'Error retrieving cities by district' });
            }
            res.render('cities/byDistrict', { title: `Cities in ${district} District by Population`, district, cities });
        });
    }

    /**
     * Fetches the top N populated cities worldwide and renders the "topNCities.pug" view.
     */
    static getTopNPopulatedCities(req, res) {
        const n = parseInt(req.params.n, 10);
        if (isNaN(n) || n <= 0) {
            return res.status(400).render('error', { message: 'Invalid number provided for top cities' });
        }
        cityModel.getTopNPopulatedCities(n, (error, cities) => {
            if (error) {
                console.error(`Error fetching top ${n} populated cities:`, error);
                return res.status(500).render('error', { message: 'Error retrieving top cities' });
            }
            res.render('cities/topNCities', { title: `Top ${n} Cities by Population`, n, scope: 'World', cities });
        });
    }

    /**
     * Fetches the top N populated cities in a specific continent and renders the "topNCities.pug" view.
     */
    static getTopNPopulatedCitiesInContinent(req, res) {
        const { continent, n } = req.params;
        const limit = parseInt(n, 10);
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).render('error', { message: 'Invalid number provided for top cities' });
        }
        cityModel.getTopNPopulatedCitiesInContinent(continent, limit, (error, cities) => {
            if (error) {
                console.error(`Error fetching top ${limit} cities in continent ${continent}:`, error);
                return res.status(500).render('error', { message: 'Error retrieving top cities by continent' });
            }
            res.render('cities/topNCities', { title: `Top ${limit} Cities in ${continent}`, n: limit, scope: continent, cities });
        });
    }

    /**
     * Fetches the top N populated cities in a specific region and renders the "topNCities.pug" view.
     */
    static getTopNPopulatedCitiesInRegion(req, res) {
        const { region, n } = req.params;
        const limit = parseInt(n, 10);
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).render('error', { message: 'Invalid number provided for top cities' });
        }
        cityModel.getTopNPopulatedCitiesInRegion(region, limit, (error, cities) => {
            if (error) {
                console.error(`Error fetching top ${limit} cities in region ${region}:`, error);
                return res.status(500).render('error', { message: 'Error retrieving top cities by region' });
            }
            res.render('cities/topNCities', { title: `Top ${limit} Cities in ${region}`, n: limit, scope: region, cities });
        });
    }

     /**
     * Generates and downloads a CSV report of cities in a specific continent.
     */
     static downloadCitiesReport(req, res) {
      const { continent } = req.params;
      cityModel.getCitiesByContinent(continent, (error, cities) => {
          if (error) {
              console.error('Error fetching cities for report:', error);
              return res.status(500).render('error', { message: 'Error generating report' });
          }

          const fields = ['Name', 'CountryCode', 'District', 'Population'];
          const json2csvParser = new Parser({ fields });
          const csv = json2csvParser.parse(cities);

          res.header('Content-Type', 'text/csv');
          res.attachment(`cities_${continent}_report.csv`);
          return res.send(csv);
      });
  }
}

module.exports = CityController;
