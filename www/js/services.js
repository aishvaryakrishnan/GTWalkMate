angular.module('starter.services', ['ionic', 'ngResource'])

/**
 * A simple example service that returns some data.
 */
..factory('AddWalker', function($resource) {
  return $resource('http://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/addwalker');
});
