<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = ['user_id', 'restaurant_command_id', 'dish_id', 'quantity'];
    protected $casts = ['quantity' => 'number'];
}
