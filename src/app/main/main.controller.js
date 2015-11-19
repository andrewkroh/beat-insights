(function() {
  'use strict';

  angular
    .module('beatsDashboard')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $github, localStorageService, github, moment, $location, $stateParams) {
    var vm = this;
    vm.filterString = $stateParams.q;

    // Throttle API requests to 1 per minute.
    var cacheItem = localStorageService.get('pullRequests');
    if (cacheItem == null || moment().subtract(1, 'minute').isAfter(cacheItem.time)) {
        github.search(null, function(value) {
            // Parse repo data from URLs so that we do not need to
            // make an additional API request.
            value.items.forEach(function(e) {
                var matches = e.url.match(/repos\/([\w\-_]+)\/([\w\-_]+)\//)
                if (matches !== null) {
                    e.repo = {
                        full_name: matches[1] + '/' +matches[2],
                        name: matches[2],
                        url: 'https://github.com/' + matches[1] + '/' +matches[2]
                    }
                }
            });

            var cacheItem = {
                time: moment(),
                item: value.items
            };

            // Save data to local storage:
            localStorageService.set('pullRequests', cacheItem);
            vm.pullRequests = value.items;
        });
    } else {
        vm.pullRequests = cacheItem.item;
    }

    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function luminance(hex) {
        var rgb = hexToRgb(hex);
        return (0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b)
    }

    vm.getFontColor = function(labelColor) {
       if (luminance(labelColor) < 127 ) {
            // Use white text for darker colors.
            return 'FFFFFF';
        } 

        return '000000';
    }

    vm.filter = function(labelName) {
        if (angular.isDefined(labelName)) {
          if (labelName === '') {
              $location.search('q', null);
          } else {
              $location.search('q', labelName);
          }

          vm.filterString = labelName;
        } else {
            return vm.filterString;
        }
    };
  }
})();
