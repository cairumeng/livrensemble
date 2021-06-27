<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $primaryKey = 'code';
    public $incrementing = false;

    protected $fillable = [
        'code', 'name'
    ];
}
