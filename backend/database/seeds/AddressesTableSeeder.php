<?php

use App\Models\User;
use App\Models\Address;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class AddressesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $addresses = [];
        User::pluck('id')->each(function ($id) use ($faker, &$addresses) {
            $addresses[] = Address::make([
                'user_id' => $id,
                'address' => $faker->address,
                'city_id' => 1111,
                'name' => $faker->name,
                'phone' => $faker->phoneNumber,
            ])->toArray();
        });
        Address::insert($addresses);
    }
}
