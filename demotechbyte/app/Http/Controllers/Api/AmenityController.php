<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AmenityService\AmenityService;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    //
    protected $serviceAmenity;

    public function __construct(AmenityService $serviceAmenity)
    {
        return $this->serviceAmenity = $serviceAmenity;
    }

    public function getAll(){
        return response()->json($this->serviceAmenity->getAllAmenities());
    }
}
