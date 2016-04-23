'use strict';

angular
    .module('FormBuilderApp')
    .controller('MainController', ['$scope', '$location', '$rootScope', 'UserService', MainController]);


function MainController($scope, $location, $rootScope, UserService) {
    // Dynamically set $scope.path to friendly version of hash
    // // Note: Attached to rootScope here because it is used in multiple views
    $rootScope.path = FormatPath($location.url())
    $scope.$on('$locationChangeStart', (function(){
        $rootScope.path = FormatPath($location.url());
    }));

    UserService.loggedIn().then(function(resp){
        var user = resp.data;
        // Already logged in
        if (user){
            $rootScope.user = user;
        }
    });
}

function FormatPath(path){
    var loc = path.lastIndexOf('/');
    if (loc != -1){
        path = path.slice(loc+1);
    }
    return path;
}
