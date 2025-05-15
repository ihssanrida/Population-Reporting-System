const cityModel = require('../models/cityModel');
const { Parser } = require('json2csv');


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
            // if (req.query.download === 'true') {
            //     const fields = ['Name', 'CountryCode', 'District', 'Population'];
            //     const json2csvParser = new Parser({ fields });
            //     const csv = json2csvParser.parse(cities);

            //     res.header('Content-Type', 'text/csv');
            //     res.attachment('cities_report.csv');
            //     return res.send(csv);
            // }
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
     * Downloads a CSV report of all cities globally
     */
    static downloadAllCitiesReport(req, res) {
        const { scope, continent, region, n } = req.query;

        let fetchCities;

        if (scope === 'continent' && continent) {
            fetchCities = (callback) => cityModel.getCitiesByContinent(continent, callback);
        } else if (scope === 'region' && region) {
            fetchCities = (callback) => cityModel.getCitiesByRegion(region, callback);
        } else {
            fetchCities = (callback) => cityModel.getCitiesByPopulation(callback);
        }

        fetchCities((error, cities) => {
            if (error) {
                console.error('Error fetching cities for report:', error);
                return res.status(500).render('error', { message: 'Error generating report' });
            }

            const fields = ['Name', 'CountryCode', 'District', 'Population'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(cities.slice(0, n ? parseInt(n) : cities.length));

            res.header('Content-Type', 'text/csv');
            res.attachment(`cities_${scope || 'global'}_report.csv`);
            return res.send(csv);
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
      const  country  = req.query.country || req.params.country;
      if(!country) {
        return res.status(400).render('error', {message: 'Country name is needed to filter cities'})
      }
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
        const  district  = req.query.district || req.params.district;
        if (!district) {
          return res.status(400).render('error', {message: "District name is required to filter cities. "})
        }
        cityModel.getCitiesByDistrict(district, (error, cities) => {
            if (error) {
                console.error(`Error fetching cities in district ${district}:`, error);
                return res.status(500).render('error', { message: 'Error retrieving cities by district' });
            }
            res.render('cities/byDistrict', { title: `Cities in ${district} District by Population`, district, cities });
        });
    }


    static downloadCitiesByCountryReport(req, res) {
        const { country} = req.params;
        cityModel.getCitiesByCountry(country, (error, cities) => {
            if (error) {
                console.error('Error fetching cities by country  report:', error);
                return res.status(500).render('error', { message: 'Error generating report' });
            }

            const fields = ['Name', 'CountryCode', 'District', 'Population'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(cities);

            res.header('Content-Type', 'text/csv');
            res.attachment(`cities_${country}_report.csv`);
            return res.send(csv);

        })
    }

    // Downloads a CSV report of cities in a specific district
   
    static downloadCitiesByDistrictReport(req, res) {
    const { district } = req.params;

    cityModel.getCitiesByDistrict(district, (error, cities) => {
        if (error) {
            console.error(`Error fetching cities in district ${district}:`, error);
            return res.status(500).render('error', { message: 'Error generating report' });
        }

        const fields = ['Name', 'CountryCode', 'District', 'Population'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(cities);

        res.header('Content-Type', 'text/csv');
        res.attachment(`cities_${district}_district_report.csv`);
        return res.send(csv);
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


   /**
     * Fetches the top N populated cities based on the provided scope and renders the "topNCities.pug" view.
     */
   static getTopNCities(req, res) {
    const n = parseInt(req.query.n, 10);
    const scope = req.query.scope;
    const continent = req.query.continent;
    const region = req.query.region;

    if (isNaN(n) || n <= 0) {
        return res.status(400).render('error', { message: 'Invalid number provided for top cities' });
    }

    cityModel.getAllRegions((error, regions) => {
        if (error) {
            console.error('Error fetching regions:', error);
            return res.status(500).render('error', { message: 'Error retrieving regions' });
        }

        switch (scope) {
            case 'world':
                cityModel.getTopNPopulatedCities(n, (error, cities) => {
                    if (error) {
                        console.error(`Error fetching top ${n} populated cities:`, error);
                        return res.status(500).render('error', { message: 'Error retrieving top cities' });
                    }
                    res.render('cities/topNCities', { title: `Top ${n} Cities by Population`, n, scope: 'World', cities, regions });
                });
                break;

            case 'continent':
                if (!continent) {
                    return res.status(400).render('error', { message: 'Continent is required for this scope' });
                }
                cityModel.getTopNPopulatedCitiesInContinent(continent, n, (error, cities) => {
                    if (error) {
                        console.error(`Error fetching top ${n} cities in continent ${continent}:`, error);
                        return res.status(500).render('error', { message: 'Error retrieving top cities by continent' });
                    }
                    res.render('cities/topNCities', { title: `Top ${n} Cities in ${continent}`, n, scope: continent, cities, regions });
                });
                break;

            case 'region':
                if (!region) {
                    return res.status(400).render('error', { message: 'Region is required for this scope' });
                }
                cityModel.getTopNPopulatedCitiesInRegion(region, n, (error, cities) => {
                    if (error) {
                        console.error(`Error fetching top ${n} cities in region ${region}:`, error);
                        return res.status(500).render('error', { message: 'Error retrieving top cities by region' });
                    }
                    res.render('cities/topNCities', { title: `Top ${n} Cities in ${region}`, n, scope: region, cities, regions });
                });
                break;

            default:
                res.status(400).render('error', { message: 'Invalid scope provided' });
        }
    });
}

// Generates and downloads a CSV report of the top N populated cities based on the provided scope.
   
    static downloadTopNCitiesReport(req, res) {
        const n = parseInt(req.params.n, 10);
        const scope = req.query.scope?.toLowerCase(); 

        
        const continent = req.query.continent;
        const region = req.query.region;

        console.log('Download Top N Cities Report:', { n, scope, continent, region });

        // Helper function to send CSV
        const sendCSV = (prefix, cities) => {
            const fields = ['Name', 'CountryCode', 'District', 'Population'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(cities);

            res.header('Content-Type', 'text/csv');
            res.attachment(`top_${n}_cities_${prefix}_report.csv`);
            return res.send(csv);
        };

        // Handle global scope
        if (scope === 'world') {
            return cityModel.getTopNPopulatedCities(n, (err, cities) => {
                if (err) {
                    console.error(`Error generating global report:`, err);
                    return res.status(500).render('error', { message: 'Error generating report' });
                }
                return sendCSV('global', cities);
            });
        }

        // Handle continent scope
        if (scope === 'continent' && continent) {
            return cityModel.getTopNPopulatedCitiesInContinent(continent, n, (err, cities) => {
                if (err) {
                    console.error(`Error generating report for continent ${continent}:`, err);
                    return res.status(500).render('error', { message: 'Error generating report' });
                }
                return sendCSV(`continent_${continent}`, cities);
            });
        }

        // Handle region scope
        if (scope === 'region' && region) {
            return cityModel.getTopNPopulatedCitiesInRegion(region, n, (err, cities) => {
                if (err) {
                    console.error(`Error generating report for region ${region}:`, err);
                    return res.status(500).render('error', { message: 'Error generating report' });
                }
                return sendCSV(`region_${region}`, cities);
            });
        }

        // If scope is invalid, return an error
        return res.status(400).render('error', { message: 'Invalid scope or missing parameters' });
    }


/**
 * Fetches all available regions and renders a view for region selection
 */
static getRegionsForSelection(req, res) {
    cityModel.getAllRegions((error, regions) => {
        if (error) {
            console.error('Error fetching regions:', error);
            return res.status(500).render('error', { message: 'Error retrieving regions' });
        }
        
        // Determine the destination route based on query parameter
        const destination = req.query.for || 'cities'; // Default to cities if not specified
        
        res.render('cities/regionSelector', { 
            title: 'Select a Region', 
            regions, 
            destination,
            n: req.query.n // Pass through any 'n' parameter for top N cities
        });
    });
}


 }



module.exports = CityController;
