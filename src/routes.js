'use strict';

const index = {
  config: {
    //
  },
  handler: function(req, res){
    return res('hello world')
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
