<?php

use App\Models\City;
use App\Models\Department;
use App\Models\Restaurant;
use App\Models\RestaurantCommand;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class RestaurantCommandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $cityIds = City::pluck('id');
        $departmentCodes = Department::pluck('code');

        $restaurantIds = Restaurant::pluck('id');

        foreach ($restaurantIds as $restaurantId) {
            factory(RestaurantCommand::class)->create([
                'city_id' => $faker->randomElement($cityIds),
                'restaurant_id' => $restaurantId,
                'is_template' => true,
                'delivery_address_option' => RestaurantCommand::DELIVERY_OPTION['TO_HOME'],
                'status' => RestaurantCommand::STATUS['SUCCESS'],
            ]);

            factory(RestaurantCommand::class)->create([
                'city_id' => $faker->randomElement($cityIds),
                'restaurant_id' => $restaurantId,
                'is_template' => false,
                'delivery_address_option' => RestaurantCommand::DELIVERY_OPTION['TO_HOME'],
                'status' => RestaurantCommand::STATUS['FAIL'],
            ]);

            factory(RestaurantCommand::class)->create([
                'department_code' => $faker->randomElement($departmentCodes),
                'restaurant_id' => $restaurantId,
                'is_template' => true,
                'delivery_address_option' => RestaurantCommand::DELIVERY_OPTION['TO_POSITION'],
                'delivery_address' => $faker->address,
                'status' => RestaurantCommand::STATUS['CANCELED'],
            ]);

            factory(RestaurantCommand::class)->create([
                'department_code' => $faker->randomElement($departmentCodes),
                'restaurant_id' => $restaurantId,
                'is_template' => false,
                'delivery_address_option' => RestaurantCommand::DELIVERY_OPTION['TO_POSITION'],
                'delivery_address' => $faker->address,
                'status' => RestaurantCommand::STATUS['GROUPING'],
            ]);
        }
    }
}
