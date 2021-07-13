<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = ['user_id', 'name', 'avatar', 'description', 'background_image', 'address', 'email', 'phone', 'wechat'];

    public function commands()
    {
        return  $this->hasMany(RestaurantCommand::class);
    }

    public function dishCategories()
    {
        return $this->hasMany(DishCategory::class)->select(['id', 'restaurant_id', 'name']);
    }
}
