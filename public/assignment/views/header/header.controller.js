'use strict';

angular
    .module('FormBuilderApp')
    .controller('HeaderController', ['$scope', '$location', '$rootScope', HeaderController]);


function HeaderController($scope, $location) {
    console.log("Header Controller");
}
