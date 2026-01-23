<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\RoomManagementService\RoomManagementService;
use Illuminate\Http\Request;

class RoomManagementController extends Controller
{
    //
    protected $roomManagementService;

    public function __construct(RoomManagementService $roomManagementService)
    {
        return $this->roomManagementService = $roomManagementService;
    }

    public function confirmRoom(Request $request){
        $data = $request->validate([
            'room_id' => 'required|integer',
            'status'  => 'required|in:available,rented,processing',
        ]);
        return response($this->roomManagementService->updateRoom($data));
    }
}
