<?php
namespace PressBundle\Services;

class SortParametersConverter implements SortParametersConverterInterface {
    public function __construct() {
        
    }
    
    public function convertSortParameters($sortBy, $sortDirection) {
        $toReturn = array();
        
        // Convertion pour $sortBy
        switch ($sortBy) {
            case null:
                $toReturn["sortBy"] = "creationDate";
                break;
            case "date":
                $toReturn["sortBy"] = "creationDate";
                break;
            default:
                $toReturn["sortBy"] = "creationDate";
                break;
        }
        
        // Convertion pour $sortDirection
        switch (strtolower($sortDirection)) {
            case null:
                $toReturn["sortDirection"] = "desc";
                break;
            case "asc":                 // Permet d'éviter les failles XSS en ne réutilisant pas la valeur de la variable
                $toReturn["sortDirection"] = "asc";
                break;
            case "desc":                // Permet d'éviter les failles XSS en ne réutilisant pas la valeur de la variable
                $toReturn["sortDirection"] = "desc";
                break;
        }
        
        return $toReturn;
    }
}
