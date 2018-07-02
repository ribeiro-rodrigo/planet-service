const safira = require('safira'); 

class PlanetController{

    constructor(planetRepository,swApiService){
        this._planetRepository = planetRepository; 
        this._swApiService = swApiService; 
    }

    listPlanets(req,res){
        console.log("Listing all the planets"); 

        this._planetRepository
                .all()
                .then(planets => planets.length ? res.json(planets) : res.sendStatus(204)); 
    }

    addPlanet(req,res,next){
        console.log("Adding planet"); 

        this._swApiService
                .getHoldingsInMovies(req.body.name)
                .then(qtdParticipations => req.body.participations = qtdParticipations)
                .then(() => this._planetRepository.insert(req.body))
                .then(planetAdded => {
                    res.setHeader('Location',`/v1/planets/${planetAdded.id}`); 
                    res.status(201)
                        .json(planetAdded); 
                })
                .catch(error => next(error)); 
    }

    getPlanet(req,res,next){
        console.log(`Getting Planet ${req.params.id}`); 

        this._planetRepository
                .findOne(req.params.id) 
                .then(planet => planet ? res.json(planet) : res.sendStatus(404))
                .catch(error => next(error)); 
    }

    removePlanet(req,res){
        console.log(`Removing planet ${req.params.id}`); 
        
        this._planetRepository
                .remove(req.params.id)
                .then(() => res.sendStatus(204))
                .catch(error => next(error)); 
    }
}

safira.define(PlanetController); 

