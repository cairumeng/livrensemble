<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDishesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dish_category_id')->constrained();
            $table->string('name');
            $table->decimal('price');
            $table->string('unit');
            $table->string('avatar');
            $table->text('ingredients')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('spicy_level')->default(0);
            $table->decimal('promo')->nullable();
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
        Schema::dropIfExists('dishes');
    }
}
