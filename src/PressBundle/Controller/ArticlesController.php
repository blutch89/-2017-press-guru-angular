<?php

namespace PressBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use PressBundle\Services\SiteExtractor;
use PressBundle\Services\SiteExtractorInterface;
use PressBundle\Entity\Article;

class ArticlesController extends Controller {
    public function addAction(Request $request) {
        $siteExtractor = $this->get("press.site_extractor");
        
        // Paramètres de requête
        $url = $request->request->get("url");
        
        // Tests
        if ($url == null) {
            return $this->sendErrorMessage("Veuillez entrer une url.");
        }
        
        try {
            // Extraction des informations du site
            $infos = $siteExtractor->extractAllDatas($url);

            // TODO: enregistrer l'article en base de données
            $article = new Article();
            // ...
        } catch (\Exception $e) {
            if (strpos($e->getMessage(), "failed to open stream") !== false) {
                return $this->sendErrorMessage("Le lien spécifié est introuvable.");
            }
            
            return $this->sendErrorMessage("Une erreur inconnue s'est produite.");
        }
    }
    
    private function sendErrorMessage($errorMessage) {
        return new JsonResponse([
            'success' => false,
            'error' => $errorMessage
        ], 500);
    }
}
