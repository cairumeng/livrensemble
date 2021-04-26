<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DishCategory extends Model
{
    protected $fillable = ['restaurant_id', 'name'];
}
