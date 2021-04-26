<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    protected $fillable = [
        'dish_category_id', 'name', 'price', 'unit', 'avatar', 'ingredients', 'description', 'spicy_level', 'promo'
    ];
    protected $casts = [
        'price' => 'decimal', 'spicy_level' => 'number', 'promo' => 'decimal'
    ];
}
