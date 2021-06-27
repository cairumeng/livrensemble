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
        $users = Role::all()->map(function ($role) {
            return factory(User::class)->make([
                'role_id' => $role->id,
                'email' => $role->type . '@test.com',
            ]);
        });

        User::insert($users->makeVisible(['password', 'remember_token'])->toArray());
    }
}
