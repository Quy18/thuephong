<?php

namespace App\Services\Admin\RoomManagementService;

use App\Models\AmenityType;
use App\Models\RoomImage;
use App\Models\Room;
use Illuminate\Validation\ValidationException;

class RoomManagementService
{
    public function updateRoom(array $data)
    {
        $room = Room::where('id', $data['room_id'])
            ->update([
                'status' => $data['status'],
            ]);
        
        if ($room === 0) {
            throw ValidationException::withMessages([
                'room_id' => ['Phòng không tồn tại.'],
            ]);
        }
        return [
            'message' => 'Cập nhật room thành công.',
        ];
    }
}
