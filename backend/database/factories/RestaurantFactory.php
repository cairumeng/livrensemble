<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Restaurant;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

$factory->define(Restaurant::class, function (Faker $faker) {
    return [
        'name' => ucfirst($faker->word) . ' Restaurant',
        'avatar' => $faker->imageUrl(640, 640, 'food'),
        'description' => $faker->sentence,
        'background_image' => $faker->imageUrl(1920, 1080, 'city'),
        'address' => $faker->address,
        'email' => $faker->email,
        'phone' => $faker->phoneNumber,
        'created_at' => Carbon::now(),
    ];
});
