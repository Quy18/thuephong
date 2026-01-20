<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;
use App\Models\Amenity;
use Faker\Factory as Faker;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        // Danh sách user_id hợp lệ
        $userIds = [2, 3, 4, 5];

        $amenityTypeIds = [1,2,3,4,5,6,7,8,9,10,11,12,16];

        for ($i = 1; $i <= 40; $i++) {

            $room = Room::create([
                'user_id'           => $faker->randomElement($userIds),
                'title'             => 'Phòng trọ ' . $faker->streetName,
                'description'       => $faker->sentence(10),
                'price'             => $faker->numberBetween(2500000, 8000000),
                'service_price'     => $faker->numberBetween(150000, 500000),
                'electricity_price' => $faker->numberBetween(3500, 5000),
                'water_price'       => $faker->numberBetween(20000, 30000),
                'contract_term'     => $faker->randomElement(['6 tháng', '12 tháng']),
                'type'              => $faker->randomElement(['free', 'common_owner']),
                'area'              => $faker->numberBetween(18, 45),
                'address'           => $faker->randomElement([
                    'Số 1', 'Số 2', 'Số 3', 'Số 4', 'Số 5'
                ]),
                'ward'              => $faker->randomElement([
                    'Phường 1', 'Phường 2', 'Phường Linh Trung', 'Xã Tân Phú'
                ]),
                'district'          => $faker->randomElement([
                    'Quận 1', 'Quận 3', 'Tân Phú', 'Gò Vấp', 'Bình Thạnh', 'Hà Nội'
                ]),
                'city'              => $faker->randomElement([
                    'Hà Nội', 'Tp. HCM'
                ]),
                'status'            => $faker->randomElement(['processing', 'available', 'rented']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Random 3–6 tiện ích
            $randomAmenityIds = collect($amenityTypeIds)
                ->shuffle()
                ->take(rand(6, 16));

            foreach ($randomAmenityIds as $amenityTypeId) {
                Amenity::create([
                    'room_id' => $room->id,
                    'amenity_type_id' => $amenityTypeId,
                    'custom_name' => $amenityTypeId === 16
                        ? $faker->words(3, true)
                        : null,
                ]);
            }
        }
    }
}
