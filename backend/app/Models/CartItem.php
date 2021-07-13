<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = ['user_id', 'restaurant_command_id', 'dish_id', 'quantity'];
    protected $casts = ['quantity' => 'number'];

    public function dish()
    {
        return $this->belongsTo(Dish::class)->select(['id', 'name', 'price', 'unit', 'avatar', 'ingredients', 'description', 'spicy_level', 'promo']);
    }
}
