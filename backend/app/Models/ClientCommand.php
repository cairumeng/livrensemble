<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientCommand extends Model
{
    protected $fillable = ['user_id', 'restaurant_command_id', 'address_id', 'amount', 'note'];

    protected $casts = ['amount' => 'decimal:2'];
}
