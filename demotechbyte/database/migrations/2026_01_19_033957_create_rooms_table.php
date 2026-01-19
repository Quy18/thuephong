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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users') // chỉ có thể là owner
                  ->onDelete('cascade');

            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('price');
            $table->float('area');
            $table->string('address');
            $table->string('ward')->nullable();
            $table->string('district');
            $table->string('city');

            $table->enum('status', ['processing', 'available', 'rented'])->default('available');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
