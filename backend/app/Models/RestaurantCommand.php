<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestaurantCommand extends Model
{
    protected $fillable = ['restaurant_id', 'city_id', 'target_price', 'current_price', 'started_at', 'ended_at', 'delivery_date', 'description', 'delivery_address_option', 'delivery_address', 'status', 'is_template'];

    protected $casts = ['delivery_address_option' => 'number', 'status' => 'number', 'is_template' => 'boolean'];

    protected $dates = ['started_at', 'ended_at', 'delivery_date'];
}
