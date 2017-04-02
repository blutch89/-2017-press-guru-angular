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
        $datas["title"] = $this->extractDatas($html, "meta", "property", "og:title", "content");
        
        if ($datas["title"] == null) {
            $datas["title"] = $this->extractTitle($html);
        }
        
        $datas["description"] = $this->extractDatas($html, "meta", "property", "og:description", "content");
        $datas["image"] = $this->extractDatas($html, "meta", "property", "og:image", "content");
        $datas["favicon"] = $this->extractDatas($html, "link", "rel", "icon", "href");
        
        return $datas;
    }
    
    private function extractDatas($html, $tagName, $attributeName, $attributeValue, $attributeToReturn) {
        $doc = new \DOMDocument();
        @$doc->loadHTML($html);
        
        $metas = $doc->getElementsByTagName($tagName);
        
        for ($i = 0; $i < $metas->length; $i++) {
            $meta = $metas->item($i);
            
            if ($meta->getAttribute($attributeName) == $attributeValue) {
                return $meta->getAttribute($attributeToReturn);
            }
        }
        
        return null;
    }
    
    private function extractTitle($html) {
        $doc = new \DOMDocument();
        @$doc->loadHTML($html);
        
        $metas = $doc->getElementsByTagName("title");
        
        for ($i = 0; $i < $metas->length; $i++) {
            $meta = $metas->item($i);
            
            return $meta->nodeValue;
        }
        
        return null;
    }
}