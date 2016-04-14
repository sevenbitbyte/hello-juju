'use strict';

const os=require('os')

const index = {
  config: {
    //
  },
  handler: function(req, res){

    let netInfo = os.networkInterfaces();

    return res(netInfo)
  }
}

exports.routes = function(server, prefix){
  var arr = [
    {
      // DELETE all company
      method: 'GET',
      path: prefix + '/',
      handler: index.handler,
      config: index.config
    }
  ]

  return arr;
}
