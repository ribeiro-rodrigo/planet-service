const safira = require('safira'); 

class PlanetRoute{
    constructor(app,planetController){
        this._app = app; 
        this._controller = planetController; 
    }

    created(){
        this._app.route('/v1/planets')
                .get(this._controller.listPlanets.bind(this._controller)) 
                .post(this._controller.addPlanet.bind(this._controller)); 
        
        this._app.route('/v1/planets/:id')
                .get(this._controller.getPlanet.bind(this._controller))
                .delete(this._controller.removePlanet.bind(this._controller)); 
    }
}

safira.define(PlanetRoute)
        .build()
            .eager(); 