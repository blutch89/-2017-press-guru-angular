<?php
namespace PressBundle\Services\CommonTasksForControllers;

interface ICheckCSRFProcessor {
    public function isCSRFValid($tokenId, $token);
}
