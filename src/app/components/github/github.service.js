(function() {
  'use strict';

  angular
    .module('beatsDashboard')
    .factory('github', github);

  /** @ngInject */
  function github($log, $resource) {
    var apiHost = 'https://api.github.com';

    var repos = [
      'beats-dashboard',
      'beats-packer',
      'beats-tester',
      'filebeat',
      'gosigar',
      'libbeat',
      'packetbeat',
      'topbeat',
      'winlogbeat'
    ];

    var repoQuery = repos.map(function(e) {
        return "repo:elastic/" + e;
    }).reduce(function(prev, curr) {
        return prev + ' ' + curr;
    });

    var service = {
      search: search
    };

    return service;

    function search(query, callback) {
      return $resource(apiHost + '/search/issues', {
        q: 'type:pr state:open ' + repoQuery
      }).get(query, callback);
    }
  }
})();
