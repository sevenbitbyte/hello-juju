'use strict';

const Hoek = require('hoek')
const Good = require('good')
const Inert = require('inert')
const Blipp = require('blipp')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')

const Minimist = require('minimist')

const Argv = Minimist(process.argv)
const Pack = require('../package')
const Server = require('./server')


var plugins = [
  Inert,
  Vision,
  { register: HapiSwagger, options: {
      info: {
        'title': 'Test API Documentation',
        'version': Pack.version
      }
    }
  },
  { register: Blipp, options: {} },
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
           response: '*',
           log: '*'
         },
      }]
    }
  }
]

Server.register(
  {
    plugins: plugins,
    argv: Argv,
    config: {
      http_server: {
        host: 'localhost',
        port: 8000,
      },
      api_path: '',
      mongodb_uri: 'mongodb://localhost/hello-juju'
    }
  },
  function(err, server) {
    if(err){throw err;}

    server.start( (err) => {
      if (err) {
        throw err;
      }

      console.log('Server running at:', server.info.uri);
    })
  }
)
