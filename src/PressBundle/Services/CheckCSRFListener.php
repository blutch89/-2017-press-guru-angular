<?php

namespace PressBundle\Services;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Csrf\CsrfToken;

// Test le CSRF uniquement pour l'api (frontend-api)
class CheckCSRFListener {
    
    protected $csrfTokenManager;
    
    public function __construct($csrfTokenManager) {
        $this->csrfTokenManager = $csrfTokenManager;
    }
    
    public function onKernelRequest(GetResponseEvent $event) {
        $request = $event->getRequest();
        
        if (strpos($request->getPathInfo(), "frontend-api") !== false) {
            $csrfToken = $event->getRequest()->headers->get("csrftoken");
            
            if (!$this->csrfTokenManager->isTokenValid(new CsrfToken("", $csrfToken))) {
                $event->setResponse(new JsonResponse("Une erreur inconnue s'est produite.", 500));
            }
        }
    }
    
}