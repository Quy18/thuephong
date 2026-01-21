<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RoomService\RoomService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class RoomController extends Controller
{
    protected $roomService;

    public function __construct(RoomService $roomService)
    {
        return $this->roomService = $roomService;
    }

    public function createRoom(Request $request){
        // validate
        try {
            $data = $request->validate([
                // ---------- ROOM ----------
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',

                'price' => 'required|integer|min:0',
                'service_price' => 'required|integer|min:0',
                'electricity_price' => 'required|integer|min:0',
                'water_price' => 'required|integer|min:0',

                'contract_term' => 'required|string|max:50',

                'type' => ['required', Rule::in(['free', 'common_owner'])],

                'area' => 'required|numeric|min:1',

                'address' => 'required|string|max:255',
                'ward' => 'nullable|string|max:255',
                'district' => 'required|string|max:255',
                'city' => 'required|string|max:255',

                // ---------- AMENITIES ----------
                'amenities' => 'nullable|array',

                'amenities.*.amenity_type_id' => [
                    'required',
                    'integer',
                    'exists:amenity_types,id',
                ],

                'amenities.*.custom_name' => 'nullable|string|max:255',

                // ❗ không cho trùng amenity_type trong cùng 1 room
                'amenities.*.amenity_type_id' => 'distinct',
            ]);

            $result = $this->roomService->create($data);

            return response()->json($result, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'code' => 'CREATE_ROOM_ERROR',
                'errors' => $e->errors()
            ], 422);
        }

        // json
        return response()->json($this->roomService->create($data));
    }

    public function getAllRoomOrFilter(Request $request){
        $data = $request->validate([
            'status' => 'nullable|in:available,rented',
            'city'   => 'nullable|string|max:255',
            'district'   => 'nullable|string|max:255',
            'priceMin'   => 'nullable|numeric|min:0',
            'priceMax'   => 'nullable|numeric|min:0',
            'type' => 'nullable|in:free,common_owner',
            'contract_term'   => 'nullable|in:6,12',
            'page'       => 'nullable|integer|min:1',
        ]);

        // Validate logic thêm
        if (
            isset($data['priceMin'], $data['priceMax']) &&
            $data['priceMin'] > $data['priceMax']
        ) {
            return response()->json([
                'message' => 'Giá từ không được lớn hơn giá đến'
            ], 422);
        }

        $rooms = $this->roomService->getAllOrFilter($data);

        return response()->json($rooms);
    }
}
