<?php
namespace PressBundle\Services;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\TwigBundle\TwigEngine;

interface SiteExtractorInterface {
    public function extractAllDatas($url);
}