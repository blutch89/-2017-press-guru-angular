# Description
Application de gestion de contenu de presse développé comme carte de visite.

# Technologies
## Backend
* PHP
* Symfony 2.8

## Frontend
* Bootstrap 3.3
* Javascript
* AngularJS 1.6
* jQuery 3.1

# Installation
1. Copier les fichiers sur un serveur PHP
2. Créer une base de données
3. Relier l'application à la base de données en modifiant le fichier "app/config/parameters.yml"
4. Modifier le reste des paramètres contenus dans le fichier "app/config/parameters.yml"
5. Créer les tables en exécutant cette commande : "php app/console doctrine:schema:update --force"
6. Modifier le fichier "web/bundles/press-guru/preAngular.js" pour indiquer si vous voulez utiliser le mode production ou le mode développement. Par défaut le mode production est activé.
7. Tester l'application en se rendant sur "http://nom_serveur/web/"

# Démo
Une démo est disponible à cette adresse: "http://press-guru.thomasgigon.ch".
