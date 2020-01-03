const safira = require('safira');

class PlanetRepository {

    constructor() {
        this._planets = [
            {
                "id": 1,
                "name": "marte"
            },
            {
                "id": 2,
                "name": "plutao-3001"
            }
        ]
    }

    all() {
        return Promise.resolve(this._planets);
    }

    insert(planet) {
        return new Promise(resolve => {
            planet.id = this._planets.length + 1;
            this._planets.push(planet);
            resolve(planet)
        })
    }

    findOne(id) {
        return Promise.resolve(
            this._planets
                .filter(planet => planet.id == id)
                .reduce((planet, planetFilered) => planetFilered, null)
        );
    }

    remove(id) {
        return new Promise(resolve => {
            this._planets = this._planets.filter(planet => planet.id != id);
            resolve()
        })
    }
}

safira.define(PlanetRepository);

