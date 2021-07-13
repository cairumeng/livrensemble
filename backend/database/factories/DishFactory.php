<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Dish;
use Faker\Generator as Faker;


$factory->define(Dish::class, function (Faker $faker) {
    $units = ['piece', 'carton', 'bag'];
    $promos = [0, 0.15, 0.2];
    return [
        'name' => $faker->word(),
        'price' => $faker->randomFloat(2, 4, 60),
        'unit' => $faker->randomElement($units),
        'avatar' => $faker->imageUrl(800, 800, 'food'),
        'ingredients' => implode(', ', $faker->words(8)),
        'description' => implode("\n", $faker->sentences(3)),
        'spicy_level' => $faker->numberBetween(0, 5),
        'promo' => $faker->randomElement($promos)
    ];
});
