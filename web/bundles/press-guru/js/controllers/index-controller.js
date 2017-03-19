angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location, apiService) {
        indexController = this;
        
        apiService.test(function(){}, function(){});
    });