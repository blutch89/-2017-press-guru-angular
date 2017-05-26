<?php

namespace PressBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class ConnectionController extends Controller {
    public function connectionAction() {
        return $this->render('PressBundle:Connection:connection.html.twig');
    }
}
