<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('amenities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('amenity_type_id')
                ->constrained('amenity_types')
                ->cascadeOnDelete();

            $table->string('custom_name')->nullable();
            $table->integer('quantity')->default(1);
            $table->timestamps();
            // 1 phòng không thể có 2 tiện nghi cùng loại
            $table->unique(['room_id', 'amenity_type_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amenities');
    }
};
