<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Amenity;

class AmenityType extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'code',
        'default_name',
    ];

    public function amenities()
    {
        return $this->hasMany(Amenity::class);
    }
}
