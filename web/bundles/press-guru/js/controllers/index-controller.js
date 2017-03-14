angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location) {
        indexController = this;
        $location.path("/connection");
    });