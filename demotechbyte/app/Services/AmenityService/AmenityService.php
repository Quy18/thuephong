<?php

namespace App\Services\AmenityService;

use App\Models\AmenityType;

class AmenityService
{
    public function getAllAmenities() : array
    {
        $amenities = AmenityType::all()->toArray();
        return $amenities;
    }
}
