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