<?php

namespace App\Services\RoomService;

use Illuminate\Support\Facades\DB;
use App\Models\Room;
use App\Models\Amenity;
use Illuminate\Validation\ValidationException;

class RoomService
{
    public function create(array $data): array
    {
        if(auth('api')->user()->role == 'renter'){
            throw ValidationException::withMessages([
                'message' => ['Bạn không có quyền đăng phòng trọ.'],
            ]);
        }
        return DB::transaction(function () use ($data) {
            // 1. Tạo room
            $room = Room::create([
                'user_id' => auth('api')->user()->id,
                'title' => $data['title'],
                'description' => $data['description'],
                'price' => $data['price'],
                'service_price' => $data['service_price'],
                'electricity_price' => $data['electricity_price'],
                'water_price' => $data['water_price'],
                'contract_term' => $data['contract_term'],
                'type' => $data['type'],
                'area' => $data['area'],
                'address' => $data['address'],
                'ward' => $data['ward'],
                'district' => $data['district'],
                'city' => $data['city'],
            ]);

            // 2. Tạo amenities (nếu có)
            if (!empty($data['amenities'])) {
                $amenitiesData = [];

                foreach ($data['amenities'] as $amenity) {
                    $amenitiesData[] = [
                        'room_id'          => $room->id,
                        'amenity_type_id'  => $amenity['amenity_type_id'],
                        'custom_name'      => $amenity['custom_name'] ?? null,
                    ];
                }

                Amenity::insert($amenitiesData);
            }

            return [
                'room_id' => $room->id,
                'title' => $room->title,
                'message' => 'Tạo phòng trọ thành công, đang chờ duyệt.',
            ];
        });
    }

    public function getAll(int $perPage = 12){
        return Room::query()
            ->where('status', '!=', 'processing')
            ->orderByDesc('price')
            ->paginate($perPage);
    }
}