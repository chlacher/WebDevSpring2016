'use strict';

angular
    .module('FormBuilderApp')
    .controller('MainController', ['$scope', '$location', '$rootScope', MainController]);


function MainController($scope, $location, $rootScope) {
    // Dynamically set $scope.path to friendly version of hash
    // // Note: Attached to rootScope here because it is used in multiple views
    $rootScope.path = FormatPath($location.url())
    $scope.$on('$locationChangeStart', (function(){
        $rootScope.path = FormatPath($location.url());
    }));
}

function FormatPath(path){
    var loc = path.lastIndexOf('/');
    if (loc != -1){
        path = path.slice(loc+1);
    }
    return path;
}
