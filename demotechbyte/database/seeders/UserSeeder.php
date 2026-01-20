<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::insert([
            [
                'name' => 'Renter',
                'email' => 'renter@example.com',
                'password' => 'password',
                'phone' => '0362979163',
                'role' => 'renter',
            ],
            [
                'name' => 'Owner 1',
                'email' => 'owner1@example.com',
                'password' => 'password',
                'phone' => '0362979164',
                'role' => 'owner',
            ],
            [
                'name' => 'Owner 2',
                'email' => 'owner2@example.com',
                'password' => 'password',
                'phone' => '0362979165',
                'role' => 'owner',
            ],
            [
                'name' => 'Owner 3',
                'email' => 'owner3@example.com',
                'password' => 'password',
                'phone' => '0362979166',
                'role' => 'owner',
            ],
            [
                'name' => 'Owner 4',
                'email' => 'owner4@example.com',
                'password' => 'password',
                'phone' => '0362979167',
                'role' => 'owner',
            ],
        ]);
    }
}
