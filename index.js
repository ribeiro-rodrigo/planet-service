const os = require('os')
const cluster = require('cluster')

function loadApp(){
    require('./app/bootstrap/bootstrap'); 
}

function createCluster(){
  os.cpus()
    .forEach(() => cluster.isMaster ? cluster.fork() : loadApp()); 
}

process.env["NODE_ENV"] == "production" ? createCluster() : loadApp();