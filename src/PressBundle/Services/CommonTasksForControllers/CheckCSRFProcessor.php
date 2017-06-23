<?php
namespace PressBundle\Services\CommonTasksForControllers;

use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;

class CheckCSRFProcessor implements ICheckCSRFProcessor {
    
    protected $csrfTokenManager;
    
    public function __construct(CsrfTokenManagerInterface $csrfTokenManager) {
        $this->csrfTokenManager = $csrfTokenManager;
    }
    
    public function isCSRFValid($tokenId, $token) {
        if ($this->csrfTokenManager->isTokenValid(new CsrfToken($tokenId, $token))) {
            return true;
        }
        
        return false;
    }
}
