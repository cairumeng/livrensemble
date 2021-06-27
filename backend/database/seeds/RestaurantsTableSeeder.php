<?php

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Seeder;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $restaurants =
            User::where('role_id', 2)
            ->pluck('id')
            ->map(function ($userId) {
                return factory(Restaurant::class)->make([
                    'user_id' => $userId
                ]);
            })->toArray();

        Restaurant::insert($restaurants);
    }
}
