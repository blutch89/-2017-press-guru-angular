<?php
namespace PressBundle\Services\CommonTasksForControllers;

use Symfony\Component\EventDispatcher\Event;

class CommonTasksForControllersEvent extends Event {
    
    // CSRF
    protected $tokenId;
    protected $token;
    protected $isCSRFValid = false;
    
    public function __construct($tokenId, $token) {
        $this->tokenId = $tokenId;
        $this->token = $token;
    }
    
    public function getTokenId() {
        return $this->tokenId;
    }
    
    public function getToken() {
        return $this->token;
    }
    
    public function isCSRFValid() {
        return $this->isCSRFValid;
    }
    
    public function setCSRFValid($value) {
        $this->isCSRFValid = $value;
    }
    
}
