angular.module('pressGuruApp')
    .service("appParametersService", function () {
        var appParametersService = this;

        // Paths
        var paths = {};
        paths.prefix = "";
//        paths.prefix = "app_dev.php/";
    
        // Preprefix = variable utilisée pour utiliser le bon path sur la page authentification. "" pour mode prod et "../" pour mode dev
        // Ne pas oublier de modifier également dans le fichier appAuthentication la variable preprefix
        paths.preprefix = "";
//        paths.preprefix = "../";
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