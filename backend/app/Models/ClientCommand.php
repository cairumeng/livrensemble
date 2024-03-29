<?php

namespace App\Models;

use App\Models\User;
use App\Models\RestaurantCommand;
use Illuminate\Database\Eloquent\Model;

class ClientCommand extends Model
{
    protected $fillable = ['user_id', 'restaurant_command_id', 'address_id', 'amount', 'note'];

    protected $casts = ['amount' => 'decimal:2'];

    public function restaurantCommand()
    {
        return $this->belongsTo(RestaurantCommand::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
