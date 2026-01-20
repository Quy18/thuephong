<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room;
use App\Models\AmenityType;

class Amenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'amenity_type_id',
        'custom_name',
    ];

    public function room(){
        return $this->belongsTo(Room::class);
    }

    public function type()
    {
        return $this->belongsTo(AmenityType::class, 'amenity_type_id');
    }

    /**
     * Tên hiển thị (Điều hòa / Máy điều hòa)
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->custom_name
            ?? $this->type->default_name;
    }
}
