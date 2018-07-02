const safira = require('safira');

class ErrorInterceptor{
    constructor(app){
        this._app = app; 
    }

    created(){
        this._app.use(this._intercept.bind(this));
    }

    _intercept(error,req,res,next){
        console.log(error);
        res.sendStatus(500); 
    }
}

safira.define(ErrorInterceptor)
        .build()
        .eager(); 