<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientCommandDishesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_command_dishes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_command_id')->constrained();
            $table->foreignId('dish_id')->constrained();
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('price');
            $table->string('unit');
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
        Schema::dropIfExists('client_command_dishes');
    }
}
