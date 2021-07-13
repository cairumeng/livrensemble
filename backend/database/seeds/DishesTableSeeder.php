<?php

use App\Models\Dish;
use App\Models\DishCategory;
use Illuminate\Database\Seeder;

class DishesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        DishCategory::pluck('id')->each(function ($id) {
            $result = factory(Dish::class, 10)->make([
                'dish_category_id' => $id,
            ])->toArray();
            Dish::insert($result);
        });
    }
}
