<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    protected $fillable = [
        'dish_category_id', 'name', 'price', 'unit', 'avatar', 'ingredients', 'description', 'spicy_level', 'promo'
    ];
    protected $casts = [
        'price' => 'decimal:2', 'spicy_level' => 'number', 'promo' => 'decimal:2'
    ];

    public function dishCategory()
    {
        return $this->belongsTo(DishCategory::class);
    }
}
