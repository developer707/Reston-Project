(function() {
  var app = angular.module('SearchInventory', ['ngSanitize']);

  app.controller('StoreController', ['searchService','$scope','$sce', function (searchService, $scope, $sce) {

        $scope.details = [];
        $scope.entry = "";
        $scope.inventory = [];
        $scope.invalidEntry = false;
        $scope.showDetails = false;
        $scope.previous = true;



        $scope.showPrevious = function(){
            $scope.showDetails = false;
            $scope.previous = true;
        };

        $scope.renderHTML = function(description) {
          var decoded = angular.element('<textarea />').html(description).text();
          return $sce.trustAsHtml(decoded);
        };

        $scope.showResults = function(item){
                $scope.details = item;
                $scope.showDetails = true;
                $scope.previous = false;
        };

        $scope.findItem = function(e){
            var enterEventCode = 13;
            if ((e.which === enterEventCode && $scope.entry) || e ==='search') {
                searchService.getItems($scope.entry).then(
                    function requestSuccess(response) {
                        $scope.inventory = response.data.items;
                        if (response.data.message) {
                            $scope.invalidEntry = true;
                            $scope.previous = true;
                        } else {
                            $scope.invalidEntry = false;
                            $scope.previous = true;
                        }
                        $scope.showDetails = false;
                    },
                    function requestError() {
                        console.log('error');
                    }
                );
            }
        }
    }]);
})();
