const path = require('path');
const express = require('express');
const hbs = require('hbs',)

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // <__ gets handlebars set up
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>')
// });

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Mathew',
//     age: 51
//   });
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About this app</h1>')
// });

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mathew Daugherty'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mathew Daugherty'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Here, you will be able to find help for the Weather app.',
    name: 'Mathew Daugherty'
  });
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'An address must be provided'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

    if (error) {
      return res.send({ error });
    } 
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      } 
  
      res.send({
        forecast: forecastData, location,
        address: req.query.address
      })
    })
  })
});

// app.get('/products/', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term.'
//     })
//   }
  
//   res.send({
//     products: []
//   })

// })

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Mathew Daugherty'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'The page you are looking for does not exist.',
    name: 'Mathew Daugherty'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
}); // <-- starts up the app and '3000' is the port
