<?php

namespace App\Services\AuthService;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function register(array $data): array
    {
        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone' => $data['phone'] ?? null,
                'role' => $data['role'],
            ]);

            $token = JWTAuth::fromUser($user);

            return [
                'message' => 'Đăng ký thành công',
                'token'   => $token,
                'user'    => $user,
            ];

        } catch (QueryException $e) {

            // Email hoặc phone trùng
            if ($e->getCode() == 23000) {
                throw ValidationException::withMessages([
                    'email' => ['Email đã được sử dụng'],
                ]);
            }

            // Lỗi khác
            throw ValidationException::withMessages([
                'system' => ['Lỗi hệ thống, vui lòng thử lại'],
            ]);
        }
    }

    public function login(array $data): array
    {
        try {
            // Xác thực & tạo token
            if (!$token = auth('api')->attempt($data)) {
                throw ValidationException::withMessages([
                    'email' => ['Email hoặc mật khẩu không đúng'],
                ]);
            }

            return [
                'message' => 'Đăng nhập thành công',
                'token'   => $token,
                'user'    => auth('api')->user(),
            ];

        } catch (JWTException $e) {
            throw ValidationException::withMessages([
                'system' => ['Không thể tạo token, vui lòng thử lại'],
            ]);
        }
    }

    public function logout(): array
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return [
                'message' => 'Đăng xuất thành công'
            ];

        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'token' => ['Token không hợp lệ hoặc đã hết hạn']
            ]);
        }
    }
}
