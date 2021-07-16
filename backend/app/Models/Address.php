<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['user_id', 'address', 'city_id', 'name', 'phone', 'wechat', 'is_default'];

    protected $casts = ['is_default' => 'boolean'];

    public function city()
    {
        return $this->belongsTo(City::class)->select(['id', 'name', 'postal_code']);
    }
}
