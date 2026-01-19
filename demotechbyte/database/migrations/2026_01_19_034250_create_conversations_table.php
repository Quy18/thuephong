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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')
                  ->constrained('rooms')
                  ->onDelete('cascade');

            $table->foreignId('renter_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->foreignId('owner_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->text('last_message')->nullable();
            $table->timestamp('last_message_at')->nullable();

            $table->timestamps();

            $table->unique(['room_id', 'renter_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
