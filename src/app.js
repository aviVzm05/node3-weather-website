const path     = require('path');
const express  = require('express');
const hbs      = require('hbs');
const {geocode, forecast} = require('./utils/functions');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config.
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// set up handlebars and views locaiton.
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Avinash'
    });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Avinash'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'Help me please...',
        title: 'Help Page',
        name: 'Avinash'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No Address value provided'
        })
    }
    const address = req.query.address;
    
    geocode(address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude,(error, body) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: body.current.weather_descriptions[0],
                location,
                address,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        })
    })
})

app.get('/help/*',(req, res)=> {
    res.render('error',{
        title: 'Not found',
        errorMessage: 'Help article not found',
        name: 'Avinash'
    })
})

app.get('*',(req, res) => {
    res.render('error',{
        title: 'Not Found',
        errorMessage: 'Page not found',
        name:'Avinash'
    })
})

app.listen(port,() => {
    console.log(`starting the server at ${port}`);
})