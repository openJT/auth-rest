'use strict';
// Test specific configuration
// ===========================
process.env.mongo_name = process.env.docker_mongo_name || 'localhost';

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + process.env.mongo_name + '/rest-test'
  }
};