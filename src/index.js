const express = require('express');
const path = require('path');
const db = require('./config/db'); // Importing database connection
require('dotenv').config();


const countryRoutes = require('./routes/countryRoutes');
const cityRoutes = require('./routes/cityRoutes');

const app = express();

//Set pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//serve static files
app.use(express.static(path.join(__dirname, 'public')));




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

