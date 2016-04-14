'use strict';

const Joi = require('joi')
const Hapi = require('hapi')
const Hoek = require('hoek')


exports.register = function(options, cb){

  var server = new Hapi.Server({
    app: {
      argv: options.argv,
      config: options.config
    }
  })

  var appConfig = server.settings.app.config

  var hapiPlugins = Hoek.clone(options.plugins)

  server.connection({
      host: appConfig.http_server.host,
      port: appConfig.http_server.port,
      routes: {
        cors: true
      }
  })


  server.register(
    hapiPlugins,
    (err) => {

      if(err){return cb(err)}

      for(var idx in options.auth){
        var strategy = options.auth[idx]
        server.auth.strategy(strategy.name, strategy.scheme, strategy.options)
      }

      const Routes = require('./routes')
      server.route(Routes.routes(server, appConfig.api_path))

      cb(null, server)
    }
  )
}
