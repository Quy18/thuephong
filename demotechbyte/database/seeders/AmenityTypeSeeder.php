<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AmenityType;

class AmenityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        AmenityType::insert([
            [
                'code' => 'air_conditioner',
                'default_name' => 'Điều hòa',
            ],
            [
                'code' => 'wifi',
                'default_name' => 'Wifi',
            ],
            [
                'code' => 'tv',
                'default_name' => 'Tivi',
            ],
            [
                'code' => 'water heater',
                'default_name' => 'Máy nóng lạnh',
            ],
            [
                'code' => 'washing machine',
                'default_name' => 'Máy giặt',
            ],
            [
                'code' => 'dryer',
                'default_name' => 'Máy sấy',
            ],
            [
                'code' => 'dressing cabinet',
                'default_name' => 'Tủ quần áo',
            ],
            [
                'code' => 'electric stove',
                'default_name' => 'Bếp điện',
            ],
            [
                'code' => 'absorb smell',
                'default_name' => 'Hút mùi',
            ],
            [
                'code' => 'closed cleaning',
                'default_name' => 'Vệ sinh khép kín',
            ],
            [
                'code' => 'fingerprint door',
                'default_name' => 'Cửa vân tay',
            ],
            [
                'code' => 'elevator',
                'default_name' => 'Thang máy',
            ],
            [
                'code' => 'escape',
                'default_name' => 'Thoát hiểm',
            ],
            [
                'code' => 'fireproof',
                'default_name' => 'Chống cháy',
            ],
            [
                'code' => 'fan',
                'default_name' => 'Quạt',
            ],
            [
                'code' => 'other',
                'default_name' => 'Other',
            ],
        ]);
    }
}
