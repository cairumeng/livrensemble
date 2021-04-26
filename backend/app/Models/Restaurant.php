<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = ['user_id', 'name', 'avatar', 'description', 'background_image', 'address', 'email', 'phone', 'wechat'];
}
