<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RoomImageService\RoomImageService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RoomImageController extends Controller
{
    //
    protected $serviceRoomImage;

    public function __construct(RoomImageService $serviceRoomImage)
    {
        return $this->serviceRoomImage = $serviceRoomImage;
    }

    public function getAllRoomImg(Request $request){
        try{
            $data = $request->validate([
                'room_id' => 'required|integer',
            ]);
            return response()->json($this->serviceRoomImage->getAllRoomImg($data));
        }catch(ValidationException $e){
            return response()->json([
                'code' => 'ROOM_NOT_EXIST',
                'errors' => $e->errors()
            ], 422);
        }
    }
}
