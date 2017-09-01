(function () {
    angular
        .module('SearchInventory')
        .factory('searchService', function ($http, $q) {
        function getItems(item) {
            var deferred = $q.defer();
            var params = {
                apiKey: 'ktjxht74egetdj6etayh494t',
                query: item
            };
            $http.get('http://api.walmartlabs.com/v1/search?apiKey=' + params.apiKey + "&query=" + params.query)
                .then(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        return {
            getItems: getItems
        };

    });

})();