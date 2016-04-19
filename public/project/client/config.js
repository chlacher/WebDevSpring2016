angular
    .module('LoLCompApp')
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.

        when('/team', {
            templateUrl: 'views/teamBuilder/team.builder.view.html',
            controller: 'TeamBuilderController'
        }).
        when('/home', {
            templateUrl: "views/home/home.view.html",
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }]);