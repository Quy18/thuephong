<?php

use App\Http\Controllers\Api\Admin\RoomManagementController;
use App\Http\Controllers\Api\AiSearchController;
use App\Http\Controllers\Api\AmenityController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomImageController;
use Illuminate\Http\Request;
use Illuminate\Routing\RouteUri;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('jwt.auth')->group(function () {
    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::prefix('profile')->group(function () {
        Route::post('/update', [ProfileController::class, 'updateProfile']);
    });

    // Room
    Route::prefix('/room')->group(function () {
        Route::middleware(['owner'])->group(function () {
            Route::post('/create_room', [RoomController::class, 'createRoom']);
            Route::get('/get_room', [RoomController::class, 'getAllRoomOfOwner']);
        });
        Route::get('/get_all_room', [RoomController::class, 'getAllRoomOrFilter']);
    });

    // RoomImage
    Route::get('/get_image', [RoomImageController::class, 'getAllRoomImg']);
    
    // Amenity
    Route::prefix('/amenity')->group(function () {
        Route::get('/get_all', [AmenityController::class, 'getAll']);
    });
    

    // Admin
    Route::prefix('/admin')->middleware(['admin'])->group(function () {
        Route::prefix('/room')->group(function () {
            Route::put('/update', [RoomManagementController::class, 'confirmRoom']);
        });
    });

    Route::prefix('/ai')->group(function () {
        Route::get('/search-rooms', [AiSearchController::class , 'search']);
    });
});
