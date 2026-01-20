<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService\AuthService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }
    
    public function register(Request $request)
    {
        // 1. Validate dữ liệu
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|string|min:6',
                'phone' => [
                    'nullable',
                    'regex:/^(0|\+84)[0-9]{9}$/',
                    'unique:users,phone'
                ],
                'role' => 'required|in:owner,renter',
            ]);

            $result = $this->authService->register($data);

            return response()->json($result, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'code' => 'REGISTER_ERROR',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function login(Request $request)
    {
        try {
            // 1. Validate
            $data = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            // 2. Gọi service
            $result = $this->authService->login($data);

            return response()->json($result, 200);

        } catch (ValidationException $e) {
            return response()->json([
                'code'   => 'LOGIN_ERROR',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        try {
            $result = $this->authService->logout();

            return response()->json($result);

        } catch (ValidationException $e) {
            return response()->json([
                'code' => 'LOGOUT_FAILED',
                'errors' => $e->errors()
            ], 401);
        }
    }
}
