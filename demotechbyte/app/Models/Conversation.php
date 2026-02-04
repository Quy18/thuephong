<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'renter_id',
        'owner_id',
        'last_message',
        'last_message_at',

    ];

    public function messages(){
        return $this->hasMany(Message::class);
    }

    public function owner(){
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function renter(){
        return $this->belongsTo(User::class, 'renter_id');
    }
}
