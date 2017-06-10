angular.module('pressGuruApp')
  .directive('editTag', ["appParametersService", function (appParametersService) {
    return {
        templateUrl: appParametersService.paths.webResources + "js/directives/edit-tag-directive-html.html",
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            isEdited: '=isEdited',
            tagId: '=tagId',
            oldName: '=oldName'
        },
        controller: function ($scope, $element, $attrs, $transclude) {
            // Variables
            $scope.newName = "";
            $scope.loading = false;
            $scope.errorMsg = "";
            
            // Modifie l'étiquette
            $scope.processEditTag = function() {
                $scope.loading = true;
                $scope.errorMsg = "";

                apiService.editTag($scope.tagId, $scope.newName, function successCallback(response) {
                    if (response.data.success == true) {
                        $scope.$parent.resetCurrentEditedTag();
                        $scope.$parent.loadDatas();

                        $scope.loading = false;
                    } else {
                        $scope.loading = false;
                        $scope.errorMsg = response.data.error
                    }
                }, function errorCallback(response) {
                    $scope.loading = false;
                    $scope.errorMsg = "Impossible de modfier l'étiquette";
                });
            };
            
            // Définit la valeur du champs name en fonction de l'ancien nom
            $scope.newName = $scope.oldName;
        },
    };
  }]);