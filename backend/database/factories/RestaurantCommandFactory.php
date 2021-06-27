<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Models\RestaurantCommand;
use Illuminate\Support\Carbon;

$factory->define(RestaurantCommand::class, function (Faker $faker) {
    $endedAt = $faker->dateTimeBetween('now', '2 weeks');
    $startedAt = $faker->dateTimeBetween('-1 month', '-1 day');

    return [
        'target_price' => $faker->numberBetween(300, 500),
        'current_price' => $faker->numberBetween(0, 500),
        'started_at' => $startedAt,
        'ended_at' => $endedAt,
        'delivery_date' => Carbon::parse($endedAt)->addDays($faker->numberBetween(1, 7)),
        'description' => $faker->paragraph(2),
        'status' => 1,
        'is_template' => true,
        'created_at' => $startedAt,
    ];
});
