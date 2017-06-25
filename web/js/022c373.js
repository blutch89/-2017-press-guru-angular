angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/connection', {
                templateUrl: '../bundles/press-guru/views/connection.html',
                controller: 'ConnectionController'
            })
            .when('/registration-confirmation/:token', {
                templateUrl: '../bundles/press-guru/views/registration-confirmation.html',
                controller: 'RegistrationConfirmationController'
            })
            .otherwise({
                redirectTo: '/connection'
            });
    }]);
angular.module('pressGuruApp')
    .service("appParametersService", function () {
        var appParametersService = this;

        // Paths
        var paths = {};
        paths.prefix = "";
//        paths.prefix = "app_dev.php/";
        paths.webResources = "bundles/press-guru/";
        paths.api = paths.prefix + "frontend-api/";

        this.paths = paths;
    
        // Contrôleurs
        this.mainController = null;
        this.currentController = null;
    
        // Variables partagées
        this.editLabelsDialogController = null;
        this.displayTagsDialogController = null;
});
angular.module('pressGuruApp')
    .service("authentificationService", function ($http, $location, appParametersService, csrftoken) {    
        this.loginRequest = function (datas, successFunction, errorFunction) {
            this.executePostForm("../" + appParametersService.paths.prefix + "login_check", datas, successFunction, errorFunction);
        };

        this.registerRequest = function (datas, successFunction, errorFunction) {
            this.executePostForm("../" + appParametersService.paths.prefix + "register", datas, successFunction, errorFunction);
        };
    
        this.activeAccount = function (token, successFunction, errorFunction) {
            this.executeRestApi("../" + appParametersService.paths.prefix + "confirm/" + token, successFunction, errorFunction)
        };
    
        this.logoutRequest = function(successFunction, errorFunction) {
        	this.executeRestApi(appParametersService.paths.prefix + "logout", successFunction, errorFunction);
        };
    
    

        // Permet d'exécuter une requête de type GET
        this.executeRestApi = function(url, successFunction, errorFunction) {
            $http({
                method: "GET",
                url: url
            }).then(successFunction, errorFunction);
        };
    
        // Permet d'exéuter une requête post de formulaire
        this.executePostForm = function (url, datas, successFunction, errorFunction) {
            datas["csrftoken"] = csrftoken;      // Ajout du token CSRF pour sécuriser l'appel à l'API
            
            $http({
                method  : 'POST',
                url     : url,
                data    : $.param(datas),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(successFunction, errorFunction);
        };
    });
angular.module('pressGuruApp')
    .service("userService", function() {
        this.getUserId = function() {
            return localStorage.getItem("user-id");
        };

        this.getUsername = function() {
            return localStorage.getItem("username");
        };

        this.saveUser = function(userId, username) {
            localStorage.setItem("user-id", userId);
            localStorage.setItem("username", username);
        };
});
angular.module('pressGuruApp')
  .directive('loading', function () {
    return {
        template: '<div ng-show="loading" class="loading-container"></div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            loading: '=value'
        },
        compile: function compile(element, attrs, transclude) {
            var spinner = new Spinner().spin();
            $(element).html(spinner.el);
        }
    };
  });
angular.module('pressGuruApp')
    .controller('ConnectionController', function ($scope, $location, authentificationService, userService, appParametersService, $window, csrftoken) {
        connectionController = this;
    
        // Variables propre au login et register
        $scope.loginLoading = false;
        $scope.registrationLoading = false;
        $scope.loginFormData = {};
        $scope.loginErrorMsg = "";
        $scope.registrationFormData = {};
        $scope.registrationErrorMsg = "";
        $scope.confirmationSended = false;
        $scope.csrftoken = csrftoken;
    
        // Fonction permettant de loguer un utilisateur
        $scope.processLoginForm = function() {
            $scope.loginLoading = true;
            
            authentificationService.loginRequest($scope.loginFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    userService.saveUser(response.data["user-id"], response.data["username"]);
                    $scope.loginLoading = false;
                    
                    // Redirige sur la page principale en enlevant la dernière lettre au prefix
                    $window.location.href = "../" + appParametersService.paths.prefix.substr(0, appParametersService.paths.prefix.length -1);
                } else {
                    if (response.data.error == "Account disabled") {
                        $scope.loginErrorMsg = "L'utilisateur n'est pas encore activé.";
                    } else {
                        $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                    }
                    
                    $scope.loginLoading = false;
                }
            }, function errorCallback(response) {
                $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                $scope.loginLoading = false;
            });
        };
        
        // Fonction permettant de s'enregistrer
        $scope.processRegistrationForm = function() {  
            $scope.registrationLoading = true;
            
            authentificationService.registerRequest($scope.registrationFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    $scope.confirmationSended = true;
                    $scope.registrationLoading = false;
                } else {
                    $scope.registrationErrorMsg = response.data.error;
                    $scope.registrationLoading = false;
                }
            }, function errorCallback(response) {
                $scope.registrationErrorMsg = response.data.error;
                $scope.registrationLoading = false;
            });
        };
    });
angular.module('pressGuruApp')
    .controller('RegistrationConfirmationController', function ($scope, $location, $routeParams, authentificationService) {
        RegistrationConfirmationController = this;
    
        // Variables liées à la activation de l'utilisateur
        $scope.inProgress = true;
        $scope.success = false;
        $scope.errorMsg = "";
    
        // Lance la requête d'activation
        this.activeAccount = function () {
            authentificationService.activeAccount($routeParams.token, function successCallback (response) {
                if (response.data.success) {
                    $scope.success = true;
                    $scope.inProgress = false;
                } else {
                    $scope.success = false;
                    $scope.inProgress = false;
                    $scope.errorMsg = response.data.error;
                }
            }, function errorCallback (response) {
                $scope.success = false;
                $scope.inProgress = false;
                $scope.errorMsg = response.data.error;
            });
        };
    
        $scope.goToConnection = function() {
            $location.path("/connection");
        };
    
        this.activeAccount();
    });