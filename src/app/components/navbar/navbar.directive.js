(function() {
  'use strict';

  angular
    .module('beatsDashboard')
    .directive('akNavbar', akNavbar);

  /** @ngInject */
  function akNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
