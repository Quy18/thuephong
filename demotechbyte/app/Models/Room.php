<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Amenity;

class Room extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price',
        'service_price',
        'electricity_price',
        'water_price',
        'contract_term',
        'type',
        'area',
        'address',
        'ward',
        'district',
        'city',
        'status',
    ];

    public function owner(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function amenities(){
        return $this->hasMany(Amenity::class);
    }
    
    public function images(){
        return $this->hasMany(RoomImage::class);
    }
}
