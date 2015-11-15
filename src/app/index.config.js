(function() {
  'use strict';

  angular
    .module('beatsDashboard')
    .config(config);

  /** @ngInject */
  function config($logProvider, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    localStorageServiceProvider.setPrefix('beatsDashboard');
  }

})();
