<?php
namespace PressBundle\Services;

interface SortParametersConverterInterface {
    public function convertSortParameters($sortBy, $sortDirection);
}