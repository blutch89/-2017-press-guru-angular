<?php
namespace PressBundle\Services\CommonTasksForControllers;

class CommonTasksForControllersListener {
    
    protected $csrfProcessor;
    
    public function __construct(ICheckCSRFProcessor $csrfProcessor) {
        $this->csrfProcessor = $csrfProcessor;
    }
    
    public function doCommonTasks(CommonTasksForControllersEvent $event) {
        if ($csrfProcessor->isCSRFValid($event->getTokenId(), $event->getToken())) {
            $event->setCSRFValid(true);
        } else {
            $event->setCSRFValid(false);
        }
    }
}