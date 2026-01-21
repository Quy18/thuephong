<?php

namespace App\Services\UserService;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserService
{
    public function update(array $data, $user){
        /** ========================
         *  UPDATE BASIC INFO
         * ======================== */
        if (isset($data['name'])) {
            $user->name = $data['name'];
        }

        if (isset($data['phone'])) {
            $user->phone = $data['phone'];
        }

        /** ========================
         *  UPDATE PASSWORD
         * ======================== */
        if (!empty($data['password_old']) && !empty($data['password_new'])) {

            if (!Hash::check($data['password_old'], $user->password)) {
                throw new \Exception('Mật khẩu cũ không đúng');
            }

            $user->password = Hash::make($data['password_new']);
        }

        /** ========================
         *  UPLOAD AVATAR
         * ======================== */
        if (isset($data['avatar'])) {
            $file = $data['avatar'];

            $fileName = 'avatar_' . $user->id . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();

            // lưu vào storage/app/public/avatars
            $path = $file->storeAs('avatars', $fileName, 'public');

            // xóa avatar cũ (nếu có)
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // lưu đường dẫn vào DB
            $user->avatar = $path;
        }

        $user->save();

        return $user;
    }
}