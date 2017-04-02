<?php
namespace PressBundle\Services;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\TwigBundle\TwigEngine;

class SiteExtractor implements SiteExtractorInterface {
    public function __construct() {
        
    }
    
    public function extractAllDatas($url) {
        $html = file_get_contents($url);
        
        $datas = new \ArrayObject();
        $datas["title"] = $this->extractMeta($html, "og:title");
        $datas["description"] = $this->extractMeta($html, "og:description");
        $datas["image"] = $this->extractMeta($html, "og:image");
        $datas["favicon"] = $this->extractFavicon($html);
        
        return $datas;
    }
    
    private function extractMeta($html, $property) {
        $doc = new \DOMDocument();
        @$doc->loadHTML($html);
        
        $metas = $doc->getElementsByTagName("meta");
        
        for ($i = 0; $i < $metas->length; $i++) {
            $meta = $metas->item($i);
            
            if ($meta->getAttribute("property") == $property) {
                return $meta->getAttribute("content");
            }
        }
        
        return null;
    }
    
    private function extractFavicon($html) {
        $doc = new \DOMDocument();
        @$doc->loadHTML($html);
        
        $metas = $doc->getElementsByTagName("link");
        
        for ($i = 0; $i < $metas->length; $i++) {
            $meta = $metas->item($i);
            
            if ($meta->getAttribute("rel") == "icon") {
                return $meta->getAttribute("href");
            }
        }
        
        return null;
    }
}