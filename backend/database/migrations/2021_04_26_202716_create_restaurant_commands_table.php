<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantCommandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurant_commands', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained();
            $table->foreignId('city_id')->constrained();
            $table->decimal('target_price');
            $table->decimal('current_price')->default(0);
            $table->timestamp('started_at');
            $table->timestamp('ended_at');
            $table->date('delivery_date');
            $table->text('description')->nullable();
            $table->unsignedInteger('delivery_address_option');
            $table->string('delivery_address')->nullable();
            $table->unsignedInteger('status');
            $table->boolean('is_template')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('restaurant_commands');
    }
}
