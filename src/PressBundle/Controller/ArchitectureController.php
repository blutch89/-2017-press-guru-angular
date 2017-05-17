<?php

namespace PressBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class ArchitectureController extends Controller {
    public function getMenuItemsAction() {
        $em = $this->getDoctrine()->getManager();
        $articleRepository = $em->getRepository("PressBundle:Article");
        $tagRepository = $em->getRepository("PressBundle:Tag");
        $user = $this->get('security.context')->getToken()->getUser();
        $menuItems = array();
        
        // Variables
        $tagNumber = 3;
        
        // Création du menu "tous les articles"
        $menuItems[] = [
            "text" => "Tous les articles",
            "nbArticles" => $articleRepository->getCountArticlesFromUser($user->getId()),
            "link" => "/"
        ];
        
        // Création des items "tags"
        $firstTags = $tagRepository->getFirstTagsSorted($tagNumber, $user->getId());        
        
        foreach ($firstTags as $tag) {
            $menuItems[] = [
                "text" => $tag->getName(),
                "nbArticles" => $articleRepository->getCountArticlesFromTag($tag->getId(), $user->getId()),
                "link" => "/articles/tag/" . $tag->getId()
            ];
        }
        
        return new JsonResponse($menuItems, 200);
        
        // Création des items "archivés"
    }
}
