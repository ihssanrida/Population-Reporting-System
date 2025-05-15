const express = require('express');
const path = require('path');
const db = require('./config/db'); // Importing database connection
require('dotenv').config();


const countryRoutes = require('./routes/countryRoutes'); // Importing the country Routes
const cityRoutes = require('./routes/cityRoutes'); // Importing the city Routes
const countryModel = require('./models/countryModel'); // Importing the country model

const app = express();

//Set pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to fetch regions and make them available globally
app.use((req, res, next) => {
  countryModel.getAllRegions((err, regions) => {
    if (err) {
      console.error('Error fetching regions:', err);
      res.locals.regions = [];
    } else {
      res.locals.regions = regions;
    }
    next();
  });
});

app.use('/', countryRoutes);
app.use('/', cityRoutes);

//Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Population Reporting System' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Database connection details:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

    
  });
});

