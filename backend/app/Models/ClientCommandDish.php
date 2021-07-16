<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientCommandDish extends Model
{
    protected $fillable = ['client_command_id', 'dish_id', 'quantity', 'price', 'unit'];
    protected $casts = ['price' => 'decimal:2', 'quantity' => 'number'];
}
