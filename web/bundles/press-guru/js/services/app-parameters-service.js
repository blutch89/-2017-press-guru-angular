angular.module('pressGuruApp')
    .service("appParametersService", function () {
        var appParametersService = this;

        // Paths
        var paths = {};
    
        // Variables définies dans le script preAngular.js. Sert à avoir les bons chemins pour l'application qu'on soit en mode prod ou en dev
        paths.prefix = prefix;          
        paths.preprefix = preprefix;    
    
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