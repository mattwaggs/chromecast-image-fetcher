#!/usr/bin/node
var request       = require('request');
var literalParser = require('./literal-parser');

var chromecastHomePageURL = 'https://clients3.google.com/cast/chromecast/home';
var initialStateRegex     = /(JSON\.parse\('.+'\))\)\./;

var parseInitialStateFromHtml = function(htmlResponse) {
    
    // parse the html to find the initial state
    var matchedJSON = htmlResponse.match(initialStateRegex)[1];
    // transform the literal characters back to strings
    var initialState = literalParser(matchedJSON);
    // remove the json.parse part of the string so we are left with just the json
    initialState = initialState.replace('JSON.parse(\'', '');
    initialState = initialState.substr(0, initialState.length - 2);
    
    // parse to an actual object
    return JSON.parse(initialState);
};

var parseInitialStateForImageData = function(initialState) {

    var backdrops = [];
    var imageList = initialState[0];
    
    for (var row in imageList) {
        backdrops.push({
            author: imageList[row][1],
            info: (imageList[row][14] || [[""]])[0][0],
            url: imageList[row][0],
        });
    }

    return backdrops;
};

request(chromecastHomePageURL, function(err, res) {
    var result = parseInitialStateFromHtml(res.body.toString());
    var images = parseInitialStateForImageData(result);
    console.log(images);
});

