const consign = require('consign')

consign({cwd:'app'})
    .include('bootstrap/config.js')
    .then('bootstrap/express.js')
    .then('repository') 
    .then('service') 
    .then('controller')
    .then('route') 
    .then('middleware/errorInterceptor.js')
    .then('bootstrap/runner.js')
    .into({});