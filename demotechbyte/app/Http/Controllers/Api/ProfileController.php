<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService\UserService;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    //
    protected $userService;

    public function __construct(UserService $userService)
    {
        return $this->userService = $userService;
    }

    public function updateProfile(Request $request){
        $data = $request->validate([
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',

            'password_old' => 'nullable|string|min:6',
            'password_new' => 'nullable|string|min:6|confirmed',

            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:20480', // 20MB
        ]);

        try {
            $user = $this->userService->update($data, $request->user());

            return response()->json([
                'message' => 'Cập nhật thông tin thành công',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'password_old' => [$e->getMessage()],
            ]);
        }
    }
}
