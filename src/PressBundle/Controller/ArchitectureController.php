<?php

namespace PressBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ArchitectureController extends Controller {
    public function getMenuItemsAction(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $articleRepository = $em->getRepository("PressBundle:Article");
        $tagRepository = $em->getRepository("PressBundle:Tag");
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $menuItems = array();
        
        // Variables
        $tagNumber = 3;
        $tagNumber++;       // Le nombre réel est tagNumber + 1
        
        // Création du menu "tous les articles"
        $menuItems[] = [
            "text" => "Tous les articles",
            "nbArticles" => $articleRepository->getCountArticlesFromUser($user->getId()),
            "link" => ""
        ];
        
        // Création des items "tags"
        $firstTags = $tagRepository->getFirstTagsSorted($tagNumber, $user->getId());        

        foreach ($firstTags as $tag) {
            $menuItems[] = [
                "text" => $tag["name"],
                "icon" => "tag",
                "nbArticles" => $articleRepository->getCountArticlesFromTag($tag["id"], $user->getId()),
                "link" => "articles/tag/" . $tag["id"]
            ];
        }
        
        // Création des items "archivés"
        $menuItems[] = [
            "text" => "Articles archivés",
            "nbArticles" => $articleRepository->getCountArchivedArticlesFromUser($user->getId()),
            "link" => "articles/archived"
        ];
        
        return new JsonResponse([
            "success" => true,
            "menuItems" => $menuItems
            ], 200);
    }
}
