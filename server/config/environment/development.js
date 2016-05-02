'use strict';
// Development specific configuration
// ==================================
process.env.mongo_name = process.env.docker_mongo_name || 'localhost';

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + process.env.mongo_name + '/rest-dev'
  },
  port: process.env.PORT ||
  9000

};
