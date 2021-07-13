<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::all()->each(function ($role) {
            $users = factory(User::class, 10)->make([
                'role_id' => $role->id,
            ]);
            User::insert($users->makeVisible(['password', 'remember_token'])->toArray());
        });
    }
}
