<?php

namespace PressBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthenticationController extends Controller {
    public function indexAction() {
        return $this->render('PressBundle:Authentication:authentication.html.twig');
    }
}
