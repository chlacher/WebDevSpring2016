angular
    .module('LoLCompApp')
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'views/home/home.view.html',
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }]);