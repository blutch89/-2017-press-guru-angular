angular.module('pressGuruApp')
    .service("appParametersService", function () {
        var appParametersService = this;

        // Paths
        var paths = {};
        paths.prefix = "app_dev.php/";
        paths.webResources = "bundles/press-guru/";
        paths.api = paths.prefix + "frontend-api/";

        this.paths = paths;
    
        // Contrôleurs
        this.currentController = null;
    
        // Variables partagées
        this.editLabelsDialogController = null;
    
        // Connexion pages
        this.connectionPages = [
            "/connection",
            "/registration-confirmation"
        ];
});