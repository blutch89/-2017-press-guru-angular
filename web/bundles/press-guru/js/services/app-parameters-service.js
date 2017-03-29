angular.module('pressGuruApp')
    .service("appParametersService", function () {
        var appParametersService = this;

        // Paths
        var paths = {};
        paths.prefix = "app_dev.php/";
        paths.webResources = "bundles/press-guru/";
        paths.api = paths.prefix + "frontend-api/";

        this.paths = paths;
    
        // Intervals
        var intervals = {};
        intervals.refreshArticlesPageInterval = 0;
//        intervals.refreshGamePageInterval = 0;
        intervals.clearAllPageIntervals = function() {
            clearInterval(intervals.refreshArticlesPageInterval);
//            clearInterval(intervals.refreshGamePageInterval);
        };
    
        this.intervals = intervals;
    
        // Connexion pages
        this.connectionPages = [
            "/connection",
            "/registration-confirmation"
        ];
});