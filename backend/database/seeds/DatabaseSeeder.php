<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(RestaurantsTableSeeder::class);
        $this->call(RestaurantCommandsTableSeeder::class);
        $this->call(DishCategoriesTableSeeder::class);
        $this->call(DishesTableSeeder::class);
    }
}
