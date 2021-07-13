<?php

use App\Models\DishCategory;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class DishCategoriesTableSeeder extends Seeder
{
    private $categories = [
        'Entrée', 'Plat', 'Dessert', 'Boisson'
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $result = [];
        Restaurant::pluck('id')->each(function ($id) use (&$result) {
            foreach ($this->categories as $category) {
                $result[] = DishCategory::make([
                    'restaurant_id' => $id,
                    'name' => $category,
                ])->toArray();
            }
        });

        DishCategory::insert($result);
    }
}
