<?php

namespace PressBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use PressBundle\Entity\Tag;

class TagsController extends Controller {
    
    public function getAllAction(Request $request) {
//        $em = $this->getDoctrine()->getManager();
//        $articlesRepository = $em->getRepository("PressBundle:Article");
//        $user = $this->get('security.context')->getToken()->getUser();
//        $sortParametersConverter = $this->get("press.sort_parameters_converter");
//        
//        // Paramètres GET
//        $sortBy = $request->query->get("sortBy");
//        $sortDirection = $request->query->get("sortDirection");
//        $sortParameters = $sortParametersConverter->convertSortParameters($sortBy, $sortDirection);
//
//        $articles = $articlesRepository->getArticlesFromUser($sortParameters, $user->getId());
//
//        return new JsonResponse([
//            "success" => true,
//            "articles" => $articles
//        ], 200);
    }
    
    public function addAction(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $user = $this->get('security.context')->getToken()->getUser();
        $validator = $this->get('validator');
        
        // Paramètres de requête
        $name = $request->request->get("name");
        
        // Tests
        if ($name == null) {
            return $this->sendErrorMessage("Veuillez entrer un nom.");
        }
        
        try {
            // Création de l'étiquette
            $tag = new Tag();
            $tag->setName($name);
            $tag->setOwner($user);
            
            // Validations
            $validationErrors = $validator->validate($tag);
            
            if (count($validationErrors) > 0) {
                return $this->sendErrorMessage($validationErrors[0]->getMessage());
            }
            
            // Sauvegarde
            $em->persist($tag);
            $em->flush();
            
            return new JsonResponse(["success" => true], 200);
        } catch (\Exception $e) {
            return $this->sendErrorMessage("Une erreur inconnue s'est produite.");
        }
    }
    
    public function deleteAction($articleId) {
//        $em = $this->getDoctrine()->getManager();
//        $articleRepository = $this->getDoctrine()->getRepository("PressBundle:Article");
//        
//        // Tests
//        if ($articleId == null) {
//            return $this->sendErrorMessage("Impossible de supprimer l'article");
//        }
//        
//        try {
//            // Archive l'article
//            $article = $articleRepository->find($articleId);
//            $em->remove($article);
//            
//            // Sauvegarde
//            $em->flush();
//            
//            return new JsonResponse(["success" => true], 200);
//        } catch (\Exception $e) {
//            return $this->sendErrorMessage("Impossible d'archiver l'article");
//        }
    }
    
    private function sendErrorMessage($errorMessage) {
        return new JsonResponse([
            'success' => false,
            'error' => $errorMessage
        ], 500);
    }
}
