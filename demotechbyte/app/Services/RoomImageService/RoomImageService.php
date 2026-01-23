<?php

namespace App\Services\RoomImageService;

use App\Models\AmenityType;
use App\Models\RoomImage;
use App\Models\Room;
use Illuminate\Validation\ValidationException;

class RoomImageService
{
    public function getAllRoomImg(array $data) : array
    {
        $room = Room::with('images')->find($data['room_id']);
        if(!$room){
            throw ValidationException::withMessages([
                'message' => ['Phòng không tồn tại'],
            ]);
        }
        $images = $room->images;
        return $images;
    }
}
