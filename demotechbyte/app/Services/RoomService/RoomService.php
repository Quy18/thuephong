<?php

namespace App\Services\RoomService;

use Illuminate\Support\Facades\DB;
use App\Models\Room;
use App\Models\Amenity;
use App\Models\RoomImage;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class RoomService
{
    public function create(array $data, Request $request): array
    {
        if(auth('api')->user()->role == 'renter'){
            throw ValidationException::withMessages([
                'message' => ['Bạn không có quyền đăng phòng trọ.'],
            ]);
        }
        return DB::transaction(function () use ($data, $request) {
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
                        'quantity'         => $amenity['quantity'],
                    ];
                }

                Amenity::insert($amenitiesData);
            }

            // 3. Lưu hình ảnh
            if($request->hasFile('images')){
                $imagesData = [];
                foreach($request->file('images') as $image){
                    $fileNameImg = 'room_'. $room->id . '_' . Str::random(8) . '.' . $image->getClientOriginalExtension();
                    
                    // lưu vào storage/app/public/avatars
                    $path = $image->storeAs('rooms', $fileNameImg, 'public');

                    $imagesData[] = [
                        'room_id' => $room->id,
                        'image_path' => $path,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                RoomImage::insert($imagesData);
            }

            return [
                'room_id' => $room->id,
                'title' => $room->title,
                'message' => 'Tạo phòng trọ thành công, đang chờ duyệt.',
            ];
        });
    }

    public function getAllOrFilter(array $filters){
        $query = Room::query()->with('owner', 'images'); // lấy thông tin người cho thuê

        // Status
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        } else {
            $query->where('status', '!=', 'processing');
        }

        /* ===============================
         | LOCATION
         ===============================*/
        if (!empty($filters['city'])) {
            $query->where('city', 'like', $filters['city']);
        }

        if (!empty($filters['district'])) {
            $query->where('district', 'like', $filters['district']);
        }

        /* ===============================
         | PRICE (triệu)
         ===============================*/
        if (!empty($filters['priceMin'])) {
            $query->where('price', '>=', $filters['priceMin'] * 1_000_000);
        }

        if (!empty($filters['priceMax'])) {
            $query->where('price', '<=', $filters['priceMax'] * 1_000_000);
        }

        /* ===============================
         | LIVING TYPE
         ===============================*/
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        /* ===============================
         | CONTRACT TERM
         ===============================*/
        if (!empty($filters['contract_term'])) {
            $query->where('contract_term', $filters['contract_term'] . ' tháng');
        }

        /* ===============================
         | SORT
         ===============================*/
        $query->orderBy('price');

        /* ===============================
         | PAGINATION
         ===============================*/
        return $query->paginate(12);
    }
}