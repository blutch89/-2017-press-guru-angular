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
        switch ($sortDirection) {
            case null:
                $toReturn["sortDirection"] = "desc";
                break;
            default:
                $toReturn["sortDirection"] = "desc";
                break;
        }
        
        return $toReturn;
    }
}
