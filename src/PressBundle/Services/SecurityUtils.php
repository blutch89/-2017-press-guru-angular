<?php

namespace PressBundle\Services;

class SecurityUtils implements SecurityUtilsInterface {
    
    // Evite les injections de HTML en échappant les caractères spéciaux
    public function secureParameter($parameter) {
        $toReturn = htmlspecialchars($parameter);
        
        return $toReturn;
    }
}
