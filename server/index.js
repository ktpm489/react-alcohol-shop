import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
let fs = require('fs');
let bodyParser = require('body-parser');

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const compiler = webpack(webpackConfig)

function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if(err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        } catch(exception) {
            callback(exception);
        }
    });
}


app.use(webpackMiddleware(compiler, {
	hot:true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true 
}));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname,'./index.html'));
});

app.get('/getProducts', (req,res) => {
    let json =  readJSONFile('./client/data/products.json', function (err, json) {
        if(err) { throw err; }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(json));
    });


});

app.get('/getCategories', (req,res) => {
    let json =  readJSONFile('./client/data/categories.json', function (err, json) {
        if(err) { throw err; }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(json));
    });


});


app.post('/login', function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    if(req.body.userName === "lior@bizzabo.com" && req.body.password === "1")
    {
        res.send(JSON.stringify({"token":"a2e","isLogged": true}))
    }
    else {
        res.send(JSON.stringify({"isLogged": false}))
    }
    
});


app.listen(3000, () => console.log('running on localhost:3000'));