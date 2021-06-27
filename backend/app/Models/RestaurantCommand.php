<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestaurantCommand extends Model
{
    const STATUS = [
        'GROUPING' => 0,
        'SUCCESS' => 1,
        'FAIL' => 2,
        'CANCELED' => 3,
    ];

    const DELIVERY_OPTION = [
        'TO_HOME' => 0,
        'TO_POSITION' => 1,
    ];

    protected $fillable = ['restaurant_id', 'city_id', 'target_price', 'current_price', 'started_at', 'ended_at', 'delivery_date', 'description', 'delivery_address_option', 'delivery_address', 'status', 'is_template'];

    protected $casts = ['delivery_address_option' => 'number', 'status' => 'number', 'is_template' => 'boolean'];

    protected $dates = ['started_at', 'ended_at', 'delivery_date'];
}
