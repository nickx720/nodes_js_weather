const express = require('express');
const serverless = require('serverless-http');
const hbs = require('hbs');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');
// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nick'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        content: 'This is about html',
        name: 'Tom'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'This is help html which is a message',
        name: 'Thomas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: foreCastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.value);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Page not Found. Help article not found',
        title: '404',
        name: 'Nick'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not Found.',
        title: '404',
        name: 'Nick'
    });
})

/* app.listen(port, () => {
    console.log('Server is up on port 8080.');
}) */
module.exports.handler = serverless(app);