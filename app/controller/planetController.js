const safira = require('safira');

class PlanetController {

    constructor(planetRepository, swApiService) {
        this._planetRepository = planetRepository;
        this._swApiService = swApiService;
    }

    async listPlanets(req, res) {
        console.log("Listing all the planets");

        let planets = await this._planetRepository.all()

        if (planets.length)
            res.json(planets)
        else
            res.sendStatus(204)
    }

    async addPlanet(req, res, next) {
        console.log("Adding planet");

        try {
            const qtdParticipations = await this._swApiService.getHoldingsInMovies(req.body.name)
            req.body.participations = qtdParticipations || 0
            const planetAdded = await this._planetRepository.insert(req.body)
            res.setHeader('Location', `/v1/planets/${planetAdded.id}`)
            res.status(201).json(planetAdded);
        } catch (e) {
            next(e)
        }
    }

    async getPlanet(req, res, next) {
        console.log(`Getting Planet ${req.params.id}`);

        try {
            const planet = await this._planetRepository.findOne(req.params.id);

            if (planet)
                res.json(planet)
            else
                res.sendStatus(404)
        }
        catch (e) {
            next(e);
        }
    }

    async removePlanet(req, res) {
        console.log(`Removing planet ${req.params.id}`);

        try {
            await this._planetRepository.remove(req.params.id)
            res.sendStatus(204)
        }
        catch (e) {
            next(e);
        }
    }
}

safira.define(PlanetController);

