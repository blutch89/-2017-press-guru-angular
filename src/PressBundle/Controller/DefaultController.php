<?php

namespace PressBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('PressBundle:Default:index.html.twig');
    }
    
    // TODO: Supprimer cette fonction
    public function testAction() {
        return new JsonResponse([
                'success' => true
            ], 200);
    }
}
