'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/rest-dev'
  },
  port:    process.env.PORT ||
  9000,

  domainUrl:'http://localhost'

};
