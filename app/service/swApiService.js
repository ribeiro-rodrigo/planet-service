const safira = require('safira'); 
const fetch = require('node-fetch'); 

class SwApiService{

    constructor(config){
        this._url = config.swApi.host; 

        this._configRequest = {
            timeout: config.swApi.timeout,
            headers:{Accept:'application/json'}
        };  
    }

    getHoldingsInMovies(movieName){
        console.log(`Getting hold of the planet in the movie ${movieName}`); 

        return fetch(`${this._url}/planets?search=${movieName}`,this._configRequest)
                    .then(res => res.json())
                    .then(body => body.results.reduce((amount,planet) => amount + planet.films.length,0))
    }
}

safira.define(SwApiService); 